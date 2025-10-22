export const watchVoidPortal = (keyword = "VOID", onTrigger?: () => void) => {
  let buffer = "";
  const listener = (event: KeyboardEvent) => {
    if (event.ctrlKey || event.metaKey) return;
    buffer += event.key.toUpperCase();
    if (buffer.length > keyword.length) {
      buffer = buffer.slice(-keyword.length);
    }
    if (buffer.endsWith(keyword)) {
      onTrigger?.();
      buffer = "";
    }
  };
  window.addEventListener("keydown", listener);
  return () => window.removeEventListener("keydown", listener);
};

export default watchVoidPortal;
