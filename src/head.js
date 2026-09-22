// A tiny side-channel PageMeta writes into during a render pass, so the
// prerender script can read the final head tags after renderToString()
// (SSR only renders into <body>, never <head>, so this is how per-page
// <title>/<meta>/<link rel=canonical> reach the prerendered HTML).
let current = null;

export function setHead(head) {
  current = head;
}

export function getHead() {
  return current;
}

export function resetHead() {
  current = null;
}
