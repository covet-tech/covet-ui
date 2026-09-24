/* COVET · box page: odds table + the reveal reel.
   The reveal is the product. Timing notes:
   - 6.4s translate with a long-tail decel curve (fast blur-past,
     then a slow creep over the last three cards).
   - winner lands with a random offset inside the card so the
     needle never parks dead-center twice in a row.
   - settle: everything else dims, the hit card lifts and glows,
     confetti pops, then the result modal enters 850ms later. */

const params = new URLSearchParams(location.search);
const kase = getCase(params.get("c"));

/* custom box requested but nothing picked yet → go build one */
if (params.get("c") === "custom" && !kase.custom) {
  location.replace("build.html");
}

let spinning = false;

function renderCasePage() {
  document.title = kase.name + " · Covet";
  document.getElementById("caseEyebrow").textContent = kase.free
    ? "Free · one open per day"
    : kase.custom && getWishName()
      ? `${getWishName()} · ${money(kase.price)}`
      : `Box No. ${kase.numeral} · ${money(kase.price)}`;
  document.getElementById("caseTitle").innerHTML = kase.custom
    ? `Your <em>wishlist,</em> boxed.`
    : `The <em>${kase.short}</em> Box`;
  document.getElementById("caseBlurb").textContent = kase.blurb;
  const anon = document.getElementById("anonChk");
  if (anon) anon.checked = localStorage.getItem("covet_anon") === "1";
  const btn = document.getElementById("openBtn");
  if (kase.free) {
    const claimed = !canClaimDailyBox();
    btn.innerHTML = claimed ? "Back tomorrow ✨" : "Unbox free today";
    btn.disabled = claimed;
  } else {
    document.getElementById("openPrice").textContent = money(kase.price);
  }

  document.getElementById("oddsTable").innerHTML =
    `<div class="odds-row head">
      <span></span><span>Piece</span><span class="hide-sm">Rarity</span>
      <span>Value</span><span class="odds-pct">Odds</span>
    </div>` +
    [...kase.drops].sort((a, b) => b.value - a.value).map((d) => {
      const rar = RARITY[d.rarity];
      return `<div class="odds-row" style="--rar:${rar.color}">
        <div class="bottle-tile">${productArt(d, 36)}</div>
        <div class="odds-name"><b>${d.house} ${d.name} ${kase.custom ? "" : heartBtn(d.id)}${d.paused ? ' <span class="restock-chip">restocking</span>' : ""}</b><span>${d.conc} · ${d.size}</span></div>
        <div class="hide-sm"><span class="rarity-chip">${rar.label}</span></div>
        <div class="odds-val">${money(d.value)}<span>market value</span></div>
        <div class="odds-pct"><b>${d.odds}%</b><div class="odds-bar"><i style="width:${Math.max(d.odds, 1.5)}%"></i></div></div>
      </div>`;
    }).join("");

  document.getElementById("oddsFootnote").textContent = kase.custom
    ? `These are the exact odds you set on your wishlist, totaling 100%. Whatever lands, ship it free or take the instant buyback offer on the reveal. Adjust the split anytime from your wishlist.`
    : kase.free
      ? `One free open per day, a real piece every time. Free pulls always ship free; sell one back and a little credit lands toward your next box.`
      : `Probabilities sum to exactly 100%. Market values are checked against current retail and resale prices. Whatever lands, ship it free or take the instant buyback offer on the reveal. Full methodology in the odds disclosure.`;
  if (!kase.custom) {
    document.getElementById("oddsFootnote").insertAdjacentHTML("afterend",
      `<a class="build-own" href="wishlist.html">Or <b>make your own box</b> ♥ your wishlist pieces, your odds <span class="arr">→</span></a>`);
  }

  renderRevealModes();

  buildReel();
}

/* tile art, spectator sampling, and the spin itself are shared with the
   daily popup and live in app.js (reelTileHTML / buildReelInto / runReelSpin) */
function buildReel(winner) {
  return buildReelInto(document.getElementById("reel"), kase, winner);
}

