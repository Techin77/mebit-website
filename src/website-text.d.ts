declare module 'virtual:website-text' {
  /** Text edited in Obsidian: { [page]: { th: { "a.0.b": "…" }, en: { … } } } */
  const text: Record<string, { th: Record<string, string>; en: Record<string, string> }>;
  export default text;
}
