/* ============================================================
   COVET · mock data
   ------------------------------------------------------------
   BRAND NAME OPTIONS (pick 1 of 5):
   1. COVET (built) · the word she already uses ("so coveted").
      Verb and noun, 5 letters, category-agnostic: works for
      fragrance now, handbag / shoe / wardrobe boxes later.
   2. DIBS · playful, "calling dibs", very shareable.
   3. KEPT · quiet luxury, "the ones you keep".
   4. SPOILED · treat-yourself energy, great for gifting.
   5. MUSE · editorial, pretty, slightly more generic.
   ------------------------------------------------------------
   Language: the unit is a BOX, the verb is UNBOX, saved loves
   are a WISHLIST. Never "case".
   Boxes are aesthetic identities, not perfumery taxonomy:
   she buys the version of herself she's feeling today.
   ------------------------------------------------------------
   All data is mock. Odds per box sum to exactly 100.
   PRODUCTION PRICING RULES (verified against real gray-market
   prices Aug 2026 — FragranceNet/LaBelle/Jomashop/Fashionphile):
     · real sourcing costs vs displayed retail value:
       designer fragrance ≈ 55-70% · niche (PdM etc) ≈ 65%
       hype (MFK/BR540) ≈ 85-95% — treat like DTC: low odds only
       pre-owned bags/watches ≈ 85-95% of resale ask
       beauty ≈ 55% · charms/phone ≈ 30-45% · home ≈ 50%
     · target EV(retail) ≈ 0.95-1.05× price (NOT higher — the
       old 50%-wholesale assumption was too optimistic)
     · production buyback 60-65% of value, set per item
     · commons ≥ 60% of pulls · hype/dtc/manual ≤ 3% odds each,
       ≤ 15% of pulls · sub-$15 boxes: prefer commons that ship
       under $5 or accept thin margins as acquisition boxes
     · sanity: blended margin (45% ship / 55% buyback) should
       land at 22-30% of price
   ------------------------------------------------------------
   Buyback = 70% of market value (demo rate; production sets
   per-item rates at or below landed cost). Buyback offers are
   shown POST-PULL only, never in the pre-pull odds table.
   Demo odds are tuned so EV(retail) ≈ 1.05-1.2× price and
   credit-back EV ≈ 75-95% of price: the house always wins on
   average, wins still happen. Keep it that way when editing.
   ============================================================ */

/* PRICING PASS · Aug 18 2026: every item value = assumed US consumer retail
   (brand site / Sephora, no discount) + $10 flat shipping, so the demo math
   reflects worst-case manual fulfillment. Retail figures are unverified
   placeholders; production replaces them with live supplier costs through
   the admin cost fields. Box prices + odds were re-solved after repricing
   (credit-back EV target 0.85, band 0.74-0.95). */
let BUYBACK_RATE = 0.8; /* paid-box offer as % of OUR SOURCING COST, not shown
   value. Ops dial in admin overrides it; production uses real supplier costs,
   the demo estimates by sourcing class (costOf below). */
try {
  if (typeof localStorage !== "undefined") {
    const r = parseFloat(localStorage.getItem("covet_buyback_rate"));
    if (r >= 40 && r <= 90) BUYBACK_RATE = r / 100;
  }
} catch {}

const RARITY = {
  signature: { label: "Signature", color: "#9b8fa8" },
  reserve:   { label: "Reserve",   color: "#6c8de8" },
  archive:   { label: "Archive",   color: "#dfa112" },
  grail:     { label: "Grail",     color: "#e0417c" },
};

