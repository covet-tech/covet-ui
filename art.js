/* COVET · product art system.
   Stylized product renders per SKU (SVG, self-contained).
   In production these swap for the fulfillment API's image feed;
   the container contract stays the same: productArt(drop, width).
   Also: wishlist canonicalization (one entry per product, no
   size/concentration repeats). */

/* ---------- per-SKU art spec ----------
   bottles: s=shape, j=juice, c=cap, l=label bg, t=label text, lt=label text color
   bags:    s=shape, b=body, h=hardware */
const ART = {
  /* clean girl */
  libre10:    { s: "flacon",  j: "#e8c87a", c: "#15120e", l: "#15120e", t: "YSL",     lt: "#d4af6a" },
  missdior10: { s: "round",   j: "#f3cdd5", c: "#c9c2b8", l: "#ffffff", t: "MISS D",  lt: "#8a6a70" },
  adg15:      { s: "flacon",  j: "#bfe0e8", c: "#15120e", l: "#16324a", t: "ADG",     lt: "#ffffff" },
  chance20:   { s: "round",   j: "#f6c9d4", c: "#e8e2d8", l: "#ffffff", t: "CHANCE",  lt: "#2a2a2a" },
  paradoxe30: { s: "rect",    j: "#e9c4b8", c: "#c8a15a", l: "#efe6dd", t: "PRADA",   lt: "#5a4632" },
  lazysun30:  { s: "cylinder",j: "#f2ede6", c: "#d9d4cc", t: "REPLICA" },
  soleil50:   { s: "tf",      j: "#f0e3c9", c: "#e6ddc9", l: "#ffffff", t: "TF",      lt: "#2a2a2a" },
  br540_35:   { s: "rect",    j: "#efc27b", c: "#15120e", l: "#ffffff", t: "540",     lt: "#c22a35" },
  /* it girl */
  delina10:   { s: "round",   j: "#f4c6d2", c: "#d9b8a0", l: "#ffffff", t: "DELINA",  lt: "#b26a7e" },
  delina75:   { s: "round",   j: "#f4c6d2", c: "#d9b8a0", l: "#ffffff", t: "DELINA",  lt: "#b26a7e" },
  kayali10:   { s: "square",  j: "#eebf6e", c: "#d4af6a", l: "#ffffff", t: "KAYALI",  lt: "#b8860b" },
  sol62:      { s: "rect",    j: "#f5d76e", c: "#e8a94e", l: "#fff8e7", t: "SOL 62",  lt: "#c9862e" },
  amyris11:   { s: "rect",    j: "#f0dca8", c: "#15120e", l: "#ffffff", t: "MFK",     lt: "#15120e" },
  aventus10:  { s: "square",  j: "#d9d3c6", c: "#15120e", l: "#15120e", t: "CREED",   lt: "#d4af6a" },
  aventus100: { s: "square",  j: "#d9d3c6", c: "#15120e", l: "#15120e", t: "CREED",   lt: "#d4af6a" },
  aventus100g:{ s: "square",  j: "#d9d3c6", c: "#15120e", l: "#15120e", t: "CREED",   lt: "#d4af6a" },
  glossier50: { s: "round",   j: "#f6e8e4", c: "#e05a4e", l: "#ffffff", t: "YOU",     lt: "#e05a4e" },
  sideeff30:  { s: "square",  j: "#7a3a1e", c: "#15120e", l: "#15120e", t: "INITIO",  lt: "#d4af6a" },
  grandsoir:  { s: "rect",    j: "#d69a4a", c: "#15120e", l: "#ffffff", t: "MFK",     lt: "#15120e" },
  br540ext:   { s: "rect",    j: "#e0913f", c: "#15120e", l: "#7a1f2b", t: "540",     lt: "#e6c98f" },
  /* old money */
  oudwood30:  { s: "tf",      j: "#7a4a2e", c: "#5a3a26", l: "#ffffff", t: "TF",      lt: "#2a2a2a" },
  santal15:   { s: "cylinder",j: "#efe9df", c: "#c9c2b5", t: "SANTAL 33" },
  layton75:   { s: "round",   j: "#e6d9c4", c: "#3a3f5e", l: "#ffffff", t: "LAYTON",  lt: "#3a3f5e" },
  naxos100:   { s: "square",  j: "#d9a852", c: "#1c2a4a", l: "#1c2a4a", t: "XERJOFF", lt: "#d4af6a" },
  oudgreat:   { s: "square",  j: "#2e2620", c: "#d4af6a", l: "#15120e", t: "INITIO",  lt: "#d4af6a" },
  br540_70:   { s: "rect",    j: "#efc27b", c: "#15120e", l: "#ffffff", t: "540",     lt: "#c22a35" },
  amberaoud:  { s: "flacon",  j: "#c04c2a", c: "#d4af6a", l: "#7a1f1f", t: "ROJA",    lt: "#e6c98f" },
  clivex:     { s: "square",  j: "#37312e", c: "#d4af6a", l: "#ffffff", t: "X",       lt: "#2a2a2a" },
  /* archive */
  m7oud:      { s: "flacon",  j: "#b3532f", c: "#15120e", l: "#15120e", t: "M7",      lt: "#ffffff" },
  dhp75:      { s: "flacon",  j: "#4b4247", c: "#15120e", l: "#15120e", t: "DIOR",    lt: "#ffffff" },
  envy50:     { s: "flacon",  j: "#cfe0c6", c: "#c9c2b5", l: "#ffffff", t: "ENVY",    lt: "#2a2a2a" },
  coromandel: { s: "flacon",  j: "#d9c9a8", c: "#15120e", l: "#ffffff", t: "CHANEL",  lt: "#2a2a2a" },
  vanille44:  { s: "cylinder",j: "#efe6d4", c: "#c9c2b5", t: "VANILLE 44" },
  kingdom50:  { s: "flacon",  j: "#c23b4e", c: "#c9c2b5", l: "#ffffff", t: "AMQ",     lt: "#2a2a2a" },
  afgano30:   { s: "square",  j: "#232320", c: "#6d4a33" },
  champagne:  { s: "round",   j: "#ecd27a", c: "#d4af6a", l: "#ffffff", t: "YSL",     lt: "#2a2a2a" },
  windsor75:  { s: "square",  j: "#2c3f8f", c: "#c9c2b5", l: "#ffffff", t: "CREED",   lt: "#2c3f8f" },
  /* that girl */
  wsss30:     { s: "cylinder",j: "#f2efe8", c: "#c9b28a", t: "JO MALONE" },
  fleurnarc:  { s: "square",  j: "#f0ede8", c: "#c9c2b5", l: "#ffffff", t: "EX NIHILO", lt: "#2a2a2a" },
  /* vanilla girl */
  candy20:    { s: "round",   j: "#eab6c4", c: "#d4af6a", l: "#f7d1dd", t: "CANDY",   lt: "#a05a72" },
  byfire30:   { s: "cylinder",j: "#e6d3bd", c: "#d9d4cc", t: "REPLICA" },
  tobacco30:  { s: "tf",      j: "#8a5a2e", c: "#5a3a26", l: "#ffffff", t: "TF",      lt: "#2a2a2a" },
  sdv:        { s: "flacon",  j: "#c98e3f", c: "#d4af6a", l: "#f5ead2", t: "GUERLAIN",lt: "#7a5a1f" },
  /* coquette */
  monparis10: { s: "round",   j: "#f2b8c6", c: "#2a2a35", l: "#ffffff", t: "MON PARIS", lt: "#c04c6a" },
  missdior50: { s: "round",   j: "#f3cdd5", c: "#c9c2b8", l: "#ffffff", t: "MISS D",  lt: "#8a6a70" },
  poal50:     { s: "rect",    j: "#7a1f2b", c: "#15120e", l: "#15120e", t: "FM",      lt: "#ffffff" },
  delinaex:   { s: "round",   j: "#e89ab0", c: "#c9a2b8", l: "#ffffff", t: "DELINA",  lt: "#8a4a5e" },
  /* date night */
  blackop30:  { s: "round",   j: "#211d26", c: "#15120e", l: "#211d26", t: "YSL",     lt: "#e6c98f" },
  goodgirl30: { s: "flacon",  j: "#2a2438", c: "#d4af6a", l: "#2a2438", t: "GOOD GIRL", lt: "#d4af6a" },
  libreint:   { s: "flacon",  j: "#d9a852", c: "#15120e", l: "#15120e", t: "YSL",     lt: "#d4af6a" },
  hypnotic50: { s: "round",   j: "#8a1f2e", c: "#15120e", l: "#8a1f2e", t: "HP",      lt: "#f0c9a8" },
  lostcherry30:{ s: "tf",     j: "#c22a45", c: "#8a1f2e", l: "#ffffff", t: "TF",      lt: "#c22a45" },
  ldbs50:     { s: "square",  j: "#f2e3c4", c: "#15120e", l: "#15120e", t: "KILIAN",  lt: "#d4af6a" },
  /* dark feminine */
  blackorchid30:{ s: "tf",    j: "#241f26", c: "#15120e", l: "#15120e", t: "TF",      lt: "#c9a2b8" },
  alex2:      { s: "square",  j: "#3f2a5e", c: "#d4af6a", l: "#3f2a5e", t: "XERJOFF", lt: "#d4af6a" },
  /* rich mom */
  cocomad:    { s: "rect",    j: "#e8c87a", c: "#15120e", l: "#ffffff", t: "COCO",    lt: "#2a2a2a" },
  gabrielle:  { s: "square",  j: "#f0d9a0", c: "#d4af6a", l: "#ffffff", t: "GABRIELLE", lt: "#2a2a2a" },
  rose31:     { s: "cylinder",j: "#efe4e0", c: "#c9c2b5", t: "ROSE 31" },
  no5parfum:  { s: "rect",    j: "#e8c87a", c: "#15120e", l: "#ffffff", t: "N°5",     lt: "#2a2a2a" },
  /* daily free box commons */
  vialtrio:   { s: "flacon",  j: "#e8d5c4", c: "#c9c2b5", l: "#ffffff", t: "TRIO", lt: "#8a8078" },
  scentstick: { s: "cylinder",j: "#f0e6da", c: "#d4af6a", t: "SOLID" },
  maskduo:    { s: "fold", b: "#f2c9d4" },
  lipliner:   { s: "wand", b: "#8a1f2e", h: "#d4af6a" },
  scrunchie:  { s: "fold", b: "#d9a8c0" },
  clawclip:   { s: "jar",  j: "#f5e9d9", c: "#d4af6a" },
  charmset:   { s: "jar",  j: "#e8d5f0", c: "#d4af6a" },
  miumiuclip: { s: "jar",  j: "#f2d9e2", c: "#c9c2b5" },
  guccislide: { s: "jar",  j: "#e6d5c0", c: "#d4af6a" },
  /* beauty box */
  lipbutter:  { s: "jar",  j: "#f5e0d0", c: "#d9c9b8" },
  glowdrops:  { s: "round", j: "#f2b8c0", c: "#e8677a", l: "#ffffff", t: "GLOW", lt: "#e8677a" },
  olaplexset: { s: "cylinder", j: "#f2f0ec", c: "#c9c2b5", t: "OLAPLEX" },
  lamer:      { s: "jar",  j: "#e2ece6", c: "#c9c2b5" },
  laprairie:  { s: "jar",  j: "#e4e9f2", c: "#8a94a8" },
  /* sunnies box */
  lespecs:    { s: "sunnies", b: "#1c1c1e" },
  quaysun:    { s: "sunnies", b: "#8a5a2e" },
  raybansun:  { s: "sunnies", b: "#232320" },
  guccisun:   { s: "sunnies", b: "#5a4632" },
  miumiusun:  { s: "sunnies", b: "#2a2438" },
  pradasun:   { s: "sunnies", b: "#15130f" },
  cartiersun: { s: "sunnies", b: "#8a6a2e" },
  /* beauty + clothes (wishlist catalog) */
  rarekit:    { s: "jar",  j: "#e8a5b8", c: "#8a5a6a" },
  ctmagic:    { s: "jar",  j: "#f5e9d9", c: "#d4af6a" },
  airwrap:    { s: "wand", b: "#7a2438", h: "#c9c2b5" },
  skimsset:   { s: "fold", b: "#c9b8a8" },
  aloset:     { s: "fold", b: "#23232a" },
  /* heiress box */
  gucci1955:  { s: "flap", b: "#b98d5f", h: "#d4af6a" },
  yslkate:    { s: "flap", b: "#1c1a1e", h: "#c9c2b5" },
  vca5:       { s: "ring", b: "#d4af6a", h: "#f5efe2" },
  cartierlove:{ s: "ring", b: "#d4af6a", h: "#b98d3f" },
  rolex28:    { s: "watch", b: "#c9c2b5", h: "#efe3c2" },
  /* ritual box */
  satya3:     { s: "sticks", b: "#8a6f5a", h: "#a88d6f", j: "#5a4a6e" },
  palosanto:  { s: "sticks", b: "#c9b28f", h: "#b09a76", j: "#e8ddca" },
  incense:    { s: "sticks", b: "#8a3a4e", h: "#c9526e", j: "#f4d5dc" },
  tealights:  { s: "tealight", b: "#f4c2cf", j: "#ded6cc" },
  pfincense:  { s: "sticks", b: "#4a4a4a", h: "#6b6b6b", j: "#c9784a" },
  bkmini:     { s: "jar",  j: "#efe8dc", c: "#d8cfc0" },
  mlmcandle:  { s: "jar",  j: "#f5f2ea", c: "#2e2b28" },
  boysmells:  { s: "jar",  j: "#2b2b2b", c: "#e8607a" },
  dipmini:    { s: "jar",  j: "#f2efe8", c: "#1f1f1f" },
  trudon:     { s: "jar",  j: "#2e4a3f", c: "#d4af6a" },
  /* charm box */
  beadcharm:  { s: "charm", b: "#e8a0c0", h: "#a8c9e8" },
  enamelcharm:{ s: "charm", b: "#e02d56", h: "#d4af6a" },
  sonnyangel: { s: "charm", b: "#f5c9a8", h: "#a8cbe8" },
  labubu:     { s: "labu", b: "#c9a2d8", h: "#8a6bb8" },
  susancharm: { s: "charm", b: "#6fc98f", h: "#e8a94e" },
  coachcharm: { s: "charm", b: "#8a5a3a", h: "#d4af6a" },
  labuburare: { s: "labu", b: "#4a4a5e", h: "#e6c98f" },
  vworb:      { s: "charm", b: "#d4af6a", h: "#c9c2b5" },
  /* phone case box */
  skinnydip:  { s: "phone", b: "#d9e8f5", h: "#b8d0e8" },
  burga:      { s: "phone", b: "#3d3a45", h: "#c9a2d8" },
  wildflower: { s: "phone", b: "#e878a8", h: "#f5c9d8" },
  rhodecase:  { s: "phone", b: "#c9c2b5", h: "#a8a094" },
  sonixcase:  { s: "phone", b: "#c9a2d8", h: "#e8d5f2" },
  puffercase: { s: "phone", b: "#f2e8d5", h: "#e0d0b8" },
  casetify:   { s: "phone", b: "#2b2b2b", h: "#6b6b6b" },
  bandolier:  { s: "phone", b: "#8a5a3a", h: "#d4af6a" },
  birkin25:   { s: "tote", b: "#d7893b", h: "#d4af6a" },
  /* handbags */
  polene1:    { s: "tote",   b: "#c9a887", h: "#b98d5f" },
  tabby26:    { s: "tabby",  b: "#efe0cc", h: "#b98d3f" },
  mjtote:     { s: "tote",   b: "#2a2624", h: "#8a8a8a" },
  renylon:    { s: "mini",   b: "#1c1c22", h: "#c9c9cf" },
  marmont:    { s: "flap",   b: "#d8a7a0", h: "#d4af6a" },
  loucamera:  { s: "camera", b: "#211f22", h: "#d4af6a" },
  chanelwoc:  { s: "flap",   b: "#1d1a1a", h: "#d4af6a" },
  classicflap:{ s: "flap",   b: "#15130f", h: "#d4af6a" },
};

