import mqtt from 'mqtt';

// Multi-device real-time sync manager via WebSockets & BroadcastChannel
const WSS_BROKER_URL = 'wss://broker.hivemq.com:8884/mqtt';

export class PokerSyncChannel {
  constructor(roomCode, playerId, onMessage, onStatusChange) {
    this.roomCode = roomCode.toUpperCase().trim();
    this.playerId = playerId;
    this.onMessage = onMessage;
    this.onStatusChange = onStatusChange || (() => {});
    this.topic = `storylettr/poker/v1/${this.roomCode}`;

    this.mqttClient = null;
    this.broadcastChannel = null;
    this.status = 'connecting'; // 'connecting', 'connected', 'offline'
    this.latencyMs = null;
    this.lastPingSent = null;

    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    // 1. Same-device tab-to-tab sync via BroadcastChannel
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        this.broadcastChannel = new BroadcastChannel(`sl_poker_${this.roomCode}`);
        this.broadcastChannel.onmessage = (event) => {
          if (event.data && event.data.senderId !== this.playerId) {
            this.onMessage(event.data);
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not available:', e);
    }

    // 2. Real-time Multi-Device WebSocket Sync via MQTT broker
    try {
      this.onStatusChange('connecting', null);
      const clientId = `sl_${this.playerId}_${Math.random().toString(36).slice(2, 6)}`;

      this.mqttClient = mqtt.connect(WSS_BROKER_URL, {
        clientId,
        clean: true,
        connectTimeout: 7000,
        reconnectPeriod: 2500,
        keepalive: 30,
      });

      this.mqttClient.on('connect', () => {
        this.status = 'connected';
        this.onStatusChange('connected', this.latencyMs);

        this.mqttClient.subscribe(this.topic, { qos: 0 }, (err) => {
          if (err) {
            console.error('MQTT subscribe error:', err);
          } else {
            // Send initial ping to calculate latency
            this.sendPing();
          }
        });
      });

      this.mqttClient.on('message', (topic, payload) => {
        if (topic !== this.topic) return;
        try {
          const data = JSON.parse(payload.toString());

          // Handle ping/pong for real-time latency measurement
          if (data.type === 'PING' && data.targetId === this.playerId) {
            this.broadcastRaw({
              type: 'PONG',
              pingId: data.pingId,
              senderId: this.playerId,
              targetId: data.senderId,
            });
            return;
          }

          if (data.type === 'PONG' && data.targetId === this.playerId) {
            if (this.lastPingSent) {
              this.latencyMs = Math.round(Date.now() - this.lastPingSent);
              this.onStatusChange('connected', this.latencyMs);
            }
            return;
          }

          // Ignore self-broadcasts
          if (data.senderId === this.playerId) return;

          this.onMessage(data);
        } catch (e) {
          console.warn('Error parsing incoming sync packet:', e);
        }
      });

      this.mqttClient.on('error', (err) => {
        console.warn('MQTT connection error:', err?.message || err);
        this.status = 'offline';
        this.onStatusChange('offline', null);
      });

      this.mqttClient.on('offline', () => {
        this.status = 'offline';
        this.onStatusChange('offline', null);
      });

      this.mqttClient.on('reconnect', () => {
        this.status = 'connecting';
        this.onStatusChange('connecting', null);
      });
    } catch (e) {
      console.error('Failed to initialize MQTT WebSocket sync:', e);
      this.status = 'offline';
      this.onStatusChange('offline', null);
    }

    // Ping interval to maintain connection & update latency
    this.pingInterval = setInterval(() => {
      this.sendPing();
    }, 15000);
  }

  sendPing() {
    this.lastPingSent = Date.now();
    this.broadcastRaw({
      type: 'PING',
      pingId: this.lastPingSent,
      senderId: this.playerId,
    });
  }

  broadcastRaw(data) {
    const payload = JSON.stringify(data);

    // Send through BroadcastChannel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(data);
      } catch (e) {}
    }

    // Send through WebSocket MQTT
    if (this.mqttClient && this.mqttClient.connected) {
      try {
        this.mqttClient.publish(this.topic, payload, { qos: 0 });
      } catch (e) {}
    }
  }

  send(actionType, payload = {}) {
    const message = {
      ...payload,
      type: actionType,
      senderId: this.playerId,
      timestamp: Date.now(),
      roomCode: this.roomCode,
    };
    this.broadcastRaw(message);
  }

  destroy() {
    if (this.pingInterval) clearInterval(this.pingInterval);
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.close();
      } catch (e) {}
    }
    if (this.mqttClient) {
      try {
        this.mqttClient.end(true);
      } catch (e) {}
    }
  }
}