const CASES = [
  {
    id: "cleangirl",
    numeral: "I",
    name: "The Clean Girl Box",
    short: "Clean Girl",
    price: 18,
    floorPct: 70,
    tint: "#7fb5e0",
    blurb: "Fresh, glowy, skin-but-better scents. The everyday signature that smells like you showered in money.",
    drops: [
      { id: "libre10",    house: "Yves Saint Laurent", name: "Libre",               conc: "EDP", size: "10ml travel", value: 22,  odds: 96.1,  rarity: "signature" },
      { id: "missdior10", house: "Dior",               name: "Miss Dior",           conc: "EDP", size: "10ml travel", value: 24,  odds: 3.3,  rarity: "signature" },
      { id: "adg15",      house: "Giorgio Armani",     name: "Acqua di Giò",        conc: "EDP", size: "15ml travel", value: 26,  odds: 0.1,  rarity: "signature" },
      { id: "chance20",   house: "Chanel",             name: "Chance Eau Tendre",   conc: "EDT", size: "20ml twist",  value: 48,  odds: 0.1,  rarity: "reserve" },
      { id: "paradoxe30", house: "Prada",              name: "Paradoxe",            conc: "EDP", size: "30ml",        value: 94,  odds: 0.1,  rarity: "reserve" },
      { id: "lazysun30",  house: "Maison Margiela",    name: "Replica Lazy Sunday Morning", conc: "EDT", size: "30ml", value: 95, odds: 0.1,  rarity: "reserve" },
      { id: "soleil50",   house: "Tom Ford",           name: "Soleil Blanc",        conc: "EDP", size: "50ml",        value: 395,  odds: 0.1, rarity: "archive" },
      { id: "br540_35",   house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "EDP", size: "35ml",  value: 245, odds: 0.1, rarity: "grail" },
    ],
  },
  {
    id: "thatgirl",
    numeral: "II",
    name: "The That Girl Box",
    short: "That Girl",
    price: 18,
    floorPct: 69,
    tint: "#8fc6b8",
    blurb: "5am pilates, green juice, clean hair. Fresh scents that smell like having your life together.",
    drops: [
      { id: "libre10",    house: "Yves Saint Laurent", name: "Libre",               conc: "EDP", size: "10ml travel", value: 22,  odds: 97.8,  rarity: "signature" },
      { id: "adg15",      house: "Giorgio Armani",     name: "Acqua di Giò",        conc: "EDP", size: "15ml travel", value: 26,  odds: 1.7,  rarity: "signature" },
      { id: "wsss30",     house: "Jo Malone",          name: "Wood Sage & Sea Salt",conc: "Cologne", size: "30ml",    value: 90,  odds: 0.1,  rarity: "signature" },
      { id: "santal15",   house: "Le Labo",            name: "Santal 33",           conc: "EDP", size: "15ml",        value: 115,  odds: 0.1,  rarity: "reserve" },
      { id: "glossier50", house: "Glossier",           name: "You",                 conc: "EDP", size: "50ml",        value: 88,  odds: 0.1,  rarity: "reserve" },
      { id: "lazysun30",  house: "Maison Margiela",    name: "Replica Lazy Sunday Morning", conc: "EDT", size: "30ml", value: 95, odds: 0.1,  rarity: "archive" },
      { id: "fleurnarc",  house: "Ex Nihilo",          name: "Fleur Narcotique",    conc: "EDP", size: "50ml",        value: 260, odds: 0.1,   rarity: "grail" },
    ],
  },
  {
    id: "vanillagirl",
    numeral: "III",
    name: "The Vanilla Girl Box",
    short: "Vanilla Girl",
    price: 20,
    floorPct: 65,
    tint: "#d9a86c",
    blurb: "Warm, cozy, edible. The vanillas everyone stops you to ask about.",
    drops: [
      { id: "sol62",      house: "Sol de Janeiro",     name: "Cheirosa 62 Mist",    conc: "Body mist", size: "90ml travel", value: 24, odds: 99.3, rarity: "signature", kind: "beauty" },
      { id: "kayali10",   house: "Kayali",             name: "Vanilla | 28",        conc: "EDP", size: "10ml travel", value: 34,  odds: 0.1,  rarity: "signature" },
      { id: "candy20",    house: "Prada",              name: "Candy",               conc: "EDP", size: "20ml",        value: 40,  odds: 0.1,  rarity: "signature" },
      { id: "byfire30",   house: "Maison Margiela",    name: "Replica By the Fireplace", conc: "EDT", size: "30ml",   value: 95,  odds: 0.1,  rarity: "signature" },
      { id: "tobacco30",  house: "Tom Ford",           name: "Tobacco Vanille",     conc: "EDP", size: "30ml",        value: 265, odds: 0.1,  rarity: "reserve" },
      { id: "grandsoir",  house: "Maison Francis Kurkdjian", name: "Grand Soir",    conc: "EDP", size: "70ml",        value: 245, odds: 0.1,  rarity: "reserve" },
      { id: "vanille44",  house: "Le Labo",            name: "Vanille 44",          conc: "EDP", size: "50ml",        value: 350, odds: 0.1,   rarity: "archive" },
      { id: "sdv",        house: "Guerlain",           name: "Spiritueuse Double Vanille", conc: "EDP", size: "75ml", value: 360, odds: 0.1,   rarity: "grail" },
    ],
  },
  {
    id: "coquette",
    numeral: "IV",
    name: "The Coquette Box",
    short: "Coquette",
    price: 28,
    floorPct: 70,
    tint: "#f29fb8",
    blurb: "Bows, blush, ballet flats. Soft pinks and pretty florals for your most delicate era.",
    drops: [
      { id: "monparis10", house: "Yves Saint Laurent", name: "Mon Paris",           conc: "EDP", size: "10ml travel", value: 34,  odds: 59.5,  rarity: "signature" },
      { id: "chance20",   house: "Chanel",             name: "Chance Eau Tendre",   conc: "EDT", size: "20ml twist",  value: 48,  odds: 0.1,  rarity: "signature" },
      { id: "delina10",   house: "Parfums de Marly",   name: "Delina",              conc: "EDP", size: "10ml travel", value: 34,  odds: 39.4,  rarity: "signature" },
      { id: "candy20",    house: "Prada",              name: "Candy",               conc: "EDP", size: "20ml",        value: 40,  odds: 0.6,  rarity: "reserve" },
      { id: "missdior50", house: "Dior",               name: "Miss Dior",           conc: "EDP", size: "50ml",        value: 142, odds: 0.1,  rarity: "reserve" },
      { id: "delina75",   house: "Parfums de Marly",   name: "Delina",              conc: "EDP", size: "75ml",        value: 260, odds: 0.1,   rarity: "archive" },
      { id: "poal50",     house: "Frederic Malle",     name: "Portrait of a Lady",  conc: "EDP", size: "50ml",        value: 305, odds: 0.1,   rarity: "archive" },
      { id: "delinaex",   house: "Parfums de Marly",   name: "Delina Exclusif",     conc: "Parfum", size: "75ml",     value: 350, odds: 0.1,   rarity: "grail" },
    ],
  },
  {
    id: "itgirl",
    numeral: "V",
    name: "The It Girl Box",
    short: "It Girl",
    price: 28,
    floorPct: 67,
    tint: "#ff7aa2",
    blurb: "The bottles all over your feed. Cult favorites, waitlist energy, compliments guaranteed.",
    drops: [
      { id: "delina10",   house: "Parfums de Marly",   name: "Delina",              conc: "EDP", size: "10ml travel", value: 34,  odds: 52.2,  rarity: "signature" },
      { id: "kayali10",   house: "Kayali",             name: "Vanilla | 28",        conc: "EDP", size: "10ml travel", value: 34,  odds: 47.1,  rarity: "signature" },
      { id: "amyris11",   house: "Maison Francis Kurkdjian", name: "Amyris",        conc: "EDP", size: "11ml travel", value: 50,  odds: 0.1,  rarity: "signature" },
      { id: "aventus10",  house: "Creed",              name: "Aventus",             conc: "EDP", size: "10ml travel", value: 70,  odds: 0.1,  rarity: "reserve" },
      { id: "glossier50", house: "Glossier",           name: "You",                 conc: "EDP", size: "50ml",        value: 88,  odds: 0.1,  rarity: "reserve" },
      { id: "sideeff30",  house: "Initio",             name: "Side Effect",         conc: "EDP", size: "30ml",        value: 160, odds: 0.1,   rarity: "reserve" },
      { id: "grandsoir",  house: "Maison Francis Kurkdjian", name: "Grand Soir",    conc: "EDP", size: "70ml",        value: 245, odds: 0.1,   rarity: "archive" },
      { id: "delina75",   house: "Parfums de Marly",   name: "Delina",              conc: "EDP", size: "75ml",        value: 260, odds: 0.1, rarity: "archive" },
      { id: "br540ext",   house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "Extrait", size: "70ml", value: 575, odds: 0.1, rarity: "grail" },
    ],
  },
  {
    id: "beauty",
    numeral: "VI",
    name: "The Vanity Box",
    short: "Vanity",
    price: 40,
    floorPct: 60,
    tint: "#e88fb0",
    noun: "beauty picks",
    blurb: "Makeup, skincare, and the tools your feed keeps sold out.",
    drops: [
      { id: "lipbutter",  house: "Summer Fridays",    name: "Lip Butter Balm Duo",    conc: "Lip care",    size: "2 full size", value: 58, odds: 11.5,  rarity: "signature", kind: "beauty" },
      { id: "glowdrops",  house: "Glow Recipe",       name: "Watermelon Dew Drops",   conc: "Skincare",    size: "40ml",      value: 45,  odds: 84.8,  rarity: "signature", kind: "beauty" },
      { id: "rarekit",    house: "Rare Beauty",       name: "Blush + Gloss Duo",      conc: "Makeup set",  size: "full size", value: 56,  odds: 3.2,  rarity: "signature", kind: "beauty" },
      { id: "olaplexset", house: "Olaplex",           name: "Repair Set",             conc: "Hair care",   size: "4 pieces",  value: 100,  odds: 0.1,  rarity: "reserve",   kind: "beauty" },
      { id: "ctmagic",    house: "Charlotte Tilbury", name: "Magic Cream",            conc: "Moisturizer", size: "50ml",      value: 110, odds: 0.1,  rarity: "reserve",   kind: "beauty" },
      { id: "lamer", dtc: true,      house: "La Mer",            name: "Crème de la Mer",        conc: "Moisturizer", size: "60ml",      value: 390, odds: 0.1,   rarity: "archive",   kind: "beauty" },
      { id: "airwrap", dtc: true,    house: "Dyson",             name: "Airwrap Complete",       conc: "Multi-styler", size: "long barrel", value: 609, odds: 0.1, rarity: "archive", kind: "beauty" },
      { id: "laprairie", dtc: true,  house: "La Prairie",        name: "Skin Caviar",            conc: "Moisturizer", size: "50ml",      value: 660, odds: 0.1, rarity: "grail",     kind: "beauty" },
    ],
  },
  {
    id: "datenight",
    numeral: "VII",
    name: "The Date Night Box",
    short: "Date Night",
    price: 75,
    floorPct: 70,
    tint: "#c2385e",
    blurb: "The ones that get you noticed from across the table. Order dessert.",
    drops: [
      { id: "blackop30",  house: "Yves Saint Laurent", name: "Black Opium",         conc: "EDP", size: "30ml",        value: 95,  odds: 91.7,  rarity: "signature" },
      { id: "goodgirl30", house: "Carolina Herrera",   name: "Good Girl",           conc: "EDP", size: "30ml",        value: 85,  odds: 3.8,  rarity: "signature" },
      { id: "libreint",   house: "Yves Saint Laurent", name: "Libre Intense",       conc: "EDP", size: "30ml",        value: 95,  odds: 4,  rarity: "signature" },
      { id: "hypnotic50", house: "Dior",               name: "Hypnotic Poison",     conc: "EDT", size: "50ml",        value: 109,  odds: 0.1,  rarity: "reserve" },
      { id: "sideeff30",  house: "Initio",             name: "Side Effect",         conc: "EDP", size: "30ml",        value: 160, odds: 0.1,  rarity: "reserve" },
      { id: "lostcherry30", house: "Tom Ford",         name: "Lost Cherry",         conc: "EDP", size: "30ml",        value: 265, odds: 0.1,   rarity: "archive" },
      { id: "ldbs50",     house: "Kilian",             name: "Love, Don't Be Shy",  conc: "EDP", size: "50ml",        value: 405, odds: 0.1, rarity: "archive" },
      { id: "br540ext",   house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "Extrait", size: "70ml", value: 575, odds: 0.1, rarity: "grail" },
    ],
  },
  {
    id: "sunnies",
    numeral: "VIII",
    name: "The Off Duty Box",
    short: "Off Duty",
    price: 50,
    floorPct: 70,
    tint: "#e8a94e",
    noun: "pairs",
    blurb: "Sunglasses with main-character energy, from cult favorites to Cartier.",
    drops: [
      { id: "lespecs",    house: "Le Specs", name: "Outta Love",          conc: "Sunglasses", size: "one size", value: 59,  odds: 99.3,  rarity: "signature", kind: "sunnies" },
      { id: "quaysun",    house: "Quay",     name: "High Key",            conc: "Sunglasses", size: "one size", value: 75,  odds: 0.2,  rarity: "signature", kind: "sunnies" },
      { id: "raybansun",  house: "Ray-Ban",  name: "Wayfarer",            conc: "Sunglasses", size: "one size", value: 180, odds: 0.1,  rarity: "reserve",   kind: "sunnies" },
      { id: "guccisun",   house: "Gucci",    name: "GG Oversized",        conc: "Sunglasses", size: "one size", value: 395, odds: 0.1,  rarity: "reserve",   kind: "sunnies" },
      { id: "miumiusun",  house: "Miu Miu",  name: "Glimpse",             conc: "Sunglasses", size: "one size", value: 430, odds: 0.1,  rarity: "reserve",   kind: "sunnies" },
      { id: "pradasun",   house: "Prada",    name: "Symbole",             conc: "Sunglasses", size: "one size", value: 480, odds: 0.1, rarity: "archive",   kind: "sunnies" },
      { id: "cartiersun", house: "Cartier",  name: "Panthère de Cartier", conc: "Sunglasses", size: "one size", value: 995, odds: 0.1, rarity: "grail",     kind: "sunnies" },
    ],
  },
  {
    id: "darkfem",
    numeral: "IX",
    name: "The Dark Feminine Box",
    short: "Dark Feminine",
    price: 75,
    floorPct: 59,
    tint: "#5e3b63",
    blurb: "Mysterious, moody, a little dangerous. Wear at your own risk.",
    drops: [
      { id: "blackop30",  house: "Yves Saint Laurent", name: "Black Opium",         conc: "EDP", size: "30ml",        value: 95,  odds: 97.5,  rarity: "signature" },
      { id: "hypnotic50", house: "Dior",               name: "Hypnotic Poison",     conc: "EDT", size: "50ml",        value: 109,  odds: 1.9,  rarity: "signature" },
      { id: "blackorchid30", house: "Tom Ford",        name: "Black Orchid",        conc: "EDP", size: "30ml",        value: 130, odds: 0.1,  rarity: "reserve" },
      { id: "sideeff30",  house: "Initio",             name: "Side Effect",         conc: "EDP", size: "30ml",        value: 160, odds: 0.1,  rarity: "reserve" },
      { id: "oudgreat",   house: "Initio",             name: "Oud for Greatness",   conc: "EDP", size: "90ml",        value: 385, odds: 0.1,  rarity: "reserve" },
      { id: "lostcherry30", house: "Tom Ford",         name: "Lost Cherry",         conc: "EDP", size: "30ml",        value: 265, odds: 0.1,   rarity: "archive" },
      { id: "afgano30",   house: "Nasomatto",          name: "Black Afgano (first batch)", conc: "Extrait", size: "30ml", value: 530, odds: 0.1, rarity: "archive" },
      { id: "alex2",      house: "Xerjoff",            name: "Alexandria II",       conc: "Parfum", size: "50ml",     value: 650, odds: 0.1,   rarity: "grail" },
    ],
  },
  {
    id: "oldmoney",
    numeral: "X",
    name: "The Old Money Box",
    short: "Old Money",
    price: 100,
    floorPct: 67,
    tint: "#5d8a6b",
    blurb: "Quiet luxury, full bottles only. Smells like a trust fund and a cashmere coat.",
    drops: [
      { id: "oudwood30",  house: "Tom Ford",           name: "Oud Wood",            conc: "EDP", size: "30ml",        value: 265,  odds: 1.4,  rarity: "signature" },
      { id: "santal15",   house: "Le Labo",            name: "Santal 33",           conc: "EDP", size: "15ml",        value: 115,  odds: 97,  rarity: "signature" },
      { id: "layton75",   house: "Parfums de Marly",   name: "Layton",              conc: "EDP", size: "75ml",        value: 260, odds: 0.2,  rarity: "reserve" },
      { id: "naxos100",   house: "Xerjoff",            name: "Naxos",               conc: "EDP", size: "100ml",       value: 265, odds: 0.2,  rarity: "reserve" },
      { id: "oudgreat",   house: "Initio",             name: "Oud for Greatness",   conc: "EDP", size: "90ml",        value: 385, odds: 0.2,  rarity: "reserve" },
      { id: "br540_70",   house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "EDP", size: "70ml",  value: 335, odds: 0.2,   rarity: "archive" },
      { id: "aventus100g",house: "Creed",              name: "Aventus",             conc: "EDP", size: "100ml",       value: 505, odds: 0.3,   rarity: "archive" },
      { id: "amberaoud",  house: "Roja Parfums",       name: "Amber Aoud",          conc: "Parfum", size: "30ml",     value: 455, odds: 0.2, rarity: "grail" },
      { id: "clivex",     house: "Clive Christian",    name: "X",                   conc: "Parfum", size: "50ml",     value: 480, odds: 0.3, rarity: "grail" },
    ],
  },
  {
    id: "richmom",
    numeral: "XI",
    name: "The Rich Mom Box",
    short: "Rich Mom",
    price: 100,
    floorPct: 70,
    tint: "#b98d5f",
    blurb: "School run in cashmere. Quiet icons that never try too hard.",
    drops: [
      { id: "cocomad",    house: "Chanel",             name: "Coco Mademoiselle",   conc: "EDP", size: "35ml",        value: 120,  odds: 98.9,  rarity: "signature" },
      { id: "gabrielle",  house: "Chanel",             name: "Gabrielle Essence",   conc: "EDP", size: "50ml",        value: 145, odds: 0.4,  rarity: "signature" },
      { id: "rose31",     house: "Le Labo",            name: "Rose 31",             conc: "EDP", size: "50ml",        value: 245, odds: 0.1,  rarity: "reserve" },
      { id: "layton75",   house: "Parfums de Marly",   name: "Layton",              conc: "EDP", size: "75ml",        value: 260, odds: 0.1,  rarity: "reserve" },
      { id: "no5parfum",  house: "Chanel",             name: "N°5",                 conc: "Parfum", size: "35ml",     value: 305, odds: 0.1,  rarity: "reserve" },
      { id: "br540_70",   house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "EDP", size: "70ml",  value: 335, odds: 0.1,   rarity: "archive" },
      { id: "aventus100g",house: "Creed",              name: "Aventus",             conc: "EDP", size: "100ml",       value: 505, odds: 0.1,   rarity: "archive" },
      { id: "clivex",     house: "Clive Christian",    name: "X",                   conc: "Parfum", size: "50ml",     value: 480, odds: 0.1, rarity: "grail" },
      { id: "windsor75",  house: "Creed",              name: "Windsor",             conc: "EDP", size: "75ml",        value: 790, odds: 0.1, rarity: "grail" },
    ],
  },
  {
    id: "archive",
    numeral: "XII",
    name: "The Archive Box",
    short: "The Archive",
    price: 100,
    floorPct: 70,
    tint: "#b673e8",
    blurb: "Discontinued formulas the houses stopped making. Sourced sealed, guaranteed authentic, impossible to rebuy.",
    drops: [
      { id: "m7oud",      house: "Yves Saint Laurent", name: "M7 Oud Absolu",       conc: "EDT", size: "80ml",        value: 120, odds: 95.5,  rarity: "signature" },
      { id: "dhp75",      house: "Dior",               name: "Homme Parfum (2014)", conc: "Parfum", size: "75ml",     value: 195, odds: 2.4,  rarity: "signature" },
      { id: "envy50",     house: "Gucci",              name: "Envy",                conc: "EDT", size: "50ml",        value: 230, odds: 0.4,  rarity: "reserve" },
      { id: "coromandel", house: "Chanel",             name: "Coromandel (EDT era)",conc: "EDT", size: "75ml",        value: 320, odds: 0.1,  rarity: "reserve" },
      { id: "vanille44",  house: "Le Labo",            name: "Vanille 44",          conc: "EDP", size: "50ml",        value: 350, odds: 0.8,  rarity: "reserve" },
      { id: "kingdom50",  house: "Alexander McQueen",  name: "Kingdom",             conc: "EDP", size: "50ml",        value: 390, odds: 0.4,   rarity: "archive" },
      { id: "afgano30",   house: "Nasomatto",          name: "Black Afgano (first batch)", conc: "Extrait", size: "30ml", value: 530, odds: 0.2, rarity: "archive" },
      { id: "champagne",  house: "Yves Saint Laurent", name: "Champagne (1993)",    conc: "EDT", size: "75ml",        value: 650, odds: 0.1, rarity: "grail" },
      { id: "windsor75",  house: "Creed",              name: "Windsor",             conc: "EDP", size: "75ml",        value: 790, odds: 0.1, rarity: "grail" },
    ],
  },
  {
    id: "handbag",
    numeral: "XIII",
    name: "The Arm Candy Box",
    short: "Arm Candy",
    price: 250,
    floorPct: 70,
    tint: "#e0417c",
    noun: "bags",
    blurb: "Real designer bags, always guaranteed authentic. From Prada to vintage Chanel.",
    drops: [
      { id: "polene1",    house: "Polène",         name: "Numéro Un Nano",          conc: "Full-grain leather", size: "with dust bag", value: 280,  odds: 91.7,  rarity: "signature", kind: "bag" },
      { id: "tabby26",    house: "Coach",          name: "Tabby 26",                conc: "Pre-loved, excellent", size: "authenticated", value: 360,  odds: 6.6,  rarity: "signature", kind: "bag" },
      { id: "mjtote",     house: "Marc Jacobs",    name: "The Tote Bag, leather",   conc: "Pre-loved, excellent", size: "authenticated", value: 505,  odds: 0.1,  rarity: "reserve", kind: "bag" },
      { id: "renylon",    house: "Prada",          name: "Re-Nylon Mini",           conc: "Pre-loved, excellent", size: "authenticated", value: 1005,  odds: 0.8,  rarity: "reserve", kind: "bag" },
      { id: "marmont",    house: "Gucci",          name: "Marmont Small",           conc: "Pre-loved, excellent", size: "authenticated", value: 1200, odds: 0.4,  rarity: "reserve", kind: "bag" },
      { id: "loucamera",  house: "Saint Laurent",  name: "Lou Camera Bag",          conc: "Pre-loved, excellent", size: "authenticated", value: 1460, odds: 0.2,   rarity: "archive", kind: "bag" },
      { id: "chanelwoc",  house: "Chanel",         name: "Wallet on Chain, vintage",conc: "Pre-loved, very good", size: "authenticated", value: 2810, odds: 0.1, rarity: "archive", kind: "bag" },
      { id: "classicflap",house: "Chanel",         name: "Classic Flap Medium, vintage", conc: "Pre-loved, excellent", size: "authenticated", value: 5910, odds: 0.1, rarity: "grail", kind: "bag" },
    ],
  },
  {
    id: "heiress",
    numeral: "XIV",
    name: "The Heiress Box",
    short: "Heiress",
    price: 1500,
    floorPct: 60,
    tint: "#b98d3f",
    noun: "pieces",
    blurb: "Hermès, Cartier, Van Cleef, Rolex. The dream shelf, one reveal away.",
    drops: [
      { id: "gucci1955", dtc: true,  house: "Gucci",              name: "Horsebit 1955",             conc: "Pre-loved, excellent", size: "authenticated", value: 1300,  odds: 56.1,  rarity: "signature", kind: "bag" },
      { id: "yslkate", dtc: true,    house: "Saint Laurent",      name: "Kate Medium",               conc: "Pre-loved, excellent", size: "authenticated", value: 1660,  odds: 33.5,  rarity: "signature", kind: "bag" },
      { id: "chanelwoc",  house: "Chanel",             name: "Wallet on Chain, vintage",  conc: "Pre-loved, very good", size: "authenticated", value: 2810, odds: 7.4, rarity: "reserve", kind: "bag" },
      { id: "vca5", dtc: true,       house: "Van Cleef & Arpels", name: "Vintage Alhambra Bracelet", conc: "Pre-loved, excellent", size: "authenticated", value: 4210,  odds: 1.5,  rarity: "reserve",   kind: "jewelry" },
      { id: "cartierlove", dtc: true,house: "Cartier",            name: "Love Bracelet, small",      conc: "Pre-loved, excellent", size: "authenticated", value: 4960,  odds: 0.8,   rarity: "archive",   kind: "jewelry" },
      { id: "classicflap",house: "Chanel",             name: "Classic Flap Medium, vintage", conc: "Pre-loved, excellent", size: "authenticated", value: 5910, odds: 0.4, rarity: "archive", kind: "bag" },
      { id: "rolex28", dtc: true,    house: "Rolex",              name: "Datejust 28",               conc: "Pre-loved, excellent", size: "authenticated", value: 6910,  odds: 0.2, rarity: "grail",     kind: "watch" },
      { id: "birkin25", dtc: true,   house: "Hermès",             name: "Birkin 25, Togo",           conc: "Pre-loved, excellent", size: "authenticated", value: 14510, odds: 0.1, rarity: "grail",     kind: "bag" },
    ],
  },
  {
    id: "ritual",
    numeral: "XV",
    name: "The Ritual Box",
    short: "Ritual",
    price: 15,
    floorPct: 61,
    tint: "#7d6b8f",
    noun: "little rituals",
    blurb: "Palo santo, incense, and the candles your room has been begging for.",
    drops: [
      { id: "satya3",     house: "Satya",                  name: "Nag Champa Incense, 3-pack", conc: "Incense", size: "36 sticks", value: 17,   odds: 76.4,  rarity: "signature", kind: "home" },
      { id: "palosanto",  house: "Luna Sundara",           name: "Palo Santo Bundle",          conc: "Smudge",  size: "6 sticks",  value: 19,   odds: 20.6,  rarity: "signature", kind: "home" },
      { id: "pfincense",  house: "P.F. Candle Co.",        name: "Teakwood Incense",           conc: "Incense", size: "15 sticks", value: 24,  odds: 1.6,  rarity: "signature", kind: "home" },
      { id: "bkmini",     house: "Brooklyn Candle Studio", name: "Escapist Mini Candle",       conc: "Candle",  size: "3 oz",      value: 26,  odds: 0.4,  rarity: "reserve",   kind: "home" },
      { id: "mlmcandle",  house: "Maison Louis Marie",     name: "No.04 Bois de Balincourt",   conc: "Candle",  size: "8.5 oz",    value: 48,  odds: 0.2,   rarity: "reserve",   kind: "home" },
      { id: "boysmells",  house: "Boy Smells",             name: "Kush Candle",                conc: "Candle",  size: "8.5 oz",    value: 52,  odds: 0.2, rarity: "archive",   kind: "home" },
      { id: "dipmini",    house: "Diptyque",               name: "Baies Mini Candle",          conc: "Candle",  size: "70 g",      value: 54,  odds: 0.2, rarity: "archive",   kind: "home" },
      { id: "trudon",     house: "Trudon",                 name: "Abd El Kader Classic",       conc: "Candle",  size: "9.5 oz",    value: 140, odds: 0.4, rarity: "grail",     kind: "home" },
    ],
  },
  {
    id: "charms",
    numeral: "XVI",
    name: "The Charm Box",
    short: "Charms",
    price: 12,
    floorPct: 58,
    tint: "#e878a8",
    noun: "little treasures",
    blurb: "Sonny Angels, Labubus, bag charms. Tiny, chaotic, completely necessary.",
    drops: [
      { id: "beadcharm",  house: "String Ting",       name: "Beaded Phone Charm",   conc: "Charm",        size: "handmade",  value: 15,   odds: 96.7,  rarity: "signature", kind: "charm" },
      { id: "enamelcharm",house: "BaubleBar",         name: "Enamel Bag Charm",     conc: "Charm",        size: "gold-tone", value: 18,   odds: 2.7,  rarity: "signature", kind: "charm" },
      { id: "sonnyangel", house: "Sonny Angel",       name: "Hippers Series Figure",conc: "Blind figure", size: "sealed",    value: 22,  odds: 0.1,  rarity: "signature", kind: "charm" },
      { id: "labubu",     house: "Pop Mart",          name: "Labubu Macaron Charm", conc: "Blind box",    size: "sealed",    value: 32,  odds: 0.1,   rarity: "reserve",   kind: "charm" },
      { id: "susancharm", house: "Susan Alexandra",   name: "Beaded Bag Charm",     conc: "Charm",        size: "handmade",  value: 48,  odds: 0.1,   rarity: "reserve",   kind: "charm" },
      { id: "coachcharm", house: "Coach",             name: "Leather Bag Charm",    conc: "Charm",        size: "with box",  value: 58,  odds: 0.1,   rarity: "archive",   kind: "charm" },
      { id: "labuburare", dtc: true, house: "Pop Mart",          name: "Labubu Secret Edition",conc: "Blind box",    size: "sealed",    value: 130, odds: 0.1, rarity: "archive",   kind: "charm" },
      { id: "vworb",      house: "Vivienne Westwood", name: "Mini Orb Pendant",     conc: "Necklace",     size: "with box",  value: 160, odds: 0.1, rarity: "grail",     kind: "charm" },
    ],
  },
  {
    id: "phonecase",
    numeral: "XVII",
    name: "The Phone Case Box",
    short: "Phone Case",
    price: 15,
    floorPct: 46,
    tint: "#7fa8d9",
    noun: "phone cases",
    blurb: "Rhode, Wildflower, Casetify. Your phone deserves a glow up too.",
    drops: [
      { id: "skinnydip",  house: "Skinnydip London",     name: "Clear Aesthetic Case", conc: "Phone case", size: "your model", value: 20,  odds: 99.3,  rarity: "signature", kind: "phone" },
      { id: "burga",      house: "Burga",                name: "Snap Case",            conc: "Phone case", size: "your model", value: 38,  odds: 0.1,  rarity: "signature", kind: "phone" },
      { id: "wildflower", dtc: true, house: "Wildflower",           name: "Limited Case",         conc: "Phone case", size: "your model", value: 48,  odds: 0.1,  rarity: "reserve",   kind: "phone" },
      { id: "rhodecase",  dtc: true, house: "Rhode",                name: "Lip Case",             conc: "Phone case", size: "your model", value: 48,  odds: 0.1,   rarity: "reserve",   kind: "phone" },
      { id: "sonixcase",  house: "Sonix",                name: "MagSafe Case",         conc: "Phone case", size: "your model", value: 55,  odds: 0.1,   rarity: "reserve",   kind: "phone" },
      { id: "puffercase", dtc: true, house: "Urban Sophistication", name: "The Puffer Case",      conc: "Phone case", size: "your model", value: 58,  odds: 0.1, rarity: "archive",   kind: "phone" },
      { id: "casetify",   dtc: true, house: "Casetify",             name: "Impact Case",          conc: "Phone case", size: "your model", value: 88,  odds: 0.1, rarity: "archive",   kind: "phone" },
      { id: "bandolier",  house: "Bandolier",            name: "Crossbody Case",       conc: "Phone case", size: "your model", value: 138, odds: 0.1, rarity: "grail",     kind: "phone" },
    ],
  },
  {
    id: "littletreat",
    numeral: "XIX",
    name: "The Little Treat Box",
    short: "Little Treat",
    price: 28,
    floorPct: 0,
    tint: "#f4a9bc",
    blurb: "Tiny luxuries, real labels. Because you were so good this week.",
    drops: [
      { id: "labubu", house: "Pop Mart", name: "Labubu Macaron Charm", conc: "Blind box", size: "sealed", value: 32, odds: 19, rarity: "reserve", kind: "charm" },
      { id: "kayali10", house: "Kayali", name: "Vanilla | 28", conc: "EDP", size: "10ml travel", value: 34, odds: 23.2, rarity: "signature" },
      { id: "monparis10", house: "Yves Saint Laurent", name: "Mon Paris", conc: "EDP", size: "10ml travel", value: 34, odds: 23.3, rarity: "signature" },
      { id: "delina10", house: "Parfums de Marly", name: "Delina", conc: "EDP", size: "10ml travel", value: 34, odds: 23.3, rarity: "signature" },
      { id: "candy20", house: "Prada", name: "Candy", conc: "EDP", size: "20ml", value: 40, odds: 6.4, rarity: "signature" },
      { id: "glowdrops", house: "Glow Recipe", name: "Watermelon Dew Drops", conc: "Skincare", size: "40ml", value: 45, odds: 2.5, rarity: "signature", kind: "beauty" },
      { id: "chance20", house: "Chanel", name: "Chance Eau Tendre", conc: "EDT", size: "20ml twist", value: 48, odds: 0.7, rarity: "reserve" },
      { id: "amyris11", house: "Maison Francis Kurkdjian", name: "Amyris", conc: "EDP", size: "11ml travel", value: 50, odds: 1.1, rarity: "signature" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 0.3, rarity: "signature", kind: "beauty" },
      { id: "aventus10", house: "Creed", name: "Aventus", conc: "EDP", size: "10ml travel", value: 70, odds: 0.1, rarity: "reserve" },
      { id: "santal15", house: "Le Labo", name: "Santal 33", conc: "EDP", size: "15ml", value: 115, odds: 0.1, rarity: "reserve" },
    ],
  },
  {
    id: "softlife",
    numeral: "XX",
    name: "The Soft Life Box",
    short: "Soft Life",
    price: 75,
    floorPct: 0,
    tint: "#c9a7e0",
    blurb: "Lounge sets, warm candles, glow in a jar. The night in, perfected.",
    drops: [
      { id: "mlmcandle", house: "Maison Louis Marie", name: "No.04 Bois de Balincourt", conc: "Candle", size: "8.5 oz", value: 48, odds: 6.8, rarity: "reserve", kind: "home" },
      { id: "boysmells", house: "Boy Smells", name: "Kush Candle", conc: "Candle", size: "8.5 oz", value: 52, odds: 2.3, rarity: "archive", kind: "home" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 14.4, rarity: "signature", kind: "beauty" },
      { id: "rarekit", house: "Rare Beauty", name: "Blush + Gloss Duo", conc: "Makeup set", size: "full size", value: 56, odds: 14.3, rarity: "signature", kind: "beauty" },
      { id: "glossier50", house: "Glossier", name: "You", conc: "EDP", size: "50ml", value: 88, odds: 8.2, rarity: "reserve" },
      { id: "byfire30", house: "Maison Margiela", name: "Replica By the Fireplace", conc: "EDT", size: "30ml", value: 95, odds: 16.6, rarity: "signature" },
      { id: "lazysun30", house: "Maison Margiela", name: "Replica Lazy Sunday Morning", conc: "EDT", size: "30ml", value: 95, odds: 8.3, rarity: "reserve" },
      { id: "ctmagic", house: "Charlotte Tilbury", name: "Magic Cream", conc: "Moisturizer", size: "50ml", value: 110, odds: 8.7, rarity: "reserve", kind: "beauty" },
      { id: "skimsset", house: "SKIMS", name: "Soft Lounge Set", conc: "Lounge set", size: "your size", value: 108, odds: 8.7, rarity: "reserve", kind: "clothes" },
      { id: "trudon", house: "Trudon", name: "Abd El Kader Classic", conc: "Candle", size: "9.5 oz", value: 140, odds: 1.6, rarity: "grail", kind: "home" },
      { id: "aloset", house: "Alo Yoga", name: "Airlift Set", conc: "Activewear set", size: "your size", value: 180, odds: 10.1, rarity: "reserve", kind: "clothes" },
    ],
  },
  {
    id: "birthdaygirl",
    numeral: "XXI",
    name: "The Birthday Girl Box",
    short: "Birthday Girl",
    price: 40,
    floorPct: 0,
    tint: "#f2b64f",
    blurb: "It's her day. Sweet scents, party makeup, and one candle worth wishing on.",
    drops: [
      { id: "monparis10", house: "Yves Saint Laurent", name: "Mon Paris", conc: "EDP", size: "10ml travel", value: 34, odds: 32.9, rarity: "signature" },
      { id: "candy20", house: "Prada", name: "Candy", conc: "EDP", size: "20ml", value: 40, odds: 23, rarity: "signature" },
      { id: "glowdrops", house: "Glow Recipe", name: "Watermelon Dew Drops", conc: "Skincare", size: "40ml", value: 45, odds: 17.8, rarity: "signature", kind: "beauty" },
      { id: "rarekit", house: "Rare Beauty", name: "Blush + Gloss Duo", conc: "Makeup set", size: "full size", value: 56, odds: 11, rarity: "signature", kind: "beauty" },
      { id: "goodgirl30", house: "Carolina Herrera", name: "Good Girl", conc: "EDP", size: "30ml", value: 85, odds: 4.4, rarity: "signature" },
      { id: "blackop30", house: "Yves Saint Laurent", name: "Black Opium", conc: "EDP", size: "30ml", value: 95, odds: 3.4, rarity: "signature" },
      { id: "libreint", house: "Yves Saint Laurent", name: "Libre Intense", conc: "EDP", size: "30ml", value: 95, odds: 3.4, rarity: "signature" },
      { id: "hypnotic50", house: "Dior", name: "Hypnotic Poison", conc: "EDT", size: "50ml", value: 109, odds: 1.3, rarity: "reserve" },
      { id: "dipmini", house: "Diptyque", name: "Baies Mini Candle", conc: "Candle", size: "70 g", value: 54, odds: 2, rarity: "archive", kind: "home" },
      { id: "missdior50", house: "Dior", name: "Miss Dior", conc: "EDP", size: "50ml", value: 142, odds: 0.7, rarity: "reserve" },
      { id: "delina75", house: "Parfums de Marly", name: "Delina", conc: "EDP", size: "75ml", value: 260, odds: 0.1, rarity: "archive" },
    ],
  },
  {
    id: "everything",
    numeral: "XXII",
    name: "The Everything Box",
    short: "Everything",
    price: 50,
    floorPct: 0,
    tint: "#e0417c",
    blurb: "Practically the whole vault in one box. Dozens of pieces, tiny odds each, so no two opens ever feel the same.",
    drops: [
      { id: "libre10", house: "Yves Saint Laurent", name: "Libre", conc: "EDP", size: "10ml travel", value: 22, odds: 6.1, rarity: "signature" },
      { id: "missdior10", house: "Dior", name: "Miss Dior", conc: "EDP", size: "10ml travel", value: 24, odds: 5.6, rarity: "signature" },
      { id: "adg15", house: "Giorgio Armani", name: "Acqua di Giò", conc: "EDP", size: "15ml travel", value: 26, odds: 5.1, rarity: "signature" },
      { id: "chance20", house: "Chanel", name: "Chance Eau Tendre", conc: "EDT", size: "20ml twist", value: 48, odds: 1.3, rarity: "reserve" },
      { id: "paradoxe30", house: "Prada", name: "Paradoxe", conc: "EDP", size: "30ml", value: 94, odds: 0.7, rarity: "reserve" },
      { id: "lazysun30", house: "Maison Margiela", name: "Replica Lazy Sunday Morning", conc: "EDT", size: "30ml", value: 95, odds: 0.6, rarity: "reserve" },
      { id: "soleil50", house: "Tom Ford", name: "Soleil Blanc", conc: "EDP", size: "50ml", value: 395, odds: 0.1, rarity: "archive" },
      { id: "br540_35", house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "EDP", size: "35ml", value: 245, odds: 0.1, rarity: "grail" },
      { id: "wsss30", house: "Jo Malone", name: "Wood Sage & Sea Salt", conc: "Cologne", size: "30ml", value: 90, odds: 1.4, rarity: "signature" },
      { id: "santal15", house: "Le Labo", name: "Santal 33", conc: "EDP", size: "15ml", value: 115, odds: 0.5, rarity: "reserve" },
      { id: "glossier50", house: "Glossier", name: "You", conc: "EDP", size: "50ml", value: 88, odds: 0.7, rarity: "reserve" },
      { id: "fleurnarc", house: "Ex Nihilo", name: "Fleur Narcotique", conc: "EDP", size: "50ml", value: 260, odds: 0.1, rarity: "grail" },
      { id: "kayali10", house: "Kayali", name: "Vanilla | 28", conc: "EDP", size: "10ml travel", value: 34, odds: 3.8, rarity: "signature" },
      { id: "candy20", house: "Prada", name: "Candy", conc: "EDP", size: "20ml", value: 40, odds: 3.2, rarity: "signature" },
      { id: "byfire30", house: "Maison Margiela", name: "Replica By the Fireplace", conc: "EDT", size: "30ml", value: 95, odds: 1.3, rarity: "signature" },
      { id: "tobacco30", house: "Tom Ford", name: "Tobacco Vanille", conc: "EDP", size: "30ml", value: 265, odds: 0.2, rarity: "reserve" },
      { id: "grandsoir", house: "Maison Francis Kurkdjian", name: "Grand Soir", conc: "EDP", size: "70ml", value: 245, odds: 0.2, rarity: "reserve" },
      { id: "vanille44", house: "Le Labo", name: "Vanille 44", conc: "EDP", size: "50ml", value: 350, odds: 0.1, rarity: "archive" },
      { id: "sdv", house: "Guerlain", name: "Spiritueuse Double Vanille", conc: "EDP", size: "75ml", value: 360, odds: 0.1, rarity: "grail" },
      { id: "monparis10", house: "Yves Saint Laurent", name: "Mon Paris", conc: "EDP", size: "10ml travel", value: 34, odds: 3.8, rarity: "signature" },
      { id: "delina10", house: "Parfums de Marly", name: "Delina", conc: "EDP", size: "10ml travel", value: 34, odds: 3.8, rarity: "signature" },
      { id: "missdior50", house: "Dior", name: "Miss Dior", conc: "EDP", size: "50ml", value: 142, odds: 0.4, rarity: "reserve" },
      { id: "delina75", house: "Parfums de Marly", name: "Delina", conc: "EDP", size: "75ml", value: 260, odds: 0.1, rarity: "archive" },
      { id: "poal50", house: "Frederic Malle", name: "Portrait of a Lady", conc: "EDP", size: "50ml", value: 305, odds: 0.1, rarity: "archive" },
      { id: "delinaex", house: "Parfums de Marly", name: "Delina Exclusif", conc: "Parfum", size: "75ml", value: 350, odds: 0.1, rarity: "grail" },
      { id: "amyris11", house: "Maison Francis Kurkdjian", name: "Amyris", conc: "EDP", size: "11ml travel", value: 50, odds: 2.6, rarity: "signature" },
      { id: "aventus10", house: "Creed", name: "Aventus", conc: "EDP", size: "10ml travel", value: 70, odds: 0.9, rarity: "reserve" },
      { id: "sideeff30", house: "Initio", name: "Side Effect", conc: "EDP", size: "30ml", value: 160, odds: 0.4, rarity: "reserve" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 2.2, rarity: "signature", kind: "beauty" },
      { id: "glowdrops", house: "Glow Recipe", name: "Watermelon Dew Drops", conc: "Skincare", size: "40ml", value: 45, odds: 2.9, rarity: "signature", kind: "beauty" },
      { id: "rarekit", house: "Rare Beauty", name: "Blush + Gloss Duo", conc: "Makeup set", size: "full size", value: 56, odds: 2.3, rarity: "signature", kind: "beauty" },
      { id: "olaplexset", house: "Olaplex", name: "Repair Set", conc: "Hair care", size: "4 pieces", value: 100, odds: 0.6, rarity: "reserve", kind: "beauty" },
      { id: "ctmagic", house: "Charlotte Tilbury", name: "Magic Cream", conc: "Moisturizer", size: "50ml", value: 110, odds: 0.6, rarity: "reserve", kind: "beauty" },
      { id: "blackop30", house: "Yves Saint Laurent", name: "Black Opium", conc: "EDP", size: "30ml", value: 95, odds: 1.3, rarity: "signature" },
      { id: "goodgirl30", house: "Carolina Herrera", name: "Good Girl", conc: "EDP", size: "30ml", value: 85, odds: 1.5, rarity: "signature" },
      { id: "libreint", house: "Yves Saint Laurent", name: "Libre Intense", conc: "EDP", size: "30ml", value: 95, odds: 1.3, rarity: "signature" },
      { id: "hypnotic50", house: "Dior", name: "Hypnotic Poison", conc: "EDT", size: "50ml", value: 109, odds: 0.6, rarity: "reserve" },
      { id: "lostcherry30", house: "Tom Ford", name: "Lost Cherry", conc: "EDP", size: "30ml", value: 265, odds: 0.1, rarity: "archive" },
      { id: "ldbs50", house: "Kilian", name: "Love, Don't Be Shy", conc: "EDP", size: "50ml", value: 405, odds: 0.1, rarity: "archive" },
      { id: "lespecs", house: "Le Specs", name: "Outta Love", conc: "Sunglasses", size: "one size", value: 59, odds: 2.1, rarity: "signature", kind: "sunnies" },
      { id: "quaysun", house: "Quay", name: "High Key", conc: "Sunglasses", size: "one size", value: 75, odds: 1.7, rarity: "signature", kind: "sunnies" },
      { id: "raybansun", house: "Ray-Ban", name: "Wayfarer", conc: "Sunglasses", size: "one size", value: 180, odds: 0.3, rarity: "reserve", kind: "sunnies" },
      { id: "guccisun", house: "Gucci", name: "GG Oversized", conc: "Sunglasses", size: "one size", value: 395, odds: 0.1, rarity: "reserve", kind: "sunnies" },
      { id: "miumiusun", house: "Miu Miu", name: "Glimpse", conc: "Sunglasses", size: "one size", value: 430, odds: 0.1, rarity: "reserve", kind: "sunnies" },
      { id: "pradasun", house: "Prada", name: "Symbole", conc: "Sunglasses", size: "one size", value: 480, odds: 0.1, rarity: "archive", kind: "sunnies" },
      { id: "blackorchid30", house: "Tom Ford", name: "Black Orchid", conc: "EDP", size: "30ml", value: 130, odds: 0.5, rarity: "reserve" },
      { id: "oudgreat", house: "Initio", name: "Oud for Greatness", conc: "EDP", size: "90ml", value: 385, odds: 0.1, rarity: "reserve" },
      { id: "oudwood30", house: "Tom Ford", name: "Oud Wood", conc: "EDP", size: "30ml", value: 265, odds: 0.4, rarity: "signature" },
      { id: "layton75", house: "Parfums de Marly", name: "Layton", conc: "EDP", size: "75ml", value: 260, odds: 0.2, rarity: "reserve" },
      { id: "naxos100", house: "Xerjoff", name: "Naxos", conc: "EDP", size: "100ml", value: 265, odds: 0.2, rarity: "reserve" },
      { id: "br540_70", house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "EDP", size: "70ml", value: 335, odds: 0.1, rarity: "archive" },
      { id: "amberaoud", house: "Roja Parfums", name: "Amber Aoud", conc: "Parfum", size: "30ml", value: 455, odds: 0.1, rarity: "grail" },
      { id: "clivex", house: "Clive Christian", name: "X", conc: "Parfum", size: "50ml", value: 480, odds: 0.1, rarity: "grail" },
      { id: "cocomad", house: "Chanel", name: "Coco Mademoiselle", conc: "EDP", size: "35ml", value: 120, odds: 1, rarity: "signature" },
      { id: "gabrielle", house: "Chanel", name: "Gabrielle Essence", conc: "EDP", size: "50ml", value: 145, odds: 0.8, rarity: "signature" },
      { id: "rose31", house: "Le Labo", name: "Rose 31", conc: "EDP", size: "50ml", value: 245, odds: 0.2, rarity: "reserve" },
      { id: "no5parfum", house: "Chanel", name: "N°5", conc: "Parfum", size: "35ml", value: 305, odds: 0.2, rarity: "reserve" },
      { id: "m7oud", house: "Yves Saint Laurent", name: "M7 Oud Absolu", conc: "EDT", size: "80ml", value: 120, odds: 1, rarity: "signature" },
      { id: "dhp75", house: "Dior", name: "Homme Parfum (2014)", conc: "Parfum", size: "75ml", value: 195, odds: 0.6, rarity: "signature" },
      { id: "envy50", house: "Gucci", name: "Envy", conc: "EDT", size: "50ml", value: 230, odds: 0.3, rarity: "reserve" },
      { id: "coromandel", house: "Chanel", name: "Coromandel (EDT era)", conc: "EDT", size: "75ml", value: 320, odds: 0.2, rarity: "reserve" },
      { id: "kingdom50", house: "Alexander McQueen", name: "Kingdom", conc: "EDP", size: "50ml", value: 390, odds: 0.1, rarity: "archive" },
      { id: "polene1", house: "Polène", name: "Numéro Un Nano", conc: "Full-grain leather", size: "with dust bag", value: 280, odds: 0.4, rarity: "signature", kind: "bag" },
      { id: "tabby26", house: "Coach", name: "Tabby 26", conc: "Pre-loved, excellent", size: "authenticated", value: 360, odds: 0.3, rarity: "signature", kind: "bag" },
      { id: "pfincense", house: "P.F. Candle Co.", name: "Teakwood Incense", conc: "Incense", size: "15 sticks", value: 24, odds: 5.6, rarity: "signature", kind: "home" },
      { id: "bkmini", house: "Brooklyn Candle Studio", name: "Escapist Mini Candle", conc: "Candle", size: "3 oz", value: 26, odds: 2.6, rarity: "reserve", kind: "home" },
      { id: "mlmcandle", house: "Maison Louis Marie", name: "No.04 Bois de Balincourt", conc: "Candle", size: "8.5 oz", value: 48, odds: 1.3, rarity: "reserve", kind: "home" },
      { id: "boysmells", house: "Boy Smells", name: "Kush Candle", conc: "Candle", size: "8.5 oz", value: 52, odds: 0.4, rarity: "archive", kind: "home" },
      { id: "dipmini", house: "Diptyque", name: "Baies Mini Candle", conc: "Candle", size: "70 g", value: 54, odds: 0.4, rarity: "archive", kind: "home" },
      { id: "trudon", house: "Trudon", name: "Abd El Kader Classic", conc: "Candle", size: "9.5 oz", value: 140, odds: 0.1, rarity: "grail", kind: "home" },
      { id: "sonnyangel", house: "Sonny Angel", name: "Hippers Series Figure", conc: "Blind figure", size: "sealed", value: 22, odds: 6.1, rarity: "signature", kind: "charm" },
      { id: "labubu", house: "Pop Mart", name: "Labubu Macaron Charm", conc: "Blind box", size: "sealed", value: 32, odds: 2.1, rarity: "reserve", kind: "charm" },
      { id: "susancharm", house: "Susan Alexandra", name: "Beaded Bag Charm", conc: "Charm", size: "handmade", value: 48, odds: 1.3, rarity: "reserve", kind: "charm" },
      { id: "coachcharm", house: "Coach", name: "Leather Bag Charm", conc: "Charm", size: "with box", value: 58, odds: 0.4, rarity: "archive", kind: "charm" },
      { id: "vworb", house: "Vivienne Westwood", name: "Mini Orb Pendant", conc: "Necklace", size: "with box", value: 160, odds: 0.1, rarity: "grail", kind: "charm" },
      { id: "skinnydip", house: "Skinnydip London", name: "Clear Aesthetic Case", conc: "Phone case", size: "your model", value: 20, odds: 5.9, rarity: "signature", kind: "phone" },
      { id: "burga", house: "Burga", name: "Snap Case", conc: "Phone case", size: "your model", value: 38, odds: 3.4, rarity: "signature", kind: "phone" },
      { id: "sonixcase", house: "Sonix", name: "MagSafe Case", conc: "Phone case", size: "your model", value: 55, odds: 1.2, rarity: "reserve", kind: "phone" },
      { id: "bandolier", house: "Bandolier", name: "Crossbody Case", conc: "Phone case", size: "your model", value: 138, odds: 0.1, rarity: "grail", kind: "phone" },
      { id: "skimsset", house: "SKIMS", name: "Soft Lounge Set", conc: "Lounge set", size: "your size", value: 108, odds: 0.6, rarity: "reserve", kind: "clothes" },
      { id: "aloset", house: "Alo Yoga", name: "Airlift Set", conc: "Activewear set", size: "your size", value: 180, odds: 0.3, rarity: "reserve", kind: "clothes" },
    ],
  },
  {
    id: "hotgirlsummer",
    numeral: "XXIII",
    name: "The Hot Girl Summer Box",
    short: "Hot Girl Summer",
    price: 30,
    floorPct: 0,
    tint: "#f2b64f",
    blurb: "Sunnies, glow, and a beach-day scent. Golden hour, boxed.",
    drops: [
      { id: "lespecs", house: "Le Specs", name: "Outta Love", conc: "Sunglasses", size: "one size", value: 59, odds: 1.4, rarity: "signature", kind: "sunnies" },
      { id: "quaysun", house: "Quay", name: "High Key", conc: "Sunglasses", size: "one size", value: 75, odds: 0.3, rarity: "signature", kind: "sunnies" },
      { id: "glowdrops", house: "Glow Recipe", name: "Watermelon Dew Drops", conc: "Skincare", size: "40ml", value: 45, odds: 7.2, rarity: "signature", kind: "beauty" },
      { id: "wsss30", house: "Jo Malone", name: "Wood Sage & Sea Salt", conc: "Cologne", size: "30ml", value: 90, odds: 0.1, rarity: "signature" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 1.5, rarity: "signature", kind: "beauty" },
      { id: "burga", house: "Burga", name: "Snap Case", conc: "Phone case", size: "your model", value: 38, odds: 20.3, rarity: "signature", kind: "phone" },
      { id: "kayali10", house: "Kayali", name: "Vanilla | 28", conc: "EDP", size: "10ml travel", value: 34, odds: 40, rarity: "signature" },
      { id: "labubu", house: "Pop Mart", name: "Labubu Macaron Charm", conc: "Blind box", size: "sealed", value: 32, odds: 29, rarity: "reserve", kind: "charm" },
      { id: "raybansun", house: "Ray-Ban", name: "Wayfarer", conc: "Sunglasses", size: "one size", value: 180, odds: 0.1, rarity: "reserve", kind: "sunnies" },
      { id: "guccisun", house: "Gucci", name: "GG Oversized", conc: "Sunglasses", size: "one size", value: 395, odds: 0.1, rarity: "reserve", kind: "sunnies" },
    ],
  },
  {
    id: "sweettooth",
    numeral: "XXIV",
    name: "The Sweet Tooth Box",
    short: "Sweet Tooth",
    price: 35,
    floorPct: 0,
    tint: "#f4a9bc",
    blurb: "Vanilla, caramel, candied everything. Dessert you can wear.",
    drops: [
      { id: "candy20", house: "Prada", name: "Candy", conc: "EDP", size: "20ml", value: 40, odds: 19.1, rarity: "signature" },
      { id: "kayali10", house: "Kayali", name: "Vanilla | 28", conc: "EDP", size: "10ml travel", value: 34, odds: 26.3, rarity: "signature" },
      { id: "monparis10", house: "Yves Saint Laurent", name: "Mon Paris", conc: "EDP", size: "10ml travel", value: 34, odds: 26.4, rarity: "signature" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 9.1, rarity: "signature", kind: "beauty" },
      { id: "glowdrops", house: "Glow Recipe", name: "Watermelon Dew Drops", conc: "Skincare", size: "40ml", value: 45, odds: 15.1, rarity: "signature", kind: "beauty" },
      { id: "byfire30", house: "Maison Margiela", name: "Replica By the Fireplace", conc: "EDT", size: "30ml", value: 95, odds: 3.4, rarity: "signature" },
      { id: "grandsoir", house: "Maison Francis Kurkdjian", name: "Grand Soir", conc: "EDP", size: "70ml", value: 245, odds: 0.3, rarity: "reserve" },
      { id: "tobacco30", house: "Tom Ford", name: "Tobacco Vanille", conc: "EDP", size: "30ml", value: 265, odds: 0.2, rarity: "reserve" },
      { id: "sdv", house: "Guerlain", name: "Spiritueuse Double Vanille", conc: "EDP", size: "75ml", value: 360, odds: 0.1, rarity: "grail" },
    ],
  },
  {
    id: "cozyseason",
    numeral: "XXV",
    name: "The Cozy Season Box",
    short: "Cozy Season",
    price: 30,
    floorPct: 0,
    tint: "#c9885a",
    blurb: "Candles that smell like sweater weather and a fireplace you don't have to clean.",
    drops: [
      { id: "mlmcandle", house: "Maison Louis Marie", name: "No.04 Bois de Balincourt", conc: "Candle", size: "8.5 oz", value: 48, odds: 4.5, rarity: "reserve", kind: "home" },
      { id: "boysmells", house: "Boy Smells", name: "Kush Candle", conc: "Candle", size: "8.5 oz", value: 52, odds: 0.9, rarity: "archive", kind: "home" },
      { id: "dipmini", house: "Diptyque", name: "Baies Mini Candle", conc: "Candle", size: "70 g", value: 54, odds: 0.7, rarity: "archive", kind: "home" },
      { id: "labubu", house: "Pop Mart", name: "Labubu Macaron Charm", conc: "Blind box", size: "sealed", value: 32, odds: 61.6, rarity: "reserve", kind: "charm" },
      { id: "candy20", house: "Prada", name: "Candy", conc: "EDP", size: "20ml", value: 40, odds: 29.3, rarity: "signature" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 2.7, rarity: "signature", kind: "beauty" },
      { id: "byfire30", house: "Maison Margiela", name: "Replica By the Fireplace", conc: "EDT", size: "30ml", value: 95, odds: 0.1, rarity: "signature" },
      { id: "trudon", house: "Trudon", name: "Abd El Kader Classic", conc: "Candle", size: "9.5 oz", value: 140, odds: 0.1, rarity: "grail", kind: "home" },
      { id: "tobacco30", house: "Tom Ford", name: "Tobacco Vanille", conc: "EDP", size: "30ml", value: 265, odds: 0.1, rarity: "reserve" },
    ],
  },
  {
    id: "maincharacter",
    numeral: "XXVI",
    name: "The Main Character Box",
    short: "Main Character",
    price: 45,
    floorPct: 0,
    tint: "#e0417c",
    blurb: "The scents everyone asks about. Walk in like the plot revolves around you.",
    drops: [
      { id: "chance20", house: "Chanel", name: "Chance Eau Tendre", conc: "EDT", size: "20ml twist", value: 48, odds: 32.9, rarity: "reserve" },
      { id: "amyris11", house: "Maison Francis Kurkdjian", name: "Amyris", conc: "EDP", size: "11ml travel", value: 50, odds: 55.3, rarity: "signature" },
      { id: "glossier50", house: "Glossier", name: "You", conc: "EDP", size: "50ml", value: 88, odds: 2.5, rarity: "reserve" },
      { id: "wsss30", house: "Jo Malone", name: "Wood Sage & Sea Salt", conc: "Cologne", size: "30ml", value: 90, odds: 4.6, rarity: "signature" },
      { id: "paradoxe30", house: "Prada", name: "Paradoxe", conc: "EDP", size: "30ml", value: 94, odds: 1.9, rarity: "reserve" },
      { id: "lazysun30", house: "Maison Margiela", name: "Replica Lazy Sunday Morning", conc: "EDT", size: "30ml", value: 95, odds: 1.8, rarity: "reserve" },
      { id: "santal15", house: "Le Labo", name: "Santal 33", conc: "EDP", size: "15ml", value: 115, odds: 0.8, rarity: "reserve" },
      { id: "fleurnarc", house: "Ex Nihilo", name: "Fleur Narcotique", conc: "EDP", size: "50ml", value: 260, odds: 0.1, rarity: "grail" },
      { id: "br540_35", house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "EDP", size: "35ml", value: 245, odds: 0.1, rarity: "grail" },
    ],
  },
  {
    id: "nightout",
    numeral: "XXVII",
    name: "The Night Out Box",
    short: "Night Out",
    price: 75,
    floorPct: 0,
    tint: "#8c2440",
    blurb: "Dark florals and after-midnight scents. For the nights that become stories.",
    drops: [
      { id: "goodgirl30", house: "Carolina Herrera", name: "Good Girl", conc: "EDP", size: "30ml", value: 85, odds: 50.5, rarity: "signature" },
      { id: "blackop30", house: "Yves Saint Laurent", name: "Black Opium", conc: "EDP", size: "30ml", value: 95, odds: 20.9, rarity: "signature" },
      { id: "libreint", house: "Yves Saint Laurent", name: "Libre Intense", conc: "EDP", size: "30ml", value: 95, odds: 20.9, rarity: "signature" },
      { id: "hypnotic50", house: "Dior", name: "Hypnotic Poison", conc: "EDT", size: "50ml", value: 109, odds: 3.5, rarity: "reserve" },
      { id: "cocomad", house: "Chanel", name: "Coco Mademoiselle", conc: "EDP", size: "35ml", value: 120, odds: 3.2, rarity: "signature" },
      { id: "blackorchid30", house: "Tom Ford", name: "Black Orchid", conc: "EDP", size: "30ml", value: 130, odds: 0.8, rarity: "reserve" },
      { id: "lostcherry30", house: "Tom Ford", name: "Lost Cherry", conc: "EDP", size: "30ml", value: 265, odds: 0.1, rarity: "archive" },
      { id: "ldbs50", house: "Kilian", name: "Love, Don't Be Shy", conc: "EDP", size: "50ml", value: 405, odds: 0.1, rarity: "archive" },
    ],
  },
  {
    id: "parisian",
    numeral: "XXVIII",
    name: "The Parisian Box",
    short: "Parisian",
    price: 60,
    floorPct: 0,
    tint: "#a7b8e0",
    blurb: "Chanel, Dior, and the art of not trying too hard. Very French, very you.",
    drops: [
      { id: "monparis10", house: "Yves Saint Laurent", name: "Mon Paris", conc: "EDP", size: "10ml travel", value: 34, odds: 51.5, rarity: "signature" },
      { id: "chance20", house: "Chanel", name: "Chance Eau Tendre", conc: "EDT", size: "20ml twist", value: 48, odds: 16.6, rarity: "reserve" },
      { id: "hypnotic50", house: "Dior", name: "Hypnotic Poison", conc: "EDT", size: "50ml", value: 109, odds: 5.8, rarity: "reserve" },
      { id: "cocomad", house: "Chanel", name: "Coco Mademoiselle", conc: "EDP", size: "35ml", value: 120, odds: 8.3, rarity: "signature" },
      { id: "coconoir", house: "Chanel", name: "Coco Noir", conc: "EDP", size: "50ml", value: 145, odds: 2, rarity: "signature" },
      { id: "missdior50", house: "Dior", name: "Miss Dior", conc: "EDP", size: "50ml", value: 142, odds: 4.1, rarity: "reserve" },
      { id: "gabrielle", house: "Chanel", name: "Gabrielle Essence", conc: "EDP", size: "50ml", value: 145, odds: 8.1, rarity: "signature" },
      { id: "poal50", house: "Frederic Malle", name: "Portrait of a Lady", conc: "EDP", size: "50ml", value: 305, odds: 0.5, rarity: "archive" },
      { id: "no5parfum", house: "Chanel", name: "N°5", conc: "Parfum", size: "35ml", value: 305, odds: 1.6, rarity: "reserve" },
      { id: "coromandel", house: "Chanel", name: "Coromandel (EDT era)", conc: "EDT", size: "75ml", value: 320, odds: 1.5, rarity: "reserve" },
    ],
  },
  {
    id: "glowup",
    numeral: "XXIX",
    name: "The Glow Up Box",
    short: "Glow Up",
    price: 50,
    floorPct: 0,
    tint: "#f4c9a9",
    blurb: "Skin first, everything else after. Serums, sets, and two very famous machines.",
    drops: [
      { id: "glowdrops", house: "Glow Recipe", name: "Watermelon Dew Drops", conc: "Skincare", size: "40ml", value: 45, odds: 36.1, rarity: "signature", kind: "beauty" },
      { id: "rarekit", house: "Rare Beauty", name: "Blush + Gloss Duo", conc: "Makeup set", size: "full size", value: 56, odds: 24.2, rarity: "signature", kind: "beauty" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 22.7, rarity: "signature", kind: "beauty" },
      { id: "glossier50", house: "Glossier", name: "You", conc: "EDP", size: "50ml", value: 88, odds: 5.3, rarity: "reserve" },
      { id: "olaplexset", house: "Olaplex", name: "Repair Set", conc: "Hair care", size: "4 pieces", value: 100, odds: 4.2, rarity: "reserve", kind: "beauty" },
      { id: "ctmagic", house: "Charlotte Tilbury", name: "Magic Cream", conc: "Moisturizer", size: "50ml", value: 110, odds: 3.6, rarity: "reserve", kind: "beauty" },
      { id: "skimsset", house: "SKIMS", name: "Soft Lounge Set", conc: "Lounge set", size: "your size", value: 108, odds: 3.7, rarity: "reserve", kind: "clothes" },
      { id: "lamer", dtc: true, house: "La Mer", name: "Crème de la Mer", conc: "Moisturizer", size: "60ml", value: 390, odds: 0.1, rarity: "archive", kind: "beauty" },
      { id: "airwrap", dtc: true, house: "Dyson", name: "Airwrap Complete", conc: "Multi-styler", size: "long barrel", value: 609, odds: 0.1, rarity: "archive", kind: "beauty" },
    ],
  },
  {
    id: "bossbabe",
    numeral: "XXX",
    name: "The Boss Babe Box",
    short: "Boss Babe",
    price: 85,
    floorPct: 0,
    tint: "#29192b",
    blurb: "Power scents for the corner office you're building. Interviews, closings, victories.",
    drops: [
      { id: "paradoxe30", house: "Prada", name: "Paradoxe", conc: "EDP", size: "30ml", value: 94, odds: 73.5, rarity: "reserve" },
      { id: "santal15", house: "Le Labo", name: "Santal 33", conc: "EDP", size: "15ml", value: 115, odds: 21.5, rarity: "reserve" },
      { id: "sideeff30", house: "Initio", name: "Side Effect", conc: "EDP", size: "30ml", value: 160, odds: 2.9, rarity: "reserve" },
      { id: "raybansun", house: "Ray-Ban", name: "Wayfarer", conc: "Sunglasses", size: "one size", value: 180, odds: 1.4, rarity: "reserve", kind: "sunnies" },
      { id: "layton75", house: "Parfums de Marly", name: "Layton", conc: "EDP", size: "75ml", value: 260, odds: 0.1, rarity: "reserve" },
      { id: "naxos100", house: "Xerjoff", name: "Naxos", conc: "EDP", size: "100ml", value: 265, odds: 0.1, rarity: "reserve" },
      { id: "oudwood30", house: "Tom Ford", name: "Oud Wood", conc: "EDP", size: "30ml", value: 265, odds: 0.3, rarity: "signature" },
      { id: "oudgreat", house: "Initio", name: "Oud for Greatness", conc: "EDP", size: "90ml", value: 385, odds: 0.1, rarity: "reserve" },
      { id: "aventus100g", house: "Creed", name: "Aventus", conc: "EDP", size: "100ml", value: 505, odds: 0.1, rarity: "archive" },
    ],
  },
  {
    id: "dormroom",
    numeral: "XXXI",
    name: "The Dorm Room Box",
    short: "Dorm Room",
    price: 28,
    floorPct: 0,
    tint: "#a7e0c9",
    blurb: "Small space, big vibes. Charms, candles, and minis that fit on any shelf.",
    drops: [
      { id: "labubu", house: "Pop Mart", name: "Labubu Macaron Charm", conc: "Blind box", size: "sealed", value: 32, odds: 23.8, rarity: "reserve", kind: "charm" },
      { id: "burga", house: "Burga", name: "Snap Case", conc: "Phone case", size: "your model", value: 38, odds: 12.1, rarity: "signature", kind: "phone" },
      { id: "kayali10", house: "Kayali", name: "Vanilla | 28", conc: "EDP", size: "10ml travel", value: 34, odds: 29.2, rarity: "signature" },
      { id: "delina10", house: "Parfums de Marly", name: "Delina", conc: "EDP", size: "10ml travel", value: 34, odds: 29.4, rarity: "signature" },
      { id: "glowdrops", house: "Glow Recipe", name: "Watermelon Dew Drops", conc: "Skincare", size: "40ml", value: 45, odds: 3.1, rarity: "signature", kind: "beauty" },
      { id: "mlmcandle", house: "Maison Louis Marie", name: "No.04 Bois de Balincourt", conc: "Candle", size: "8.5 oz", value: 48, odds: 0.9, rarity: "reserve", kind: "home" },
      { id: "chance20", house: "Chanel", name: "Chance Eau Tendre", conc: "EDT", size: "20ml twist", value: 48, odds: 0.9, rarity: "reserve" },
      { id: "lipbutter", house: "Summer Fridays", name: "Lip Butter Balm Duo", conc: "Lip care", size: "2 full size", value: 58, odds: 0.4, rarity: "signature", kind: "beauty" },
      { id: "wsss30", house: "Jo Malone", name: "Wood Sage & Sea Salt", conc: "Cologne", size: "30ml", value: 90, odds: 0.1, rarity: "signature" },
      { id: "santal15", house: "Le Labo", name: "Santal 33", conc: "EDP", size: "15ml", value: 115, odds: 0.1, rarity: "reserve" },
    ],
  },
  {
    id: "somethingblue",
    numeral: "XXXII",
    name: "The Something Blue Box",
    short: "Something Blue",
    price: 120,
    floorPct: 0,
    tint: "#b8d4f0",
    blurb: "For brides, bridesmaids, and anyone collecting forever pieces. Veil optional.",
    drops: [
      { id: "missdior50", house: "Dior", name: "Miss Dior", conc: "EDP", size: "50ml", value: 142, odds: 36.2, rarity: "reserve" },
      { id: "gabrielle", house: "Chanel", name: "Gabrielle Essence", conc: "EDP", size: "50ml", value: 145, odds: 60.9, rarity: "signature" },
      { id: "vworb", house: "Vivienne Westwood", name: "Mini Orb Pendant", conc: "Necklace", size: "with box", value: 160, odds: 2.3, rarity: "grail", kind: "charm" },
      { id: "poal50", house: "Frederic Malle", name: "Portrait of a Lady", conc: "EDP", size: "50ml", value: 305, odds: 0.1, rarity: "archive" },
      { id: "no5parfum", house: "Chanel", name: "N°5", conc: "Parfum", size: "35ml", value: 305, odds: 0.1, rarity: "reserve" },
      { id: "delinaex", house: "Parfums de Marly", name: "Delina Exclusif", conc: "Parfum", size: "75ml", value: 350, odds: 0.1, rarity: "grail" },
      { id: "vanille44", house: "Le Labo", name: "Vanille 44", conc: "EDP", size: "50ml", value: 350, odds: 0.1, rarity: "archive" },
      { id: "sdv", house: "Guerlain", name: "Spiritueuse Double Vanille", conc: "EDP", size: "75ml", value: 360, odds: 0.1, rarity: "grail" },
      { id: "chanelwoc", house: "Chanel", name: "Wallet on Chain, vintage", conc: "Pre-loved, very good", size: "authenticated", value: 2810, odds: 0.1, rarity: "archive", kind: "bag" },
    ],
  },
  {
    id: "devilwears",
    numeral: "XXXIII",
    name: "The Devil Wears This Box",
    short: "Devil Wears This",
    price: 150,
    floorPct: 0,
    tint: "#29192b",
    blurb: "Prada from beauty counter to bag shelf. That's all.",
    drops: [
      { id: "candy20", house: "Prada", name: "Candy", conc: "EDP", size: "20ml", value: 40, odds: 58.8, rarity: "signature" },
      { id: "paradoxe30", house: "Prada", name: "Paradoxe", conc: "EDP", size: "30ml", value: 94, odds: 19.3, rarity: "reserve" },
      { id: "pradacard", dtc: true, house: "Prada", name: "Saffiano Card Holder", conc: "Pre-loved, excellent", size: "authenticated", value: 320, odds: 10.5, rarity: "reserve", kind: "bag" },
      { id: "pradasun", house: "Prada", name: "Symbole", conc: "Sunglasses", size: "one size", value: 480, odds: 2.9, rarity: "archive", kind: "sunnies" },
      { id: "renylon", house: "Prada", name: "Re-Nylon Mini", conc: "Pre-loved, excellent", size: "authenticated", value: 1005, odds: 5.9, rarity: "reserve", kind: "bag" },
      { id: "prada2005", dtc: true, house: "Prada", name: "Re-Edition 2005 Re-Nylon", conc: "Pre-loved, excellent", size: "authenticated", value: 1210, odds: 1.8, rarity: "archive", kind: "bag" },
      { id: "galleria", dtc: true, house: "Prada", name: "Galleria Saffiano Mini", conc: "Pre-loved, excellent", size: "authenticated", value: 1510, odds: 0.8, rarity: "grail", kind: "bag" },
    ],
  },
  {
    id: "houseofgucci",
    numeral: "XXXIV",
    name: "The House of Gucci Box",
    short: "House of Gucci",
    price: 150,
    floorPct: 0,
    tint: "#4a7c59",
    blurb: "One house, head to toe. Father, son, and house of Gucci.",
    drops: [
      { id: "bloom30", house: "Gucci", name: "Bloom", conc: "EDP", size: "30ml", value: 110, odds: 71.8, rarity: "signature" },
      { id: "envy50", house: "Gucci", name: "Envy", conc: "EDT", size: "50ml", value: 230, odds: 10.2, rarity: "reserve" },
      { id: "guccibelt", dtc: true, house: "Gucci", name: "GG Marmont Belt", conc: "Pre-loved, excellent", size: "authenticated", value: 310, odds: 6.1, rarity: "reserve", kind: "bag" },
      { id: "guccicard", dtc: true, house: "Gucci", name: "GG Marmont Card Case", conc: "Pre-loved, excellent", size: "authenticated", value: 320, odds: 5.8, rarity: "reserve", kind: "bag" },
      { id: "guccisun", house: "Gucci", name: "GG Oversized", conc: "Sunglasses", size: "one size", value: 395, odds: 4, rarity: "reserve", kind: "sunnies" },
      { id: "gucciophidia", dtc: true, house: "Gucci", name: "Ophidia GG Mini Bag", conc: "Pre-loved, excellent", size: "authenticated", value: 910, odds: 0.3, rarity: "archive", kind: "bag" },
      { id: "marmont", house: "Gucci", name: "Marmont Small", conc: "Pre-loved, excellent", size: "authenticated", value: 1200, odds: 0.6, rarity: "reserve", kind: "bag" },
      { id: "gucci1955", dtc: true, house: "Gucci", name: "Horsebit 1955", conc: "Pre-loved, excellent", size: "authenticated", value: 1300, odds: 1.1, rarity: "signature", kind: "bag" },
      { id: "bamboo1947", dtc: true, house: "Gucci", name: "Bamboo 1947 Top Handle", conc: "Pre-loved, excellent", size: "authenticated", value: 2510, odds: 0.1, rarity: "grail", kind: "bag" },
    ],
  },
  {
    id: "goldhour",
    numeral: "XXXV",
    name: "The Gold Hour Box",
    short: "Gold Hour",
    price: 125,
    floorPct: 0,
    tint: "#f2b64f",
    blurb: "Everyday gold with a Van Cleef ending. Stack accordingly.",
    drops: [
      { id: "mejurihoops", house: "Mejuri", name: "Bold Hoops", conc: "14k gold vermeil", size: "with pouch", value: 110, odds: 43.4, rarity: "signature", kind: "jewelry" },
      { id: "missoma", house: "Missoma", name: "Ridge Charm Necklace", conc: "18k gold plated", size: "with box", value: 140, odds: 36.5, rarity: "signature", kind: "jewelry" },
      { id: "swartennis", house: "Swarovski", name: "Tennis Deluxe Bracelet", conc: "Rhodium finish", size: "with box", value: 190, odds: 14.6, rarity: "reserve", kind: "jewelry" },
      { id: "vworb", house: "Vivienne Westwood", name: "Mini Orb Pendant", conc: "Necklace", size: "with box", value: 160, odds: 2.8, rarity: "grail", kind: "charm" },
      { id: "tiffsmile", dtc: true, house: "Tiffany & Co.", name: "Smile Pendant", conc: "Pre-loved, excellent", size: "authenticated", value: 610, odds: 2.1, rarity: "archive", kind: "jewelry" },
      { id: "vcasweet", dtc: true, house: "Van Cleef & Arpels", name: "Sweet Alhambra Bracelet", conc: "Pre-loved, excellent", size: "authenticated", value: 1310, odds: 0.6, rarity: "grail", kind: "jewelry" },
    ],
  },
  {
    id: "icebox",
    numeral: "XXXVI",
    name: "The Ice Box",
    short: "Ice",
    price: 400,
    floorPct: 0,
    tint: "#b8d4f0",
    blurb: "Serious sparkle only. Yurman to Rolex, every piece authenticated.",
    drops: [
      { id: "dyurman", dtc: true, house: "David Yurman", name: "Cable Classic Bracelet", conc: "Pre-loved, excellent", size: "authenticated", value: 460, odds: 97.9, rarity: "signature", kind: "jewelry" },
      { id: "tiffanyt", dtc: true, house: "Tiffany & Co.", name: "T Wire Bracelet", conc: "Pre-loved, excellent", size: "authenticated", value: 1010, odds: 1.7, rarity: "reserve", kind: "jewelry" },
      { id: "tennis2ct", dtc: true, house: "Covet Fine", name: "Diamond Tennis Bracelet 2ct", conc: "Certified, appraised", size: "14k white gold", value: 2510, odds: 0.1, rarity: "archive", kind: "jewelry" },
      { id: "cartierlove", dtc: true, house: "Cartier", name: "Love Bracelet, small", conc: "Pre-loved, excellent", size: "authenticated", value: 4960, odds: 0.1, rarity: "archive", kind: "jewelry" },
      { id: "vca5", dtc: true, house: "Van Cleef & Arpels", name: "Vintage Alhambra Bracelet", conc: "Pre-loved, excellent", size: "authenticated", value: 4210, odds: 0.1, rarity: "reserve", kind: "jewelry" },
      { id: "rolex28", dtc: true, house: "Rolex", name: "Datejust 28", conc: "Pre-loved, excellent", size: "authenticated", value: 6910, odds: 0.1, rarity: "grail", kind: "watch" },
    ],
  },
  {
    id: "shoecloset",
    numeral: "XXXVII",
    name: "The Shoe Closet Box",
    short: "Shoe Closet",
    price: 175,
    floorPct: 0,
    tint: "#e0417c",
    blurb: "From slides to red bottoms. Your size, your moment.",
    drops: [
      { id: "samslide", house: "Sam Edelman", name: "Bay Slide", conc: "New in box", size: "your size", value: 90, odds: 39.7, rarity: "signature", kind: "shoe" },
      { id: "uggmini", house: "UGG", name: "Ultra Mini", conc: "New in box", size: "your size", value: 160, odds: 32.2, rarity: "signature", kind: "shoe" },
      { id: "guccislide", dtc: true, house: "Gucci", name: "GG Slide", conc: "Pre-loved, excellent", size: "your size", value: 310, odds: 12.7, rarity: "reserve", kind: "shoe" },
      { id: "jimmychoo", dtc: true, house: "Jimmy Choo", name: "Bing Mule", conc: "Pre-loved, excellent", size: "your size", value: 510, odds: 10.6, rarity: "reserve", kind: "shoe" },
      { id: "loubipumps", dtc: true, house: "Christian Louboutin", name: "So Kate 85", conc: "Pre-loved, excellent", size: "your size", value: 610, odds: 3.3, rarity: "archive", kind: "shoe" },
      { id: "manolo", dtc: true, house: "Manolo Blahnik", name: "Hangisi Flat", conc: "Pre-loved, excellent", size: "your size", value: 810, odds: 1.5, rarity: "grail", kind: "shoe" },
    ],
  },
  {
    id: "vault",
    numeral: "XXXVIII",
    name: "The Vault Box",
    short: "Vault",
    price: 500,
    floorPct: 0,
    tint: "#8c2440",
    blurb: "The rarest juice we hold: discontinued icons, first batches, private blends.",
    drops: [
      { id: "amberaoud", house: "Roja Parfums", name: "Amber Aoud", conc: "Parfum", size: "30ml", value: 455, odds: 15.2, rarity: "grail" },
      { id: "clivex", house: "Clive Christian", name: "X", conc: "Parfum", size: "50ml", value: 480, odds: 14.6, rarity: "grail" },
      { id: "afgano30", house: "Nasomatto", name: "Black Afgano (first batch)", conc: "Extrait", size: "30ml", value: 530, odds: 27.1, rarity: "archive" },
      { id: "champagne", house: "Yves Saint Laurent", name: "Champagne (1993)", conc: "EDT", size: "75ml", value: 650, odds: 11.9, rarity: "grail" },
      { id: "alex2", house: "Xerjoff", name: "Alexandria II", conc: "Parfum", size: "50ml", value: 650, odds: 11.9, rarity: "grail" },
      { id: "windsor75", house: "Creed", name: "Windsor", conc: "EDP", size: "75ml", value: 790, odds: 10.4, rarity: "grail" },
      { id: "cartiersun", house: "Cartier", name: "Panthère de Cartier", conc: "Sunglasses", size: "one size", value: 995, odds: 8.9, rarity: "grail", kind: "sunnies" },
    ],
  },
];