/* real product photos (stand-ins until supplier photos land). Toggled from
   admin; illustrated SVG art stays the fallback for anything unmapped. */
const PHOTO_ART = {
  cocomad: "assets/hero-perfume.png",
  coconoir: "assets/hero-perfume2.png",
  marmont: "assets/promo-lou.png",
  birkin25: "assets/hero-bag2.png",
  chanelwoc: "assets/promo-flap.png",
  classicflap: "assets/promo-flap.png",
  vca5: "assets/hero-jewel.png",
  rolex28: "assets/hero-watch.png",
  polene1: "assets/hero-bag.png",
  gabrielle: "assets/p/gabrielle.png",
  blackop30: "assets/p/blackopium.png",
  pradasun: "assets/p/pradasun.png",
  vialtrio: "assets/p/vialtrio.png",
  lostcherry30: "assets/p/lostcherry.png",
  airwrap: "assets/p/airwrap.png",
  delina75: "assets/p/delina.png",
  delinaex: "assets/p/delina.png",
  tealights: "assets/p/tealights.png",
  loucamera: "assets/p/loucamera.png",
};
function realPhotosOn() {
  try { return localStorage.getItem("covet_real_photos") === "1"; } catch { return false; }
}

let _artUid = 0;

function productArt(drop, w = 56) {
  if (drop && realPhotosOn() && PHOTO_ART[drop.id]) {
    return `<img class="pa-photo" src="${PHOTO_ART[drop.id]}" alt="" style="height:${Math.round(w * 1.05)}px;width:auto;max-width:${Math.round(w * 1.5)}px;object-fit:contain" />`;
  }
  const a = ART[drop && drop.id];
  if (!a) return itemSVG(drop, w);
  if (["jar", "wand", "fold", "sunnies", "ring", "watch", "sticks", "charm", "phone", "labu", "tealight"].includes(a.s)) return miscArt(a, w);
  return a.b ? bagArt(a, w) : bottleArt(a, w);
}

