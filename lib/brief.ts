// Ephemeral handoff during client navigation. No URL, storage, network or analytics payload.
let pendingBrief = '';
let expiresAt = 0;
export function setBrief(text: string) { pendingBrief = text.slice(0, 2000); expiresAt = Date.now() + 600000; }
export function takeBrief() { const value = Date.now() < expiresAt ? pendingBrief : ''; pendingBrief = ''; expiresAt = 0; return value; }