/* ---------- daily free boxes ----------
   One free open per day. Commons are cute Amazon-sourced fillers
   (~$5 landed) that photograph well but nobody NEEDS shipped, and
   their buyback (bb, explicit dollars) is pennies-tiny: the smart
   move is always trading for credit, which sits under the $20
   transfer minimum and nudges a deposit. Worst case a common costs
   one ~$5 manual fulfillment. The rare tail keeps it exciting; the
   luxury-supplier grails almost never land. */
const FREE_BOXES = [
  {
    id: "dailyscent",
    numeral: "·",
    name: "The Daily Fragrance Box",
    short: "Daily Fragrance",
    price: 0,
    free: true,
    floorPct: 0,
    tint: "#8fa7ef",
    blurb: "A little something fragrant, free, every single day.",
    drops: [
      { id: "vialtrio",   house: "Covet",              name: "Designer Vial Trio",  conc: "3 sample vials", size: "0.7ml each", value: 14,   odds: 59.3, rarity: "signature", bb: 1 },
      { id: "scentstick", house: "Covet",              name: "Solid Scent Stick",   conc: "Solid perfume",  size: "4g",         value: 17,   odds: 30,  rarity: "signature", bb: 1 },
      { id: "libre10",    house: "Yves Saint Laurent", name: "Libre",               conc: "EDP", size: "10ml travel",           value: 22,  odds: 9,   rarity: "reserve", bb: 6 },
      { id: "aventus10",  house: "Creed",              name: "Aventus",             conc: "EDP", size: "10ml travel",           value: 70,  odds: 1.5, rarity: "archive" },
      { id: "br540_35",   house: "Maison Francis Kurkdjian", name: "Baccarat Rouge 540", conc: "EDP", size: "35ml",            value: 245, odds: 0.2, rarity: "grail" },
    ],
  },
  {
    id: "dailyluck",
    numeral: "·",
    name: "The Daily Luck Box",
    short: "Daily Luck",
    price: 0,
    free: true,
    floorPct: 0,
    tint: "#c9a7e0",
    blurb: "A little ritual, a little luck, free every single day.",
    drops: [
      { id: "incense",    house: "Covet",     name: "Cherry Incense Ritual Sticks", conc: "Incense",   size: "10 sticks",   value: 12,   odds: 58,  rarity: "signature", kind: "home", bb: 0.5 },
      { id: "palosanto",  house: "Covet",     name: "Palo Santo Bundle",            conc: "Incense",   size: "3 sticks",    value: 9,    odds: 30,  rarity: "signature", kind: "home", bb: 0.5 },
      { id: "tealights",  house: "Covet",     name: "Rosewater Tealight Set",       conc: "Candles",   size: "4 tealights", value: 14,   odds: 9,   rarity: "signature", kind: "home", bb: 0.75 },
      { id: "labubu",     house: "Pop Mart",  name: "Labubu Macaron Charm",         conc: "Blind box", size: "sealed",      value: 32,   odds: 2.9, rarity: "reserve",   kind: "charm" },
      { id: "marmont", dtc: true, house: "Gucci", name: "Marmont Small",            conc: "Pre-loved, excellent", size: "authenticated", value: 1200, odds: 0.1, rarity: "grail", kind: "bag" },
    ],
  },
];