function openCase() {
  if (spinning) return;
  closeModal();
  if (kase.free && canClaimDailyBox() && !hasKyc()) { requireKyc(openCase); return; }
  if (kase.free && typeof freeCapReached === "function" && freeCapReached()) { openFreeCapModal(); return; }
  if (kase.free && !canClaimDailyBox()) {
    openModal(`
      <span class="eyebrow">Free box</span>
      <h2>Back tomorrow ✨</h2>
      <p class="modal-sub">You've opened today's free box. A fresh one unlocks at midnight, and there are paid boxes with much better pulls in the meantime.</p>
      <div class="modal-actions">
        <a class="btn btn-gold" href="cases.html">Browse the boxes</a>
        <button class="btn btn-quiet" onclick="closeModal()">Okay</button>
      </div>`);
    return;
  }
  const bal = getWallet();
  const paidEnt = (() => {
    try { const p = JSON.parse(localStorage.getItem("covet_paid_box")); return p && p.id === kase.id ? p : null; } catch { return null; }
  })();
  if (!kase.free && !paidEnt && bal < kase.price) {
    /* direct checkout: pay the difference in one tap, no wallet detour.
       The remainder is a purchase payment, not a deposit, so the $10
       top-up minimum does not apply here. */
    const need = Math.ceil((kase.price - bal) * 100) / 100;
    const opt = (extra) => `<button class="btn btn-ghost" style="flex:1;min-width:0;padding:12px 6px;display:flex;flex-direction:column;gap:2px;line-height:1.2" onclick="payAndOpen(${need}, ${extra})"><span style="font-size:13px;font-weight:800">+$${extra}</span><span style="font-size:10px;opacity:0.7">pay ${money(need + extra)}</span></button>`;
    openModal(`
      <span class="eyebrow">${kase.short || kase.name}</span>
      <h2>Open it right now</h2>
      <p class="modal-sub">${bal > 0 ? `Your balance covers ${money(bal)} of this ${money(kase.price)} box. Pay the remaining ${money(need)} by card and it opens instantly.` : `This box is ${money(kase.price)}. Pay by card and it opens instantly.`}</p>
      <button class="btn btn-gold" style="width:100%" onclick="payAndOpen(${need})">Pay ${money(need)} · open now</button>
      <div class="auth-or"><span>want balance left over?</span></div>
      <div style="display:flex;gap:8px;margin-bottom:12px">
        ${opt(10)}${opt(25)}${opt(50)}
      </div>
      <div style="display:flex;gap:8px;align-items:stretch">
        <input id="poCustom" type="number" min="1" placeholder="custom extra $" style="flex:1;padding:11px 16px;background:var(--bg);border:1px solid var(--line-soft);border-radius:100px;font:600 13px var(--sans, sans-serif);color:var(--ink)" />
        <button class="btn btn-ghost" style="padding:11px 20px" onclick="payAndOpen(${need}, Math.max(0, parseFloat(document.getElementById('poCustom').value) || 0))">Go</button>
      </div>
      <div class="modal-actions" style="margin-top:12px">
        <button class="btn btn-quiet" style="width:100%" onclick="closeModal()">Not now</button>
      </div>
      <p class="micro after-note">Extra lands in your balance for next time. Card payment counts as a purchase.</p>`);
    return;
  }

  spinning = true;
  if (!kase.free) { if (!paidEnt) spendOnBox(kase.price); /* sealed box: already paid */ }
  else markDailyBox();
  setPendingOpen(params.get("c") || kase.id, kase.free ? 0 : kase.price);
  const btn = document.getElementById("openBtn");
  btn.disabled = true;

  const done = (winner) => {
    localStorage.removeItem("covet_paid_box");
    clearPendingOpen();
    addPull(kase, winner);
    const earned = kase.free ? 0 : Math.floor(kase.price);
    if (earned) addEntries(earned);
    openResultModal(kase, winner, kase.free ? {} : { onAgain: "openCase()", entries: earned });
    if (kase.free) {
      btn.innerHTML = "Back tomorrow ✨";
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
    spinning = false;
  };

  const mode = revealMode();
  if (mode === "spin") {
    /* classic: gift moment, then the reel spins to a pre-rolled winner */
    const winner = rollDrop(kase);
    playGiftMoment(() => {
      const reel = buildReel(winner);
      const stage = document.getElementById("stage");
      stage.classList.add("spinning");
      stage.scrollIntoView({ block: "center", behavior: "smooth" });
      runReelSpin(reel, document.querySelector(".reel-window"), () => {
        stage.classList.remove("spinning");
        done(winner);
      });
    });
    return;
  }
  if (mode === "vault") { playVaultPick(kase, done); return; } /* the shelf replaces the gift moment */
  /* pick and peel both roll at her touch, inside the overlay */
  playGiftMoment(() => {
    (mode === "peel" ? playTissuePeel : playLuckyPick)(kase, done);
  });
}

/* playGiftMoment lives in app.js (shared with the daily box popup) */

function payAndOpen(need, extra = 0) {
  /* payment buys a SEALED box entitlement; nothing rolls until she says so.
     If she saves it, it waits on her shelf, openable without paying again. */
  setWallet(getWallet() + need + extra);
  localStorage.setItem("covet_deposited", "1");
  spendOnBox(kase.price);
  localStorage.setItem("covet_paid_box", JSON.stringify({ id: kase.id, price: kase.price, ts: Date.now() }));
  closeModal();
  openModal(`
    <span class="eyebrow">✨ Paid · sealed</span>
    <h2>It's yours. Still sealed.</h2>
    <p class="modal-sub">Your <b style="color:var(--ink)">${kase.name}</b> is bought and wrapped. Open it right now, or save it; it waits on your shelf, and nothing is revealed until you say so.</p>
    <div class="modal-actions" style="flex-direction:column">
      <button class="btn btn-gold" style="width:100%" onclick="closeModal();openCase()">Open it now ♥</button>
      <a class="btn btn-ghost" style="width:100%" href="inventory.html">Save it on my shelf</a>
    </div>
    <p class="micro after-note">Saved boxes can also be sold back sealed from your shelf, for credit.</p>
  `, { locked: true });
}

document.addEventListener("DOMContentLoaded", renderCasePage);
