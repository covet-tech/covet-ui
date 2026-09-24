/* COVET · my shelf */

const STATUS_META = {
  vault: { label: "On your shelf", cls: "" },
  shipping: { label: "Shipping", cls: "ship" },
  sold: { label: "Sold back", cls: "sold" },
};

function seedDemoInventory() {
  /* first visit: seed two pulls so the page demos well */
  if (localStorage.getItem("covet_inv_seeded")) return;
  localStorage.setItem("covet_inv_seeded", "1");
  if (getInv().length) return;
  setInv([
    { uid: "demo1", txn: "CVT-M3JR6P", caseId: "itgirl", dropId: "aventus10", boxName: "The It Girl Box", odds: 1.5, status: "vault", ts: "2026-08-09" },
    { uid: "demo2", txn: "CVT-M1KS8Q", caseId: "oldmoney", dropId: "layton75", boxName: "The Old Money Box", odds: 6, status: "shipping", ts: "2026-08-06" },
  ]);
}

function renderSealedBox() {
  /* a paid-but-unopened box waits on the shelf until she opens it */
  try {
    const paid = JSON.parse(localStorage.getItem("covet_paid_box"));
    if (!paid || !paid.id) return "";
    const k = getCase(paid.id);
    if (!k) return "";
    return `<div class="inv-card" style="border:2px dashed var(--gold);background:var(--gold-dim)">
      <div style="font-size:34px">🎀</div>
      <div style="flex:1">
        <b style="font-family:var(--serif);font-size:16px">${k.name}</b>
        <p class="micro" style="margin-top:4px">Paid for and still sealed. The reveal is waiting for you; nothing happens until you open it.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <a class="btn btn-gold" href="case.html?c=${paid.id}">Open my box ♥</a>
        ${paid.price ? `<button class="btn btn-ghost" onclick="sellSealed()">Give it back · ${money(Math.floor(paid.price * 0.9))} credit</button>
        <p class="micro" style="max-width:240px;margin:6px auto 0;text-align:center">Give-back credit opens boxes only: it unlocks for bank transfers after a box open, and it doesn't spend in the Boutique.</p>` : ""}
      </div>
    </div>`;
  } catch { return ""; }
}
function sellSealed() {
  try {
    const paid = JSON.parse(localStorage.getItem("covet_paid_box"));
    if (!paid || !paid.price) return;
    const credit = Math.floor(paid.price * 0.9);
    localStorage.removeItem("covet_paid_box");
    setWallet(getWallet() + credit);
    setLocked(getLocked() + credit); /* boxes-only credit: closes the card-to-cash pipe */
    renderInventory();
    openModal(`
      <span class="eyebrow">✨ Given back, sealed</span>
      <h2>${money(credit)} landed</h2>
      <p class="modal-sub">Your unopened box went back on our shelf, and ${money(credit)} of the ${money(paid.price)} you paid is in your balance as box credit. It opens any box; it unlocks for bank transfers after an open, and it doesn't spend in the Boutique.</p>
      <div class="modal-actions">
        <a class="btn btn-gold" href="cases.html">Pick a different box</a>
        <button class="btn btn-quiet" onclick="closeModal()">Done</button>
      </div>
    `);
  } catch {}
}
function shipItem(uid) {
  const it = getInv().find((x) => x.uid === uid);
  if (it && isFreeCaseId(it.caseId) && freeShipGate()) return;
  requireAddress(() => {
    openModal(`
      <span class="eyebrow">Free shipping</span>
      <h2>Confirm delivery</h2>
      <p class="modal-sub">Ships sealed and insured, signature required.</p>
      <p class="addr-chip">${addrLine()} <a href="#" onclick="openAddressModal(() => shipItem('${uid}'));return false">edit</a></p>
      <div class="modal-actions">
        <button class="btn btn-gold" onclick="confirmShip('${uid}')">Confirm · free</button>
        <button class="btn btn-quiet" onclick="closeModal()">Cancel</button>
      </div>
    `);
  });
}
function confirmShip(uid) {
  const list = getInv();
  const item = list.find((i) => i.uid === uid);
  if (item) {
    item.status = "shipping";
    if (isFreeCaseId(item.caseId)) bumpFreeShips();
  }
  setInv(list);
  renderInventory();
  openModal(`
    <span class="eyebrow">Confirmed</span>
    <h2>On its way soon</h2>
    <p class="modal-sub">Ships within 2 business days. Tracking lands in your inbox.</p>
    <div class="modal-actions"><button class="btn btn-gold" onclick="closeModal()">Done</button></div>
  `);
}

function renderInventory() {
  const host = document.getElementById("invHost");
  const hideDone = localStorage.getItem("covet_hide_done") === "1";
  const chk = document.getElementById("hideDone");
  if (chk) chk.checked = hideDone;
  const list = hideDone ? getInv().filter((i) => i.status === "vault") : getInv();
  const sealed = renderSealedBox();
  if (!list.length) {
    host.innerHTML = sealed + `<div class="empty-state">
      <div class="display">${sealed ? "One box, still sealed." : "Nothing here yet."}</div>
      <p>${sealed ? "Open it above and the pull lands right here." : "Unbox your first bottle and it will land here, sealed, with both options waiting."}</p>
      ${sealed ? "" : `<a class="btn btn-gold" style="margin-top:24px" href="cases.html">Browse boxes</a>`}
    </div>`;
    return;
  }
  host.innerHTML = sealed + `<div class="inv-grid">` + list.map((item) => {
    const kase = getCase(item.caseId);
    const drop = kase.drops.find((d) => d.id === item.dropId) || allDrops().find((d) => d.id === item.dropId);
    if (!drop) return "";
    const rar = RARITY[drop.rarity];
    const st = STATUS_META[item.status] || STATUS_META.vault;
    const boxName = item.boxName || kase.name;
    const actions = item.status === "vault"
      ? `<div class="inv-actions">
          <button class="btn btn-gold" onclick="shipItem('${item.uid}')">Ship it</button>
          <button class="btn btn-ghost" onclick="openSellModal('${item.caseId}','${drop.id}','${item.uid}')">Sell ${money(buybackFor(getCase(item.caseId), drop))}</button>
        </div>`
      : item.status === "shipping"
        ? `<p class="micro">Tracking arrives by email. Ships sealed, insured, signature required.</p>`
        : `<p class="micro">Repurchased at ${money(buybackFor(getCase(item.caseId), drop))}. Credit is in your balance.</p>`;
    return `<div class="inv-card" style="--rar:${rar.color}">
      <span class="status-badge ${st.cls}">${st.label}</span>
      <div class="inv-top">
        <div class="bottle-tile" style="--rar:${rar.color}">${productArt(drop, 38)}</div>
        <div class="inv-name"><b>${drop.house} ${drop.name}</b><span>${drop.conc} · ${drop.size} · <span class="rarity-chip" style="--rar:${rar.color}">${rar.label}</span></span></div>
      </div>
      <div class="inv-line"><span>Pulled ${item.ts} · ${boxName}${item.txn ? ` · <span style="letter-spacing:0.04em">#${item.txn}</span>` : ""}</span><b>${money(drop.value)}</b></div>
      ${actions}
    </div>`;
  }).join("") + `</div>`;
}

document.addEventListener("DOMContentLoaded", () => {
  seedDemoInventory();
  renderInventory();
});