/* admin daily-box overrides: edits + on/off from the admin Boxes tab */
const LS_DAILY_OVR = "covet_daily_overrides";
function getDailyOverrides() {
  try { return JSON.parse(localStorage.getItem(LS_DAILY_OVR)) || {}; } catch { return {}; }
}
try {
  if (typeof localStorage !== "undefined") {
    const o = getDailyOverrides();
    if (o.allOff) { var DAILY_PAUSED = true; }
    for (const b of FREE_BOXES) {
      if (o.allOff || (o.off && o.off[b.id])) b.off = true;
      const e = o.boxes && o.boxes[b.id];
      if (e) {
        b.name = e.name || b.name;
        b.blurb = e.blurb || b.blurb;
        b.tint = e.tint || b.tint;
        if (e.drops && e.drops.length) b.drops = e.drops;
      }
    }
    /* boxes authored in admin (ids not built in) join the rotation */
    for (const id of Object.keys(o.boxes || {})) {
      if (FREE_BOXES.some((b) => b.id === id)) continue;
      const e = o.boxes[id];
      FREE_BOXES.push({
        id, numeral: "·", price: 0, free: true, floorPct: 0,
        name: e.name, short: e.name.replace(/^The /i, "").replace(/ Box$/i, ""),
        tint: e.tint || "#c9a7e0", blurb: e.blurb || "A little something free, every day.",
        drops: e.drops || [],
        off: !!(o.off && o.off[id]),
      });
    }
  }
} catch {}
/* The Shop: curated buy-now items, managed in admin. Seeded with the
   higher-end pieces; prices sit AT OR ABOVE shown value (anchor rule). */
