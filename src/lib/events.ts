export const OPEN_CHAT = "ikhwan:open-chat";
export const OPEN_PALETTE = "ikhwan:open-palette";

export const emit = (name: string) => window.dispatchEvent(new Event(name));