/* beauty + clothes silhouettes */
function miscArt(a, w) {
  const h = Math.round(w * 1.1);
  const shapes = {
    jar: `<rect x="14" y="34" width="52" height="18" rx="7" fill="${a.c}"/>
      <rect x="16" y="50" width="48" height="38" rx="11" fill="${a.j}"/>
      <rect x="52" y="50" width="12" height="38" rx="8" fill="#000" opacity="0.07"/>
      <rect x="21" y="55" width="6" height="27" rx="3" fill="#fff" opacity="0.45"/>`,
    wand: `<rect x="28" y="6" width="24" height="38" rx="11" fill="${a.b}"/>
      <rect x="28" y="6" width="9" height="38" rx="4.5" fill="#fff" opacity="0.18"/>
      <circle cx="40" cy="16" r="4" fill="#fff" opacity="0.25"/>
      <circle cx="40" cy="28" r="4" fill="#fff" opacity="0.25"/>
      <rect x="31" y="44" width="18" height="6" rx="3" fill="${a.h}"/>
      <rect x="33" y="50" width="14" height="42" rx="7" fill="${a.b}"/>
      <rect x="33" y="50" width="5" height="42" rx="2.5" fill="#fff" opacity="0.15"/>`,
    fold: `<rect x="12" y="36" width="56" height="46" rx="9" fill="${a.b}"/>
      <path d="M12 52 L12 45 Q12 36 21 36 L59 36 Q68 36 68 45 L68 52 Q68 58 59 58 L21 58 Q12 58 12 52 Z" fill="#000" opacity="0.13"/>
      <path d="M32 36 L40 46 L48 36" stroke="#fff" stroke-opacity="0.5" stroke-width="2.2" fill="none"/>
      <line x1="12" y1="66" x2="68" y2="66" stroke="#fff" stroke-opacity="0.12" stroke-width="1.6"/>`,
    ring: `<circle cx="40" cy="52" r="25" stroke="${a.b}" stroke-width="8" fill="none"/>
      <rect x="33.5" y="21" width="13" height="12" rx="4" fill="${a.h}"/>
      <line x1="18" y1="42" x2="24" y2="45" stroke="#fff" stroke-opacity="0.45" stroke-width="2" stroke-linecap="round"/>`,
    watch: `<rect x="30" y="5" width="20" height="27" rx="6" fill="${a.b}"/>
      <rect x="30" y="63" width="20" height="27" rx="6" fill="${a.b}"/>
      <circle cx="40" cy="48" r="19" fill="${a.b}"/>
      <circle cx="40" cy="48" r="14" fill="${a.h}"/>
      <line x1="40" y1="48" x2="40" y2="38" stroke="#5a4a2e" stroke-width="2" stroke-linecap="round"/>
      <line x1="40" y1="48" x2="47" y2="48" stroke="#5a4a2e" stroke-width="2" stroke-linecap="round"/>
      <line x1="33" y1="9" x2="33" y2="28" stroke="#fff" stroke-opacity="0.25" stroke-width="2"/>`,
    sticks: `<rect x="37" y="8" width="4.5" height="62" rx="2.2" fill="${a.b}" transform="rotate(5 39 39)"/>
      <rect x="46" y="12" width="4.5" height="58" rx="2.2" fill="${a.h}" transform="rotate(-6 48 41)"/>
      <rect x="28" y="14" width="4.5" height="56" rx="2.2" fill="${a.b}" opacity="0.65" transform="rotate(13 30 42)"/>
      <circle cx="38" cy="10" r="3" fill="#e8a94e" opacity="0.85"/>
      <path d="M38 4 Q41 0 38 -3" stroke="#c9c2b5" stroke-width="1.4" fill="none" opacity="0.6"/>
      <rect x="21" y="64" width="38" height="26" rx="8" fill="${a.j || "#d8cfc0"}"/>
      <rect x="26" y="69" width="5" height="16" rx="2.5" fill="#fff" opacity="0.35"/>`,
    labu: `<ellipse cx="28" cy="22" rx="7" ry="16" fill="${a.b}" transform="rotate(-10 28 22)"/>
      <ellipse cx="52" cy="22" rx="7" ry="16" fill="${a.b}" transform="rotate(10 52 22)"/>
      <ellipse cx="28" cy="24" rx="3.2" ry="10" fill="${a.h}" opacity="0.45" transform="rotate(-10 28 22)"/>
      <ellipse cx="52" cy="24" rx="3.2" ry="10" fill="${a.h}" opacity="0.45" transform="rotate(10 52 22)"/>
      <circle cx="40" cy="56" r="23" fill="${a.b}"/>
      <ellipse cx="40" cy="63" rx="16.5" ry="12" fill="#fdf3ec"/>
      <circle cx="31.5" cy="53" r="3.8" fill="#2a1a2c"/>
      <circle cx="48.5" cy="53" r="3.8" fill="#2a1a2c"/>
      <circle cx="32.8" cy="51.8" r="1.2" fill="#fff"/>
      <circle cx="49.8" cy="51.8" r="1.2" fill="#fff"/>
      <path d="M28 63 Q40 73 52 63 Q40 68.5 28 63 Z" fill="#5a2a3a"/>
      <path d="M29.5 63.4 L32 66.6 L34.5 64.3 L37 67.4 L40 64.8 L43 67.4 L45.5 64.3 L48 66.6 L50.5 63.4 Q40 68 29.5 63.4 Z" fill="#fff"/>`,
    tealight: `<path d="M26 42 C22.5 47.5 23.5 52.5 26 53.6 C28.5 52.5 29.5 47.5 26 42 Z" fill="#f2a93c"/>
      <path d="M26 46 C24.5 49 25 51.5 26 52.2 C27 51.5 27.5 49 26 46 Z" fill="#ffd98a"/>
      <line x1="26" y1="53.5" x2="26" y2="57" stroke="#7a6a5a" stroke-width="1.6"/>
      <ellipse cx="26" cy="59" rx="15" ry="4.5" fill="${a.b}"/>
      <path d="M11 59 L11 72 Q11 76 15 76 L37 76 Q41 76 41 72 L41 59 Z" fill="${a.j}"/>
      <ellipse cx="26" cy="59" rx="15" ry="4.5" fill="${a.b}"/>
      <rect x="14" y="62" width="4" height="11" rx="2" fill="#fff" opacity="0.4"/>
      <path d="M56 52 C53 56.5 53.8 60.5 56 61.4 C58.2 60.5 59 56.5 56 52 Z" fill="#f2a93c"/>
      <path d="M56 55.5 C54.8 58 55.2 60 56 60.6 C56.8 60 57.2 58 56 55.5 Z" fill="#ffd98a"/>
      <line x1="56" y1="61.2" x2="56" y2="64.5" stroke="#7a6a5a" stroke-width="1.5"/>
      <ellipse cx="56" cy="66.5" rx="12.5" ry="3.8" fill="${a.b}"/>
      <path d="M43.5 66.5 L43.5 77 Q43.5 80.5 47 80.5 L65 80.5 Q68.5 80.5 68.5 77 L68.5 66.5 Z" fill="${a.j}"/>
      <ellipse cx="56" cy="66.5" rx="12.5" ry="3.8" fill="${a.b}"/>
      <rect x="46" y="69" width="3.4" height="8.5" rx="1.7" fill="#fff" opacity="0.4"/>`,
    charm: `<circle cx="40" cy="32" r="21" stroke="${a.h}" stroke-width="3" fill="none" stroke-dasharray="2.5 5" stroke-linecap="round"/>
      <circle cx="40" cy="53" r="4.5" stroke="${a.h}" stroke-width="2.6" fill="none"/>
      <path d="M40 88 C35.5 81 25 74.5 25 64.5 C25 57 31.5 53.8 36 57 C38 58.4 40 61.5 40 61.5 C40 61.5 42 58.4 44 57 C48.5 53.8 55 57 55 64.5 C55 74.5 44.5 81 40 88 Z" fill="${a.b}"/>
      <path d="M31 63 Q33 59.5 36.5 59.5" stroke="#fff" stroke-opacity="0.5" stroke-width="2" fill="none" stroke-linecap="round"/>`,
    phone: `<rect x="18" y="4" width="44" height="86" rx="11" fill="${a.b}"/>
      <rect x="22" y="8" width="36" height="78" rx="8" fill="#fff" opacity="0.12"/>
      <rect x="24" y="10" width="16" height="22" rx="6" fill="${a.h}"/>
      <circle cx="30" cy="17" r="3.4" fill="${a.b}" stroke="#fff" stroke-opacity="0.5" stroke-width="1.2"/>
      <circle cx="30" cy="26" r="3.4" fill="${a.b}" stroke="#fff" stroke-opacity="0.5" stroke-width="1.2"/>
      <path d="M40 64 C38 61 33.5 58.2 33.5 54 C33.5 50.8 36.3 49.4 38.2 50.8 C39.1 51.4 40 52.8 40 52.8 C40 52.8 40.9 51.4 41.8 50.8 C43.7 49.4 46.5 50.8 46.5 54 C46.5 58.2 42 61 40 64 Z" fill="#fff" opacity="0.5"/>
      <rect x="24" y="4" width="5" height="86" rx="2.5" fill="#fff" opacity="0.18"/>`,
    sunnies: `<path d="M4 42 C11 36 27 37 33 43 C35 45 35 49 34 52 C32 59 26 63 18 63 C10 63 5 58 4 49 Z" fill="${a.b}"/>
      <path d="M76 42 C69 36 53 37 47 43 C45 45 45 49 46 52 C48 59 54 63 62 63 C70 63 75 58 76 49 Z" fill="${a.b}"/>
      <path d="M35 45 Q40 41 45 45" stroke="${a.b}" stroke-width="2.6" fill="none"/>
      <line x1="10" y1="45" x2="19" y2="41.5" stroke="#fff" stroke-opacity="0.5" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="52" y1="42.5" x2="61" y2="41" stroke="#fff" stroke-opacity="0.3" stroke-width="2" stroke-linecap="round"/>`,
  };
  return `<svg width="${w}" height="${h}" viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="40" cy="92" rx="24" ry="3" fill="#000" opacity="0.08"/>
    ${shapes[a.s]}
  </svg>`;
}