const LS_SHOP = "covet_shop_items";
const SHOP_DEFAULT = [
  { id: "justeunclou", price: 4450 },
  { id: "cartierloveear", price: 3800 },
  { id: "vcapendant", price: 3050 },
  { id: "vcaearstuds", price: 1700 },
  { id: "tiffhardwear", price: 1300 },
  { id: "vca5", price: 4400 },
  { id: "cartierlove", price: 5200 },
  { id: "chanelwoc", price: 2950 },
  { id: "tabby26", price: 375 },
  { id: "br540_70", price: 465 },
  { id: "cocomad", price: 125 },
];
function getShopItems() {
  try {
    const v = JSON.parse(localStorage.getItem(LS_SHOP));
    if (Array.isArray(v)) return v;
  } catch {}
  return SHOP_DEFAULT;
}
function dailyProgramPaused() {
  try { return !!getDailyOverrides().allOff; } catch { return false; }
}

/* admin-authored boxes (demo): created in the admin Boxes tab, stored
   locally. Production: boxes live in the database; this merge is the
   demo stand-in for "publish". */
try {
  if (typeof localStorage !== "undefined") {
    const adminBoxes = JSON.parse(localStorage.getItem("covet_admin_boxes")) || [];
    for (const b of adminBoxes) {
      const i = CASES.findIndex((c) => c.id === b.id);
      if (i >= 0) CASES[i] = b; /* edited built-in: override replaces it */
      else CASES.push(b);
    }
  }
} catch {}

