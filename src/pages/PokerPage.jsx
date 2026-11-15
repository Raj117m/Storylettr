import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams, useParams, useNavigate } from 'react-router-dom';
import PageMeta from '../components/PageMeta';
import PokerOnboardingModal from '../components/poker/PokerOnboardingModal.jsx';
import PokerLobby from '../components/poker/PokerLobby.jsx';
import PokerTable from '../components/poker/PokerTable.jsx';
import {
  createInitialTableState,
  startNewHand,
  processAction,
  getBotAction,
  BOT_NAMES,
  BOT_AVATARS,
  BOT_COLORS,
  STAGES,
} from '../lib/poker/pokerEngine.js';
import { PokerSyncChannel } from '../lib/poker/sync.js';

export default function PokerPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { roomCode: paramRoomCode } = useParams();
  const navigate = useNavigate();

  // 1. Player Identity
  const [localPlayer, setLocalPlayer] = useState(() => {
    if (typeof window === 'undefined') {
      return { id: 'player_ssr', name: 'Player', avatar: 'shark', neonColor: '#06b6d4' };
    }
    let id = localStorage.getItem('storylettr_poker_id');
    if (!id) {
      id = 'p_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 6);
      localStorage.setItem('storylettr_poker_id', id);
    }
    const name = localStorage.getItem('storylettr_poker_name') || '';
    const avatar = localStorage.getItem('storylettr_poker_avatar') || 'shark';
    const neonColor = localStorage.getItem('storylettr_poker_neon') || '#06b6d4';
    return { id, name, avatar, neonColor };
  });

  const [onboardingOpen, setOnboardingOpen] = useState(() => !localPlayer.name);

  // 2. Room Code Resolution
  const roomCode = (
    searchParams.get('room') ||
    paramRoomCode ||
    'PKR42'
  ).toUpperCase().trim();

  // 3. Table Game State
  const [tableState, setTableState] = useState(() =>
    createInitialTableState({ roomCode, maxSeats: 3 })
  );

  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [latencyMs, setLatencyMs] = useState(null);
  const [activeThrows, setActiveThrows] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);

  // Refs for callbacks & networking
  const syncChannelRef = useRef(null);
  const stateRef = useRef(tableState);
  stateRef.current = tableState;
  const localPlayerRef = useRef(localPlayer);
  localPlayerRef.current = localPlayer;

  // Determine if this user is host
  const isHost = tableState.hostId === localPlayer.id || !tableState.hostId;

  // Handle incoming network sync packets
  const handleIncomingMessage = useCallback((packet) => {
    if (!packet || !packet.type) return;

    switch (packet.type) {
      case 'STATE_UPDATE': {
        if (packet.state) {
          setTableState((prev) => ({
            ...packet.state,
            // Preserve local non-synced UI hints if needed
          }));
        }
        break;
      }

      case 'REQUEST_SYNC': {
        // If we are host, broadcast the authoritative state to newly joined player
        if (stateRef.current.hostId === localPlayerRef.current.id || !stateRef.current.hostId) {
          syncChannelRef.current?.send('STATE_UPDATE', {
            state: stateRef.current,
          });
        }
        break;
      }

      case 'CLIENT_ACTION': {
        // Only host processes actions and broadcasts state updates
        if (stateRef.current.hostId === localPlayerRef.current.id || !stateRef.current.hostId) {
          handleExecuteAction(packet.seatIdx, packet.action);
        }
        break;
      }

      case 'JOIN_SEAT': {
        if (stateRef.current.hostId === localPlayerRef.current.id || !stateRef.current.hostId) {
          handleSitHost(packet.seatIdx, packet.player);
        }
        break;
      }

      case 'LEAVE_SEAT': {
        if (stateRef.current.hostId === localPlayerRef.current.id || !stateRef.current.hostId) {
          handleStandHost(packet.playerId);
        }
        break;
      }

      case 'TOGGLE_READY': {
        if (stateRef.current.hostId === localPlayerRef.current.id || !stateRef.current.hostId) {
          handleToggleReadyHost(packet.playerId);
        }
        break;
      }

      case 'EMOJI_THROW': {
        const id = Date.now() + Math.random();
        const startX = 20 + Math.random() * 60;
        const startY = 30 + Math.random() * 40;
        setActiveThrows((prev) => [...prev, { id, emoji: packet.emoji, x: startX, y: startY }]);
        setTimeout(() => {
          setActiveThrows((prev) => prev.filter((item) => item.id !== id));
        }, 1600);
        break;
      }

      case 'CHAT_MSG': {
        // Show active chat on avatar
        setTableState((prev) => {
          const updatedSeats = prev.seats.map((p) => {
            if (p && p.id === packet.playerId) {
              return { ...p, activeChat: packet.text };
            }
            return p;
          });
          return { ...prev, seats: updatedSeats };
        });

        // Clear active chat bubble after 4 seconds
        setTimeout(() => {
          setTableState((prev) => {
            const updatedSeats = prev.seats.map((p) => {
              if (p && p.id === packet.playerId && p.activeChat === packet.text) {
                return { ...p, activeChat: null };
              }
              return p;
            });
            return { ...prev, seats: updatedSeats };
          });
        }, 4000);
        break;
      }

      default:
        break;
    }
  }, []);

  // Broadcast state changes when host updates
  const broadcastState = useCallback((newState) => {
    setTableState(newState);
    syncChannelRef.current?.send('STATE_UPDATE', { state: newState });
  }, []);

  // Host Action Processor
  const handleExecuteAction = useCallback((seatIdx, action) => {
    const currentState = stateRef.current;
    const result = processAction(currentState, seatIdx, action);
    if (!result.error) {
      broadcastState(result);
    }
  }, [broadcastState]);

  // Host Sit Handler
  const handleSitHost = useCallback((seatIdx, player) => {
    const currentState = stateRef.current;
    if (seatIdx < 0 || seatIdx >= currentState.maxSeats) return;
    if (currentState.seats[seatIdx]) return; // Already occupied

    const updatedSeats = [...currentState.seats];
    updatedSeats[seatIdx] = {
      ...player,
      chips: currentState.startingChips,
      isReady: false,
      isBot: false,
      folded: false,
      allIn: false,
      streetBet: 0,
      totalInvested: 0,
      cards: null,
    };

    const hostId = currentState.hostId || player.id;
    broadcastState({
      ...currentState,
      hostId,
      seats: updatedSeats,
    });
  }, [broadcastState]);

  // Host Stand Handler
  const handleStandHost = useCallback((playerId) => {
    const currentState = stateRef.current;
    const updatedSeats = currentState.seats.map((p) => (p && p.id === playerId ? null : p));
    let nextHost = currentState.hostId;
    if (currentState.hostId === playerId) {
      const remaining = updatedSeats.filter(Boolean);
      nextHost = remaining.length > 0 ? remaining[0].id : null;
    }

    broadcastState({
      ...currentState,
      hostId: nextHost,
      seats: updatedSeats,
    });
  }, [broadcastState]);

  // Host Ready Toggle Handler
  const handleToggleReadyHost = useCallback((playerId) => {
    const currentState = stateRef.current;
    const updatedSeats = currentState.seats.map((p) => {
      if (p && p.id === playerId) {
        return { ...p, isReady: !p.isReady };
      }
      return p;
    });
    broadcastState({
      ...currentState,
      seats: updatedSeats,
    });
  }, [broadcastState]);

  // Connect Sync Channel
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const channel = new PokerSyncChannel(
      roomCode,
      localPlayer.id,
      handleIncomingMessage,
      (status, latency) => {
        setConnectionStatus(status);
        if (latency !== null) setLatencyMs(latency);
      }
    );
    syncChannelRef.current = channel;

    // Request sync from existing host
    setTimeout(() => {
      channel.send('REQUEST_SYNC', { playerId: localPlayer.id });
    }, 400);

    return () => {
      channel.destroy();
    };
  }, [roomCode, localPlayer.id, handleIncomingMessage]);

  // Bot Turn Automation (Host drives AI bots)
  useEffect(() => {
    if (!isHost || tableState.stage === STAGES.LOBBY) return;
    const activeSeatIdx = tableState.activeSeat;
    if (activeSeatIdx === -1) return;

    const activePlayer = tableState.seats[activeSeatIdx];
    if (activePlayer && activePlayer.isBot && !activePlayer.folded && !activePlayer.allIn) {
      const botTimer = setTimeout(() => {
        const botAction = getBotAction(stateRef.current, activeSeatIdx);
        if (botAction) {
          handleExecuteAction(activeSeatIdx, botAction);
        }
      }, 1400);

      return () => clearTimeout(botTimer);
    }
  }, [isHost, tableState.activeSeat, tableState.stage, handleExecuteAction]);

  // Client Actions
  const handleSit = (seatIdx) => {
    if (isHost) {
      handleSitHost(seatIdx, localPlayer);
    } else {
      syncChannelRef.current?.send('JOIN_SEAT', {
        seatIdx,
        player: localPlayer,
      });
    }
  };

  const handleStand = () => {
    if (isHost) {
      handleStandHost(localPlayer.id);
    } else {
      syncChannelRef.current?.send('LEAVE_SEAT', {
        playerId: localPlayer.id,
      });
    }
  };

  const handleToggleReady = () => {
    if (isHost) {
      handleToggleReadyHost(localPlayer.id);
    } else {
      syncChannelRef.current?.send('TOGGLE_READY', {
        playerId: localPlayer.id,
      });
    }
  };

  const handleAddBot = () => {
    if (!isHost) return;
    const emptySeatIdx = tableState.seats.findIndex((s) => s === null);
    if (emptySeatIdx === -1) return;

    const botCount = tableState.seats.filter((s) => s && s.isBot).length;
    const botName = BOT_NAMES[botCount % BOT_NAMES.length];
    const botAvatar = BOT_AVATARS[botCount % BOT_AVATARS.length];
    const botColor = BOT_COLORS[botCount % BOT_COLORS.length];

    const botPlayer = {
      id: `bot_${Date.now()}_${emptySeatIdx}`,
      name: botName,
      avatar: botAvatar,
      neonColor: botColor,
      chips: tableState.startingChips,
      isReady: true,
      isBot: true,
      folded: false,
      allIn: false,
      streetBet: 0,
      totalInvested: 0,
      cards: null,
    };

    const updatedSeats = [...tableState.seats];
    updatedSeats[emptySeatIdx] = botPlayer;
    broadcastState({
      ...tableState,
      seats: updatedSeats,
    });
  };

  const handleRemoveBot = (seatIdx) => {
    if (!isHost) return;
    const updatedSeats = [...tableState.seats];
    updatedSeats[seatIdx] = null;
    broadcastState({
      ...tableState,
      seats: updatedSeats,
    });
  };

  const handleUpdateConfig = (configPatch) => {
    if (!isHost) return;
    let nextSeats = [...tableState.seats];
    if (configPatch.maxSeats && configPatch.maxSeats !== tableState.maxSeats) {
      const newMax = configPatch.maxSeats;
      if (newMax === 3) {
        nextSeats = nextSeats.slice(0, 3);
      } else if (newMax === 4 && nextSeats.length < 4) {
        while (nextSeats.length < 4) nextSeats.push(null);
      }
    }

    broadcastState({
      ...tableState,
      ...configPatch,
      seats: nextSeats,
    });
  };

  const handleStartGame = () => {
    if (!isHost) return;
    const newHandState = startNewHand(tableState);
    broadcastState(newHandState);
  };

  const handleNextHand = () => {
    if (isHost) {
      const newHandState = startNewHand(tableState);
      broadcastState(newHandState);
    } else {
      syncChannelRef.current?.send('REQUEST_NEXT_HAND');
    }
  };

  const handleAction = (action) => {
    const seatIdx = tableState.seats.findIndex((p) => p && p.id === localPlayer.id);
    if (seatIdx === -1) return;

    if (isHost) {
      handleExecuteAction(seatIdx, action);
    } else {
      syncChannelRef.current?.send('CLIENT_ACTION', {
        seatIdx,
        action,
      });
    }
  };

  const handleShowMuckChoice = (showCards) => {
    const seatIdx = tableState.uncalledWinnerSeat;
    if (seatIdx === -1) return;

    const updatedSeats = tableState.seats.map((p, idx) => {
      if (p && idx === seatIdx) {
        return {
          ...p,
          revealedCards: showCards,
        };
      }
      return p;
    });

    broadcastState({
      ...tableState,
      stage: STAGES.SHOWDOWN,
      seats: updatedSeats,
      winningHandDescription: showCards
        ? `${updatedSeats[seatIdx].name} flexes cards to the table! 🏆`
        : `${updatedSeats[seatIdx].name} mucks quietly. 🤫`,
    });
  };

  const handleSendChat = (text) => {
    syncChannelRef.current?.send('CHAT_MSG', {
      playerId: localPlayer.id,
      text,
    });
    handleIncomingMessage({
      type: 'CHAT_MSG',
      playerId: localPlayer.id,
      text,
    });
  };

  const handleThrowEmoji = (emoji) => {
    syncChannelRef.current?.send('EMOJI_THROW', { emoji });
    handleIncomingMessage({ type: 'EMOJI_THROW', emoji });
  };

  const handleSaveOnboarding = (profile) => {
    setLocalPlayer((prev) => ({
      ...prev,
      ...profile,
    }));
    if (typeof window !== 'undefined') {
      localStorage.setItem('storylettr_poker_name', profile.name);
      localStorage.setItem('storylettr_poker_avatar', profile.avatar);
      localStorage.setItem('storylettr_poker_neon', profile.neonColor);
    }
    setOnboardingOpen(false);
  };

  const isGameRunning =
    tableState.stage !== STAGES.LOBBY &&
    tableState.seats.filter(Boolean).length >= 2;

  return (
    <>
      <PageMeta
        title={`Texas Hold'em Poker Club (${tableState.maxSeats}-Max Live) | StoryLettr`}
        description="Real-time multi-device Texas Hold'em Poker web application. Play on phones, tablets, or desktop with synchronized turn timers, live hand strength evaluation, and instant QR room sharing."
        path={`/poker?room=${roomCode}`}
      />

      <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        {/* Onboarding Profile Modal */}
        <PokerOnboardingModal
          isOpen={onboardingOpen}
          initialName={localPlayer.name}
          initialAvatar={localPlayer.avatar}
          initialNeon={localPlayer.neonColor}
          onSave={handleSaveOnboarding}
        />

        {/* Dynamic Game View: Lobby or Live Table */}
        {isGameRunning ? (
          <PokerTable
            tableState={tableState}
            localPlayer={localPlayer}
            onAction={handleAction}
            onNextHand={handleNextHand}
            onShowMuckChoice={handleShowMuckChoice}
            onSendChat={handleSendChat}
            onThrowEmoji={handleThrowEmoji}
            chatMessages={chatMessages}
            activeThrows={activeThrows}
            onReturnToLobby={() => {
              if (isHost) {
                broadcastState({ ...tableState, stage: STAGES.LOBBY });
              }
            }}
            networkLatency={latencyMs}
          />
        ) : (
          <div className="flex-1 flex flex-col justify-center py-6 sm:py-12">
            <PokerLobby
              roomCode={roomCode}
              isHost={isHost}
              hostId={tableState.hostId}
              localPlayer={localPlayer}
              tableState={tableState}
              onSit={handleSit}
              onStand={handleStand}
              onToggleReady={handleToggleReady}
              onAddBot={handleAddBot}
              onRemoveBot={handleRemoveBot}
              onStartGame={handleStartGame}
              onUpdateConfig={handleUpdateConfig}
            />
          </div>
        )}
      </div>
    </>
  );
}