function bottleArt(a, w) {
  const id = "pa" + _artUid++;
  const h = Math.round(w * 1.25);
  const label = a.l && a.t
    ? `<rect x="${a.s === "flacon" ? 22 : 26}" y="${a.s === "flacon" ? 68 : 52}" width="${a.s === "flacon" ? 36 : 28}" height="${a.s === "flacon" ? 14 : 20}" rx="2" fill="${a.l}"/>
       <text x="40" y="${a.s === "flacon" ? 77.5 : 64}" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" font-weight="700" letter-spacing="0.5" fill="${a.lt}">${a.t}</text>`
    : "";
  const shapes = {
    rect: `<rect x="30" y="6" width="20" height="14" rx="2" fill="${a.c}"/>
      <rect x="34" y="18" width="12" height="9" fill="url(#${id})"/>
      <rect x="18" y="26" width="44" height="68" rx="5" fill="url(#${id})"/>
      <rect x="52" y="26" width="10" height="68" rx="5" fill="#000" opacity="0.1"/>
      <rect x="23" y="31" width="6" height="58" rx="3" fill="#fff" opacity="0.35"/>${label}`,
    square: `<rect x="26" y="4" width="28" height="17" rx="3" fill="${a.c}"/>
      <rect x="14" y="22" width="52" height="72" rx="8" fill="url(#${id})"/>
      <rect x="19" y="27" width="42" height="62" rx="5" fill="none" stroke="#fff" stroke-opacity="0.3" stroke-width="1.5"/>
      <rect x="54" y="22" width="12" height="72" rx="8" fill="#000" opacity="0.1"/>
      <rect x="20" y="28" width="6" height="60" rx="3" fill="#fff" opacity="0.3"/>
      ${a.l && a.t ? `<rect x="24" y="60" width="32" height="17" rx="2" fill="${a.l}"/>
      <text x="40" y="71.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7.5" font-weight="700" letter-spacing="0.5" fill="${a.lt}">${a.t}</text>` : ""}`,
    round: `<ellipse cx="40" cy="15" rx="12" ry="9" fill="${a.c}"/>
      <rect x="32" y="21" width="16" height="8" fill="url(#${id})"/>
      <rect x="16" y="26" width="48" height="68" rx="24" fill="url(#${id})"/>
      <rect x="23" y="34" width="7" height="46" rx="3.5" fill="#fff" opacity="0.35"/>
      ${a.l && a.t ? `<rect x="25" y="54" width="30" height="16" rx="8" fill="${a.l}"/>
      <text x="40" y="64.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="6.5" font-weight="700" letter-spacing="0.4" fill="${a.lt}">${a.t}</text>` : ""}`,
    cylinder: `<rect x="30" y="6" width="20" height="12" rx="2" fill="${a.c}"/>
      <rect x="22" y="18" width="36" height="76" rx="8" fill="url(#${id})"/>
      <rect x="26" y="24" width="5" height="64" rx="2.5" fill="#fff" opacity="0.4"/>
      <rect x="25" y="38" width="30" height="36" rx="1.5" fill="#f8f5ef"/>
      <text x="40" y="46" text-anchor="middle" font-family="Inter,sans-serif" font-size="4.6" font-weight="700" letter-spacing="0.3" fill="#2a2a2a">${a.t || ""}</text>
      <rect x="29" y="51" width="22" height="2.2" fill="#a8a094"/>
      <rect x="29" y="56" width="22" height="2.2" fill="#c5beb2"/>
      <rect x="29" y="61" width="16" height="2.2" fill="#c5beb2"/>`,
    flacon: `<rect x="32" y="4" width="16" height="16" rx="2" fill="${a.c}"/>
      <rect x="36" y="18" width="8" height="8" fill="url(#${id})"/>
      <rect x="22" y="24" width="36" height="70" rx="4" fill="url(#${id})"/>
      <rect x="50" y="24" width="8" height="70" rx="4" fill="#000" opacity="0.1"/>
      <rect x="26" y="29" width="5" height="58" rx="2.5" fill="#fff" opacity="0.35"/>${label}`,
    tf: `<rect x="30" y="5" width="20" height="12" rx="2" fill="${a.c}"/>
      <rect x="20" y="17" width="40" height="77" rx="5" fill="url(#${id})"/>
      ${[27, 34, 41, 48, 53].map((x) => `<line x1="${x}" y1="20" x2="${x}" y2="91" stroke="#fff" stroke-opacity="0.16" stroke-width="2"/>`).join("")}
      <rect x="24" y="21" width="5" height="70" rx="2.5" fill="#fff" opacity="0.3"/>
      ${a.l && a.t ? `<rect x="28" y="66" width="24" height="14" rx="2" fill="${a.l}"/>
      <text x="40" y="75.5" text-anchor="middle" font-family="Inter,sans-serif" font-size="7" font-weight="700" fill="${a.lt}">${a.t}</text>` : ""}`,
  };
  return `<svg width="${w}" height="${h}" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0.3" y2="1">
      <stop offset="0" stop-color="${a.j}"/><stop offset="1" stop-color="${a.j}" stop-opacity="0.75"/>
    </linearGradient></defs>
    <ellipse cx="40" cy="96" rx="22" ry="3" fill="#000" opacity="0.08"/>
    ${shapes[a.s] || shapes.rect}
  </svg>`;
}