/* ---------- the wishlist box ---------- */
const LS_WISHLIST = "covet_wishlist";

/* wishlist-only catalog: pieces from categories that don't have
   their own curated box yet (beauty, clothes, ...) */
const EXTRA_DROPS = [
  { id: "rarekit",  house: "Rare Beauty",       name: "Blush + Gloss Duo", conc: "Makeup set",     size: "full size",   value: 56,  rarity: "signature", kind: "beauty" },
  { id: "ctmagic",  house: "Charlotte Tilbury", name: "Magic Cream",       conc: "Moisturizer",    size: "50ml",        value: 110, rarity: "reserve",   kind: "beauty" },
  { id: "airwrap", dtc: true,  house: "Dyson",             name: "Airwrap Complete",  conc: "Multi-styler",   size: "long barrel", value: 609, rarity: "archive",   kind: "beauty" },
  { id: "skimsset", house: "SKIMS",             name: "Soft Lounge Set",   conc: "Lounge set",     size: "your size",   value: 108, rarity: "reserve",   kind: "clothes" },
  { id: "aloset",   house: "Alo Yoga",          name: "Airlift Set",       conc: "Activewear set", size: "your size",   value: 180, rarity: "reserve",   kind: "clothes" },
  /* shop-tier jewelry: manually sourced, shop + grail boxes only (dtc keeps them out of wishlists) */
  { id: "vcapendant",     dtc: true, house: "Van Cleef & Arpels", name: "Vintage Alhambra Pendant",   conc: "Necklace", size: "18k gold · mother of pearl", value: 2950, rarity: "archive", kind: "jewelry" },
  { id: "vcaearstuds",    dtc: true, house: "Van Cleef & Arpels", name: "Sweet Alhambra Earstuds",    conc: "Earrings", size: "18k gold · mother of pearl", value: 1650, rarity: "archive", kind: "jewelry" },
  { id: "justeunclou",    dtc: true, house: "Cartier",            name: "Juste un Clou, small",       conc: "Bracelet", size: "18k yellow gold",            value: 4300, rarity: "grail",   kind: "jewelry" },
  { id: "cartierloveear", dtc: true, house: "Cartier",            name: "Love Earrings",              conc: "Earrings", size: "18k rose gold",              value: 3650, rarity: "grail",   kind: "jewelry" },
  { id: "tiffhardwear",   dtc: true, house: "Tiffany & Co.",      name: "HardWear Small Link",        conc: "Necklace", size: "sterling silver",            value: 1250, rarity: "archive", kind: "jewelry" },
];

