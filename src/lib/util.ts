export function capitalizeEachWord(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function reloadSession() {
  const event = new Event("visibilitychange");
  document.dispatchEvent(event);
};