function bagArt(a, w) {
  const h = Math.round(w * 0.9);
  const quilt = (x, y, wd, ht) => {
    let out = "";
    for (let i = -ht; i < wd; i += 11) out += `<line x1="${x + i}" y1="${y + ht}" x2="${x + i + ht}" y2="${y}" stroke="#fff" stroke-opacity="0.12" stroke-width="1.6"/>`;
    for (let i = 0; i < wd + ht; i += 11) out += `<line x1="${x + i}" y1="${y}" x2="${x + i - ht}" y2="${y + ht}" stroke="#fff" stroke-opacity="0.12" stroke-width="1.6"/>`;
    return out;
  };
  const shapes = {
    flap: `<path d="M27 42 C27 14 73 14 73 42" stroke="${a.h}" stroke-width="2.6" stroke-dasharray="3.5 2.5" fill="none"/>
      <rect x="14" y="40" width="72" height="40" rx="9" fill="${a.b}"/>
      ${quilt(14, 40, 72, 40)}
      <path d="M14 49 L14 44 Q14 40 23 40 L77 40 Q86 40 86 44 L86 49 Q86 58 77 58 L23 58 Q14 58 14 49 Z" fill="#000" opacity="0.16"/>
      <rect x="44" y="53" width="12" height="8" rx="2.5" fill="${a.h}"/>`,
    tote: `<path d="M32 34 C32 16 44 16 44 34" stroke="#000" stroke-opacity="0.3" stroke-width="3" fill="none"/>
      <path d="M56 34 C56 16 68 16 68 34" stroke="#000" stroke-opacity="0.3" stroke-width="3" fill="none"/>
      <path d="M18 34 L82 34 L76 78 Q75.5 82 71 82 L29 82 Q24.5 82 24 78 Z" fill="${a.b}"/>
      <rect x="45" y="42" width="10" height="6" rx="2" fill="${a.h}"/>
      <path d="M22 38 L78 38" stroke="#fff" stroke-opacity="0.15" stroke-width="1.5"/>`,
    camera: `<path d="M22 40 C30 12 70 12 78 40" stroke="${a.b}" stroke-width="3.4" fill="none" opacity="0.85"/>
      <rect x="16" y="38" width="68" height="40" rx="13" fill="${a.b}"/>
      ${[30, 42, 54, 66].map((x) => `<path d="M${x} 46 L${x + 6} 58 L${x + 12} 46" stroke="#fff" stroke-opacity="0.14" stroke-width="1.6" fill="none"/>`).join("")}
      <line x1="50" y1="74" x2="50" y2="84" stroke="${a.h}" stroke-width="2"/>
      <rect x="47.5" y="82" width="5" height="6" rx="1.5" fill="${a.h}"/>`,
    mini: `<path d="M38 40 C38 24 62 24 62 40" stroke="${a.b}" stroke-width="3" fill="none" opacity="0.85"/>
      <rect x="22" y="38" width="56" height="38" rx="9" fill="${a.b}"/>
      <path d="M22 48 L22 44 Q22 38 30 38 L70 38 Q78 38 78 44 L78 48 Q78 55 70 55 L30 55 Q22 55 22 48 Z" fill="#fff" opacity="0.09"/>
      <polygon points="45,58 55,58 50,67" fill="${a.h}"/>`,
    tabby: `<path d="M36 38 C36 20 64 20 64 38" stroke="${a.b}" stroke-width="3.2" fill="none" opacity="0.85"/>
      <rect x="14" y="36" width="72" height="42" rx="11" fill="${a.b}"/>
      <path d="M14 52 L14 44 Q14 36 25 36 L75 36 Q86 36 86 44 L86 52 Q86 62 75 62 L25 62 Q14 62 14 52 Z" fill="#000" opacity="0.1"/>
      <circle cx="50" cy="61" r="6.5" fill="none" stroke="${a.h}" stroke-width="2.6"/>`,
  };
  return `<svg width="${w}" height="${h}" viewBox="0 0 100 90" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <ellipse cx="50" cy="86" rx="28" ry="3" fill="#000" opacity="0.08"/>
    ${shapes[a.s] || shapes.tote}
  </svg>`;
}

/* ---------- wishlist canonicalization (no repeats) ----------
   The same product in multiple sizes/concentrations collapses to
   one wishlist entry: the highest-value variant. */
function _dropKey(d) {
  return (d.house + "|" + d.name.replace(/\s*\(.*\)/, "")).toLowerCase();
}
function _canonMap() {
  const m = new Map();
  for (const d of allDrops()) {
    const k = _dropKey(d);
    if (!m.has(k) || m.get(k).value < d.value) m.set(k, d);
  }
  return m;
}
function allDropsUnique() {
  /* dtc pieces are manually sourced (Rhode, Casetify, the Heiress shelf):
     marketing pulls in their boxes, excluded from the wishlist pool */
  return [..._canonMap().values()].filter((d) => !d.dtc).sort((a, b) => a.value - b.value);
}
function canonicalId(id) {
  const d = allDrops().find((x) => x.id === id);
  if (!d) return id;
  return _canonMap().get(_dropKey(d)).id;
}