/* admin item overrides (demo): price edits, pauses (restocking:
   can't be pulled, so no stock-out credits), removals (remaining odds
   re-balance to 100). Production: items table + supplier feed. */
const LS_ITEM_OVERRIDES = "covet_item_overrides";
function getItemOverrides() {
  try { return JSON.parse(localStorage.getItem(LS_ITEM_OVERRIDES)) || {}; } catch { return {}; }
}
try {
  if (typeof localStorage !== "undefined") {
    const ov = getItemOverrides();
    if (Object.keys(ov).length) {
      const apply = (d) => {
        const o = ov[d.id];
        if (!o) return;
        if (o.value != null) d.value = o.value;
        if (o.bb != null) d.bb = o.bb;
        if (o.paused) d.paused = true;
      };
      for (const c of CASES) {
        const had = c.drops.length;
        c.drops = c.drops.filter((d) => !(ov[d.id] && ov[d.id].removed));
        c.drops.forEach(apply);
        if (c.drops.length && c.drops.length !== had) {
          const sum = c.drops.reduce((a, d) => a + d.odds, 0);
          if (sum > 0 && Math.abs(sum - 100) > 0.05) {
            for (const d of c.drops) d.odds = Math.round(d.odds / sum * 1000) / 10;
            const drift = Math.round((100 - c.drops.reduce((a, d) => a + d.odds, 0)) * 10) / 10;
            let big = c.drops[0];
            for (const d of c.drops) if (d.odds > big.odds) big = d;
            big.odds = Math.round((big.odds + drift) * 10) / 10;
          }
        }
      }
      for (let i = EXTRA_DROPS.length - 1; i >= 0; i--) {
        if (ov[EXTRA_DROPS[i].id] && ov[EXTRA_DROPS[i].id].removed) EXTRA_DROPS.splice(i, 1);
        else apply(EXTRA_DROPS[i]);
      }
    }
  }
} catch {}

function allDrops() {
  const seen = new Set();
  const out = [];
  for (const c of CASES) for (const d of c.drops) {
    if (seen.has(d.id)) continue;
    seen.add(d.id);
    out.push(d);
  }
  for (const d of EXTRA_DROPS) {
    if (!seen.has(d.id)) { seen.add(d.id); out.push(d); }
  }
  return out.sort((a, b) => a.value - b.value);
}

