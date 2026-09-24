# Covet · prototype handoff

Complete clickable prototype of Covet, a luxury mystery box storefront. Plain HTML/CSS/JS, no frameworks, no build step. Every page, flow, popup, and admin tool the production build needs is demonstrated here working. All data is mock and all prices are placeholders.

## Run it

```
python3 -m http.server 4177 --directory .
```

Any static server works, and most pages also run fine straight from file://. The reset chip in the top left resets daily claims; shift click wipes all demo state back to a fresh visitor.

## Pages

| Page | What it is |
|---|---|
| `index.html` | Home: hero, daily free boxes, giveaway, live pull feed, featured boxes |
| `cases.html` | All boxes plus the wishlist box card |
| `case.html?c=<id>` | Box detail: odds table, four reveal styles, checkout flow |
| `build.html` | Wishlist box builder with automatic pricing and capped odds |
| `inventory.html` | My Shelf: pulls, sealed boxes, ship or sell on each item |
| `shop.html` | The Boutique, a buy now storefront at listed prices |
| `profile.html` | Profile: streaks, dark mode, editable client seed |
| `creators.html` | Creator referral program |
| `fairness.html` | Provably fair explainer with a working SHA-256 verifier |
| `admin.html` | The operator panel. Every production admin surface is demonstrated here |
| `modals.html` | Internal gallery of every modal state, for reference |
| `404.html` | Not-found page. Serve it with a real 404 status |
| `terms.html`, `privacy.html`, `buyback-policy.html`, `odds-disclosure.html`, `giveaway-rules.html` | Legal pages, written to match product behavior exactly |

## Code layout

- `js/data.js` catalog, box definitions, odds, buyback math, admin overrides, stock reservation
- `js/app.js` shared shell, wallet, reveal animations, modals, themes
- `js/reveal.js` box page: checkout, sealed box entitlement, reveal dispatch
- `js/inventory.js` shelf rendering, sealed box, give back flow
- `js/art.js` parametric SVG product art. Swap `productArt()` for real image feeds in production

## The trust boundary (the most important section)

The demo is deliberately 100% client side; localStorage stands in for the backend. In production, ALL of the following move server side and the client renders only what the server says: balances and both credit classes, odds rolls, daily claim limits, free box caps, buyback offers, creator attribution, admin edits, age and region gates.

Rules that must survive the port exactly:

1. The roll happens when the customer taps, never at payment time. A successful payment creates a paid, sealed box entitlement. The reveal waits for her tap, on any device, whenever she comes back.
2. A sealed box can be sold back at 90% of the paid price as locked, boxes-only credit. Locked credit never transfers out and does not spend in the Boutique.
3. Stock decrement is atomic with the roll, one transaction. Stock zero auto-pauses an item; a sell-back releases the hold. Manual pauses are never auto-lifted.
4. Buyback offers recompute at sale time. Shelf offers float until accepted.
5. Money is stored as integer cents. The ledger is double entry, in Postgres.
6. Every roll and money event gets a public transaction id (CVT-XXXXXX) keyed to the full round record: server seed, client seed, nonce, odds band, timestamps.

## API integrations

- Payment processor: hosted checkout plus webhooks. Webhooks must be idempotent under duplicate and out-of-order delivery
- Identity verification (KYC) with webhooks, gating first withdrawals and free box claims
- random.org signed draws feeding the commit-reveal odds system
- Supplier catalog feeds: nightly price and stock sync, alert emails on price moves and stockouts, auto-pause on margin floor breaches
- Transactional email (receipts, shipping, KYC, giveaway, stock-out choice)

## Stack

React (Next.js), TypeScript, Node, PostgreSQL preferred. Managed hosting. No document databases for the ledger, no microservices.

## Conventions

Static assets carry a `?v=N` cache buster, bumped on every change. Customer copy never uses the words case, gambling, bet, jackpot, winnings, or wager; a box is always a box.
