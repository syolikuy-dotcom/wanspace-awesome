export const OPEN_CHAT = "ryhar:open-chat";
export const OPEN_PALETTE = "ryhar:open-palette";

export const emit = (name: string) => window.dispatchEvent(new Event(name));