function getWishlist() {
  try {
    let ids = JSON.parse(localStorage.getItem(LS_WISHLIST)) || [];
    if (typeof canonicalId === "function") ids = [...new Set(ids.map(canonicalId))];
    return ids;
  } catch { return []; }
}
function saveWishlist(ids) {
  localStorage.setItem(LS_WISHLIST, JSON.stringify(ids));
}
/* returns new state: true = added */
function toggleWishlist(id) {
  if (typeof canonicalId === "function") id = canonicalId(id);
  let ids = getWishlist();
  if (ids.includes(id)) {
    ids = ids.filter((x) => x !== id);
    saveWishlist(ids);
    return false;
  }
  if (ids.length >= 8) return null; /* full */
  ids.push(id);
  saveWishlist(ids);
  /* a new love starts with an equal share of the odds */
  const m = getWishPcts();
  m[id] = 1;
  saveWishPcts(m);
  setWishPct(id, Math.round(100 / ids.length));
  return true;
}

/* Custom odds: she sets each item's percentage herself.
   Percentages are whole numbers and always total exactly 100;
   moving one item proportionally rebalances the others. */
const LS_WISHPCT = "covet_wish_pct";
function getWishPcts() {
  try { return JSON.parse(localStorage.getItem(LS_WISHPCT)) || {}; } catch { return {}; }
}
function saveWishPcts(m) {
  localStorage.setItem(LS_WISHPCT, JSON.stringify(m));
}
/* Ensures every wishlist id has an integer share and the total is 100. */
function normalizeWishPcts() {
  const ids = getWishlist();
  if (!ids.length) { saveWishPcts({}); return {}; }
  const raw = getWishPcts();
  const m = {};
  ids.forEach((id) => (m[id] = Math.max(1, Math.round(raw[id] || 0)) || 1));
  let sum = ids.reduce((s, id) => s + m[id], 0);
  if (!sum || Object.keys(raw).length === 0) {
    ids.forEach((id) => (m[id] = Math.floor(100 / ids.length)));
    sum = ids.reduce((s, id) => s + m[id], 0);
  }
  ids.forEach((id) => (m[id] = Math.max(1, Math.round((m[id] * 100) / sum))));
  let drift = 100 - ids.reduce((s, id) => s + m[id], 0);
  if (drift !== 0) {
    const biggest = [...ids].sort((a, b) => m[b] - m[a])[0];
    m[biggest] = Math.max(1, m[biggest] + drift);
  }
  saveWishPcts(m);
  return m;
}
function wishPct(id) {
  return normalizeWishPcts()[id] || 0;
}
/* Set one item's share; the rest rebalance proportionally. */
function setWishPct(id, pct) {
  const ids = getWishlist();
  if (!ids.includes(id)) return;
  const n = ids.length;
  /* 85% ceiling on any single piece. Safe at any concentration because
     the price floor below charges at least 1.25x our cost EV + shipping,
     so even a near-certain hype-house pick can't sell below our cost. */
  pct = Math.min(85, 100 - (n - 1), Math.max(1, Math.round(pct)));
  const m = normalizeWishPcts();
  const others = ids.filter((x) => x !== id);
  const otherSum = others.reduce((s, x) => s + m[x], 0) || 1;
  const rem = 100 - pct;
  others.forEach((x) => (m[x] = Math.max(1, Math.round((m[x] * rem) / otherSum))));
  m[id] = pct;
  let drift = 100 - ids.reduce((s, x) => s + m[x], 0);
  if (drift !== 0 && others.length) {
    const biggest = [...others].sort((a, b) => m[b] - m[a])[0];
    m[biggest] = Math.max(1, m[biggest] + drift);
  }
  saveWishPcts(m);
  return m;
}

/* Wishlist box: her odds, priced at 90% of the odds-blended value,
   floored at 1.25x our cost EV + $6 shipping reserve. The floor is the
   economic protection: without it, concentrating odds on thin-margin
   hype items sells them below our cost (adverse selection). */
function wishlistBoxFrom(dropIds) {
  const pool = allDrops().filter((d) => dropIds.includes(d.id));
  if (pool.length < 2) return null;
  const m = normalizeWishPcts();
  const drops = pool.map((d) => ({ ...d, odds: m[d.id] || 1 }));
  const blended = drops.reduce((s, d) => s + (d.odds / 100) * d.value, 0);
  const costEV = drops.reduce((s, d) => s + (d.odds / 100) * costOf(d), 0);
  const price = Math.max(10, Math.ceil(blended * 0.9), Math.ceil(costEV * 1.25 + 6));
  return {
    id: "custom",
    numeral: "XVIII",
    name: (typeof getWishName === "function" && getWishName()) ? getWishName() : "Your Wishlist Box",
    short: "Wishlist",
    price,
    floorPct: Math.floor((Math.min(...drops.map((d) => buybackOf(d))) / price) * 100),
    tint: "#e0417c",
    blurb: "Everything in here is on your wishlist, at the exact odds you set. The reveal just settles which one ships.",
    custom: true,
    drops,
  };
}
/* ---------- saved wishlist boxes: name it, keep it, come back ---------- */
const LS_SAVEDBOXES = "covet_saved_boxes";
const LS_WISHNAME = "covet_wish_name";
function getSavedBoxes() {
  try { return JSON.parse(localStorage.getItem(LS_SAVEDBOXES)) || []; } catch { return []; }
}
function setSavedBoxes(list) { localStorage.setItem(LS_SAVEDBOXES, JSON.stringify(list)); }
function getWishName() { return localStorage.getItem(LS_WISHNAME) || ""; }
function setWishName(n) {
  localStorage.setItem(LS_WISHNAME, String(n || "").replace(/[<>&"]/g, "").slice(0, 32));
}
function saveCurrentBox(name) {
  const ids = getWishlist();
  if (ids.length < 2) return null;
  const pcts = normalizeWishPcts();
  const list = getSavedBoxes();
  name = String(name || "").replace(/[<>&"]/g, "").trim().slice(0, 32) || "Wishlist No. " + (list.length + 1);
  const existing = list.find((b) => b.name.toLowerCase() === name.toLowerCase());
  const snap = { sid: existing ? existing.sid : "sv" + Date.now(), name, ids: [...ids], pcts: { ...pcts }, ts: new Date().toISOString().slice(0, 10) };
  if (existing) list[list.indexOf(existing)] = snap; else list.unshift(snap);
  setSavedBoxes(list);
  setWishName(name);
  return snap;
}
function loadSavedBox(sid) {
  const b = getSavedBoxes().find((x) => x.sid === sid);
  if (!b) return false;
  saveWishlist(b.ids.filter((id) => allDrops().some((d) => d.id === id)));
  saveWishPcts({ ...b.pcts });
  setWishName(b.name);
  return true;
}
function deleteSavedBox(sid) { setSavedBoxes(getSavedBoxes().filter((x) => x.sid !== sid)); }

function loadWishlistBox() {
  return wishlistBoxFrom(getWishlist());
}

/* ---------- helpers ---------- */
function getCase(id) {
  if (id === "custom") {
    const c = loadWishlistBox();
    if (c) return c;
  }
  const free = FREE_BOXES.find((c) => c.id === id);
  if (free) return free;
  return CASES.find((c) => c.id === id) || CASES[0];
}
/* what an item costs US: explicit cost if set (admin/custom items),
   else a sourcing-class estimate of shown value. Production: supplier feed. */
const HYPE_HOUSES = ["Maison Francis Kurkdjian", "Le Labo", "Creed", "Xerjoff", "Roja Parfums", "Clive Christian", "Nasomatto", "Frederic Malle", "Ex Nihilo", "Initio", "Kilian", "Guerlain", "Tom Ford"];
function costOf(d) {
  if (d.cost != null) return d.cost;
  if (d.house === "Covet" || d.house === "Covet Fine") return Math.round(d.value * 0.3);
  if (d.dtc) return Math.round(d.value * 0.85);
  if (HYPE_HOUSES.includes(d.house)) return Math.round(d.value * 0.9);
  if (d.house === "Parfums de Marly") return Math.round(d.value * 0.8);
  return Math.round(d.value * 0.6); /* designer wedge */
}
/* ---------- stock reservation: at reveal, not at shipping ----------
   The moment a roll lands on a stock-tracked item, one unit is held so a
   second open can never promise the same piece. Selling it back releases
   the hold. Stock 0 auto-pauses the item (flagged restocking, excluded
   from rolls); the auto flag lets a sell-back unpause it again without
   touching pauses set manually in admin. */
function reserveStock(drop) {
  if (!drop || drop.stock == null) return;
  try {
    const lib = JSON.parse(localStorage.getItem("covet_custom_items")) || [];
    const it = lib.find((x) => x.id === drop.id);
    if (it && it.stock != null) {
      it.stock = Math.max(0, it.stock - 1);
      localStorage.setItem("covet_custom_items", JSON.stringify(lib));
    }
    const ov = getItemOverrides();
    const left = it ? it.stock : Math.max(0, drop.stock - 1);
    if (left === 0) {
      ov[drop.id] = { ...(ov[drop.id] || {}), paused: true, autoPaused: true };
      localStorage.setItem(LS_ITEM_OVERRIDES, JSON.stringify(ov));
    }
    for (const c of CASES) for (const d of c.drops) if (d.id === drop.id && d.stock != null) {
      d.stock = left;
      if (left === 0) d.paused = true;
    }
    drop.stock = left;
    if (left === 0) drop.paused = true;
  } catch {}
}
function releaseStock(dropId) {
  try {
    const lib = JSON.parse(localStorage.getItem("covet_custom_items")) || [];
    const it = lib.find((x) => x.id === dropId);
    let back = null;
    if (it && it.stock != null) {
      it.stock += 1;
      back = it.stock;
      localStorage.setItem("covet_custom_items", JSON.stringify(lib));
    }
    const ov = getItemOverrides();
    if (ov[dropId] && ov[dropId].autoPaused) {
      delete ov[dropId].paused;
      delete ov[dropId].autoPaused;
      localStorage.setItem(LS_ITEM_OVERRIDES, JSON.stringify(ov));
    }
    for (const c of CASES) for (const d of c.drops) if (d.id === dropId && d.stock != null) {
      if (back != null) d.stock = back; else d.stock += 1;
      d.paused = false;
    }
  } catch {}
}

let FREE_RARE_RATE = 0.95; /* free-box rares: % of our cost offered as credit; ops dial */
try {
  if (typeof localStorage !== "undefined") {
    const r = parseFloat(localStorage.getItem("covet_free_rare_rate"));
    if (r >= 50 && r <= 100) FREE_RARE_RATE = r / 100;
  }
} catch {}
/* the instant-buyback offer: explicit bb wins, else dial % of our cost.
   Floor: whole dollars, never rounded up. */
function buybackOf(d) {
  if (d.bb != null) return d.bb;
  return Math.floor(costOf(d) * BUYBACK_RATE);
}
/* Free-box buyback policy:
   · commons: tiny ($1-$2). Commons hit daily, so this is the program's
     cost knob; anything richer mints credit that redeems as wholesale
     goods with no revenue attached.
   · rares (archive/grail): 50% of value. Credit is CHEAPER for us than
     fulfilling (credit respends into house-positive boxes, ~$0.65 real
     cost per $1; withdrawal needs a purchase + KYC), so we WANT sellers.
     The haircut vs the paid-box 70% rate keeps shipping the best deal,
     because shipped free-box rares are the marketing.
   Free-pull credit is additionally box credit: it spends on boxes and
   only counts toward bank transfers after being used in an open.
   Cash withdrawals always require a completed purchase on the account. */
function buybackFor(kase, drop) {
  if (drop.bb != null) return drop.bb; /* explicit per-item offer (daily fillers) */
  if (kase && kase.free) {
    if (drop.rarity === "signature") return Math.min(2, Math.max(1, Math.round(drop.value * 0.3)));
    /* rare free pulls: offer just under what fulfillment would cost us.
       If she ships we pay full cost anyway, so paying up to ~cost in credit
       (which recycles through boxes) is strictly the better outcome. */
    return Math.floor(costOf(drop) * FREE_RARE_RATE);
  }
  if (kase && kase.buybackMode === "value") return Math.floor(drop.value * 0.65);
  return buybackOf(drop);
}
function floorValue(kase) {
  return Math.min(...kase.drops.map((d) => buybackFor(kase, d)));
}
function money(n) {
  const v = Number(n);
  return "$" + v.toLocaleString("en-US", {
    minimumFractionDigits: Number.isInteger(v) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
/* Weighted pick by odds */
function rollDrop(kase, roll /* 0-100 float, optional */) {
  /* paused (restocking) items can't land; their weight spreads pro-rata */
  const live = kase.drops.filter((d) => !d.paused);
  const pool = live.length ? live : kase.drops;
  const total = pool.reduce((a, d) => a + d.odds, 0) || 100;
  const r = (roll == null ? Math.random() * 100 : roll) * total / 100;
  let acc = 0;
  for (const d of pool) {
    acc += d.odds;
    if (r < acc) return d;
  }
  return pool[pool.length - 1];
}

/* Mock ticker feed */
const TICKER_NAMES = ["Ava R.", "Anonymous", "Sofia M.", "Priya S.", "Mia K.", "Anonymous", "Elena K.", "Bella T.", "Noor A.", "Anonymous", "Camille D.", "Ivy L.", "Jules M.", "Theo B."];
function tickerItems(n = 14) {
  const out = [];
  for (let i = 0; i < n; i++) {
    const kase = CASES[Math.floor(Math.random() * CASES.length)];
    const drop = rollDrop(kase);
    out.push({ who: TICKER_NAMES[i % TICKER_NAMES.length], kase, drop });
  }
  return out;
}

/* This week's luckiest wall (mock, "updated Mondays") */
const LUCKY_WEEK = [
  { who: "Mia K.",     caseId: "itgirl",   dropId: "br540ext",    note: "0.6% pull" },
  { who: "Priya S.",   caseId: "handbag",  dropId: "classicflap", note: "1.2% pull" },
  { who: "Camille D.", caseId: "oldmoney", dropId: "clivex",      note: "0.8% pull" },
];

/* This week's giveaway (mock) */
const GIVEAWAY = {
  prize: "a vintage Chanel Classic Flap",
  ends: "Sunday midnight ET",
};
