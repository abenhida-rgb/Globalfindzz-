(() => {
  const products = Array.isArray(window.STORE_PRODUCTS) ? window.STORE_PRODUCTS : [];
  const config = window.STORE_CONFIG || {};
  const grid = document.getElementById("product-grid");
  const offersGrid = document.getElementById("offers-grid");
  const toast = document.getElementById("toast");
  const cart = new Map(load("gf-cart", []).map(item => [item.key, item]));
  let favorites = load("gf-favorites", []);
  let showOnlyFavorites = false;
  let toastTimer;
  let language = load("gf-language", "en");
  let currency = load("gf-currency", "USD");
  const rates = { USD: 1, EUR: 0.92, MAD: 10.0 };
  const symbols = { USD: "$", EUR: "€", MAD: " MAD" };
  const copy = {
    en: { catalogue:"Catalogue", tracking:"Track order", contact:"Contact", intro:"Explore our selected collection. Choose your style, colour and size, then add it to your bag.", viewCollection:"VIEW THE COLLECTION ↓", language:"Language", currency:"Currency", offers:"Offers", allProducts:"All products", trackTitle:"Track your order", trackHint:"Enter your order number. Live shared tracking will be available once order management is connected.", reviewsTitle:"Customer reviews", search:"Search products…", allCategories:"All categories", anySize:"Any size", anyColour:"Any colour", add:"ADD TO BAG", added:"Added to bag", emptyOffers:"No active offers right now. We only show discounts when a real sale price is configured.", emptyFavorites:"No favorites yet.", emptyCart:"Your bag is empty.", checkout:"PROCEED TO DELIVERY DETAILS", noTrack:"No order found in this browser. If you ordered through WhatsApp, ask GlobalFindzz for your latest status.", savedReview:"Review saved in this browser. It is not public to other visitors yet." },
    fr: { catalogue:"Catalogue", tracking:"Suivre commande", contact:"Contact", intro:"Découvrez notre sélection. Choisissez le style, la couleur et la taille, puis ajoutez au panier.", viewCollection:"VOIR LA COLLECTION ↓", language:"Langue", currency:"Devise", offers:"Promotions", allProducts:"Tous les produits", trackTitle:"Suivre votre commande", trackHint:"Saisissez votre numéro de commande. Le suivi partagé sera disponible après connexion du système de commandes.", reviewsTitle:"Avis clients", search:"Rechercher des produits…", allCategories:"Toutes catégories", anySize:"Toutes tailles", anyColour:"Toutes couleurs", add:"AJOUTER AU PANIER", added:"Ajouté au panier", emptyOffers:"Aucune promotion active. Les réductions ne seront affichées qu'avec un vrai prix promotionnel.", emptyFavorites:"Aucun favori pour le moment.", emptyCart:"Votre panier est vide.", checkout:"CONTINUER VERS LA LIVRAISON", noTrack:"Aucune commande trouvée dans ce navigateur. Si vous avez commandé via WhatsApp, demandez le statut à GlobalFindzz.", savedReview:"Avis enregistré dans ce navigateur. Il n'est pas encore visible par les autres visiteurs." }
  };
  const t = key => (copy[language] && copy[language][key]) || copy.en[key] || key;
  function load(key, fallback) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (_) { return fallback; } }
  function save(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) {} }
  function notify(message) { toast.textContent = message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => toast.classList.remove("show"), 2800); }
  function money(amount) {
    if (amount == null || amount === "") return "Price on request";
    const converted = Number(amount) * (rates[currency] || 1);
    try { return new Intl.NumberFormat(language === "fr" ? "fr-FR" : "en-US", { style:"currency", currency, maximumFractionDigits: currency === "MAD" ? 0 : 2 }).format(converted); }
    catch (_) { return symbols[currency] + converted.toFixed(2); }
  }
  let detailProduct = null;
  function openProductDetail(product, selectedColour = "", selectedSize = "") {
    detailProduct = product;
    const overlay = document.getElementById("product-detail-overlay");
    const gallery = document.getElementById("detail-gallery");
    const name = document.getElementById("detail-name");
    const price = document.getElementById("detail-price");
    const desc = document.getElementById("detail-description");
    const colours = document.getElementById("detail-colours");
    const sizes = document.getElementById("detail-sizes");
    const qty = document.getElementById("detail-qty");
    const images = [...new Set([product.image, ...(product.gallery || [])].filter(Boolean))];
    gallery.replaceChildren();
    const main = document.createElement("img"); main.className="detail-main-image"; main.alt=product.name; main.src=images[0] || ""; gallery.append(main);
    if (images.length > 1) {
      const thumbs=document.createElement("div"); thumbs.className="detail-thumbnails";
      images.forEach((src,i)=>{const b=document.createElement("button");b.type="button";b.className="detail-thumb"+(i===0?" active":"");const im=document.createElement("img");im.src=src;im.alt=product.name+" view "+(i+1);b.append(im);b.addEventListener("click",()=>{main.src=src;thumbs.querySelectorAll("button").forEach(x=>x.classList.remove("active"));b.classList.add("active");});thumbs.append(b);}); gallery.append(thumbs);
    }
    name.textContent=product.name; price.textContent=money(product.salePrice ?? product.price); desc.textContent=product.description || "";
    colours.replaceChildren(); const colourValues=product.colours || ["One colour"];
    colourValues.forEach((value,i)=>{const selected=selectedColour ? value===selectedColour : i===0;const b=document.createElement("button");b.type="button";b.className="variant-chip"+(selected?" selected":"");b.textContent=value;b.setAttribute("aria-pressed",String(selected));b.addEventListener("click",()=>{colours.querySelectorAll("button").forEach(x=>{x.classList.remove("selected");x.setAttribute("aria-pressed","false");});b.classList.add("selected");b.setAttribute("aria-pressed","true");const variantImage=product.variantImages && (product.variantImages[value] || product.variantImages[value.toLowerCase()]);if(variantImage)main.src=variantImage;});colours.append(b);});
    sizes.replaceChildren(); (product.sizes || ["One size"]).forEach((value,i)=>{const selected=selectedSize ? value===selectedSize : i===0;const b=document.createElement("button");b.type="button";b.className="variant-chip size-chip"+(selected?" selected":"");b.textContent=value;b.setAttribute("aria-pressed",String(selected));b.addEventListener("click",()=>{sizes.querySelectorAll("button").forEach(x=>{x.classList.remove("selected");x.setAttribute("aria-pressed","false");});b.classList.add("selected");b.setAttribute("aria-pressed","true");});sizes.append(b);});
    qty.value="1"; overlay.classList.add("open");overlay.setAttribute("aria-hidden","false");document.body.classList.add("checkout-open");
  }
  function closeProductDetail(){const o=document.getElementById("product-detail-overlay");o.classList.remove("open");o.setAttribute("aria-hidden","true");document.body.classList.remove("checkout-open");}
  function addDetailToCart(){
    if(!detailProduct)return;
    const colour=document.querySelector("#detail-colours .selected")?.textContent || "Not selected";
    const size=document.querySelector("#detail-sizes .selected")?.textContent || "Not selected";
    const qty=Math.max(1,Math.min(20,Number(document.getElementById("detail-qty").value)||1));
    const key=detailProduct.id+"|"+colour+"|"+size;const old=cart.get(key);
    cart.set(key,{key,id:detailProduct.id,name:detailProduct.name,price:detailProduct.salePrice ?? detailProduct.price,colour,size,qty:(old?.qty||0)+qty,image:detailProduct.image});
    save("gf-cart",[...cart.values()]);updateCounts();closeProductDetail();notify(t("added"));
  }
  function createSelect(label, values, placeholder) {
    const select = document.createElement("select"); select.setAttribute("aria-label", label);
    if (placeholder) select.add(new Option(placeholder, ""));
    [...new Set(values)].filter(Boolean).forEach(v => select.add(new Option(v, v)));
    return select;
  }
  function renderProduct(product, index, target) {
    const card = document.createElement("article"); card.className = "product-card";
    const photo = document.createElement("div"); photo.className = "product-photo";
    if (product.image) { const img = document.createElement("img"); img.alt = product.name; img.loading = "lazy"; img.src = product.image; img.onerror = () => { img.remove(); photo.classList.add("image-fallback"); photo.textContent = product.name; }; photo.append(img); photo.tabIndex=0; photo.setAttribute("role","button"); photo.setAttribute("aria-label","View "+product.name); photo.addEventListener("click",()=>openProductDetail(product)); photo.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openProductDetail(product);}}); }
    else { photo.classList.add("image-fallback"); photo.textContent = product.name; }
    const info = document.createElement("div"); info.className = "product-info";
    const meta = document.createElement("div"); meta.className = "product-meta";
    const category = document.createElement("span"); category.className = "product-category"; category.textContent = product.category || "COLLECTION";
    const number = document.createElement("span"); number.className = "product-index"; number.textContent = String(index + 1).padStart(2, "0"); meta.append(category, number);
    const title = document.createElement("h3"); title.textContent = product.name;
    const price = document.createElement("div"); price.className = "price"; price.textContent = money(product.price);
    if (product.salePrice != null && Number(product.salePrice) < Number(product.price)) {
      const old = document.createElement("span"); old.className = "old-price"; old.textContent = money(product.price); price.textContent = money(product.salePrice); price.append(old);
      const sale = document.createElement("span"); sale.className = "sale-tag"; sale.textContent = "SALE"; meta.append(sale);
    }
    const desc = document.createElement("p"); desc.className = "description"; desc.textContent = product.description || "";
    const options = document.createElement("div"); options.className = "options";
    const colour = createSelect("Choose colour", product.colours || ["One colour"], "Colour");
    const size = createSelect("Choose size", product.sizes || ["One size"], "Size");
    colour.addEventListener("change", () => { colour.dataset.chosen = colour.value; });
    options.append(colour, size);
    const actions = document.createElement("div"); actions.className = "product-actions";
    const favorite = document.createElement("button"); favorite.type = "button"; favorite.className = "favorite-button"; favorite.setAttribute("aria-label", "Toggle favorite"); favorite.textContent = favorites.includes(product.id) ? "♥" : "♡";
    favorite.addEventListener("click", () => { favorites = favorites.includes(product.id) ? favorites.filter(id => id !== product.id) : [...favorites, product.id]; save("gf-favorites", favorites); renderCatalog(); updateCounts(); });
    const add = document.createElement("button"); add.type = "button"; add.className = "order"; add.textContent = t("add") + " +";
    add.addEventListener("click", () => openProductDetail(product, colour.value, size.value));
    actions.append(favorite, add);
    info.append(meta, title, price, desc, options, actions); card.append(photo, info); target.append(card);
  }
  function matches(product) {
    const query = document.getElementById("search-input").value.trim().toLowerCase();
    const category = document.getElementById("category-filter").value;
    const max = Number(document.getElementById("price-filter").value);
    const size = document.getElementById("size-filter").value;
    const colour = document.getElementById("colour-filter").value;
    const searchable = [product.name, product.category, product.description, ...(product.colours || []), ...(product.sizes || [])].join(" ").toLowerCase();
    return (!query || searchable.includes(query)) && (!category || product.category === category) && (!max || Number(product.salePrice ?? product.price ?? 0) <= max) && (!size || (product.sizes || []).includes(size)) && (!colour || (product.colours || []).includes(colour)) && (!showOnlyFavorites || favorites.includes(product.id));
  }
  function renderCatalog() {
    grid.replaceChildren(); offersGrid.replaceChildren();
    const activeOffers = products.filter(p => p.salePrice != null && Number(p.salePrice) < Number(p.price));
    if (activeOffers.length) activeOffers.forEach((p, i) => renderProduct(p, i, offersGrid));
    else { const empty = document.createElement("p"); empty.className = "empty-note"; empty.textContent = t("emptyOffers"); offersGrid.append(empty); }
    const filtered = products.filter(matches);
    if (!filtered.length) { const empty = document.createElement("p"); empty.className = "empty-note"; empty.textContent = showOnlyFavorites ? t("emptyFavorites") : "No products match your filters."; grid.append(empty); }
    filtered.forEach((p, i) => renderProduct(p, i, grid));
    document.getElementById("item-count").textContent = String(filtered.length).padStart(2, "0") + " PRODUCTS";
  }
  function updateCounts() {
    save("gf-cart",[...cart.values()]); document.getElementById("cart-count").textContent = [...cart.values()].reduce((n, item) => n + item.qty, 0);
    document.getElementById("favorite-count").textContent = favorites.length;
  }
  function openCheckout(items) {
    document.getElementById("checkout-items").value = JSON.stringify(items);
    document.getElementById("checkout-title").textContent = items.length > 1 ? "Delivery details · " + items.length + " items" : "Delivery details";
    const overlay = document.getElementById("checkout-overlay"); overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false"); document.body.classList.add("checkout-open"); document.getElementById("customer-name").focus();
  }
  function closeCheckout() { const overlay = document.getElementById("checkout-overlay"); overlay.classList.remove("open"); overlay.setAttribute("aria-hidden", "true"); document.body.classList.remove("checkout-open"); }
  function openCart() {
    const overlay = document.getElementById("cart-overlay"); drawCart(); overlay.classList.add("open"); overlay.setAttribute("aria-hidden", "false"); document.body.classList.add("checkout-open");
  }
  function closeCart() { document.getElementById("cart-overlay").classList.remove("open"); document.getElementById("cart-overlay").setAttribute("aria-hidden", "true"); document.body.classList.remove("checkout-open"); }
  function drawCart() {
    const list = document.getElementById("cart-lines"); list.replaceChildren();
    if (!cart.size) { const p = document.createElement("p"); p.className = "empty-note"; p.textContent = t("emptyCart"); list.append(p); }
    let total = 0;
    for (const item of cart.values()) {
      total += Number(item.price || 0) * item.qty;
      const row = document.createElement("div"); row.className = "cart-line";
      const info = document.createElement("div"); info.innerHTML = "";
      const name = document.createElement("strong"); name.textContent = item.name;
      const meta = document.createElement("p"); meta.textContent = item.colour + " · " + item.size;
      const linePrice = document.createElement("span"); linePrice.textContent = money(item.price) + " × " + item.qty;
      info.append(name, meta, linePrice);
      const controls = document.createElement("div"); controls.className = "cart-controls";
      const minus = document.createElement("button"); minus.type = "button"; minus.textContent = "−"; minus.setAttribute("aria-label", "Remove one"); minus.onclick = () => { if (item.qty <= 1) cart.delete(item.key); else item.qty--; save("gf-cart",[...cart.values()]); updateCounts(); drawCart(); };
      const plus = document.createElement("button"); plus.type = "button"; plus.textContent = "+"; plus.setAttribute("aria-label", "Add one"); plus.onclick = () => { item.qty++; save("gf-cart",[...cart.values()]); updateCounts(); drawCart(); };
      const remove = document.createElement("button"); remove.type = "button"; remove.textContent = "×"; remove.setAttribute("aria-label", "Remove item"); remove.onclick = () => { cart.delete(item.key); save("gf-cart",[...cart.values()]); updateCounts(); drawCart(); };
      controls.append(minus, plus, remove); row.append(info, controls); list.append(row);
    }
    document.getElementById("cart-total").textContent = money(total);
    document.getElementById("cart-checkout").disabled = cart.size === 0;
  }
  function initFilters() {
    const categories = createSelect("Filter category", [...new Set(products.map(p => p.category))], t("allCategories")); categories.id = "category-filter"; document.getElementById("category-filter").replaceWith(categories);
    const sizes = [...new Set(products.flatMap(p => p.sizes || []))].sort(); const sizeSelect = createSelect("Filter size", sizes, t("anySize")); sizeSelect.id = "size-filter"; document.getElementById("size-filter").replaceWith(sizeSelect);
    const colours = [...new Set(products.flatMap(p => p.colours || []))].sort(); const colourSelect = createSelect("Filter colour", colours, t("anyColour")); colourSelect.id = "colour-filter"; document.getElementById("colour-filter").replaceWith(colourSelect);
    ["search-input","category-filter","price-filter","size-filter","colour-filter"].forEach(id => document.getElementById(id).addEventListener("input", renderCatalog));
  }
  function applyLanguageCurrency() {
    document.documentElement.lang = language;
    document.getElementById("language-select").value = language;
    document.getElementById("currency-select").value = currency;
    document.querySelectorAll("[data-i18n]").forEach(el => { const key = el.dataset.i18n; if (t(key)) el.textContent = t(key); });
    document.getElementById("search-input").placeholder = t("search");
    renderCatalog(); updateCounts();
  }
  document.getElementById("detail-close").addEventListener("click", closeProductDetail);
  document.getElementById("detail-add").addEventListener("click", addDetailToCart);
  document.getElementById("product-detail-overlay").addEventListener("click",e=>{if(e.target.id==="product-detail-overlay")closeProductDetail();});
  document.getElementById("checkout-close").addEventListener("click", closeCheckout);
  document.getElementById("checkout-overlay").addEventListener("click", e => { if (e.target.id === "checkout-overlay") closeCheckout(); });
  document.getElementById("cart-open").addEventListener("click", openCart);
  document.getElementById("cart-close").addEventListener("click", closeCart);
  document.getElementById("cart-overlay").addEventListener("click", e => { if (e.target.id === "cart-overlay") closeCart(); });
  document.getElementById("cart-checkout").addEventListener("click", () => { const items = [...cart.values()].map(x => ({...x})); closeCart(); if (items.length) openCheckout(items); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeCheckout(); closeCart(); closeProductDetail(); } });
  document.getElementById("checkout-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const items = JSON.parse(document.getElementById("checkout-items").value || "[]");
    const total = items.reduce((sum, item) => sum + Number(item.price || 0) * Number(item.qty || 1), 0);
    const orderId = "GF-" + Date.now().toString(36).toUpperCase().slice(-8);
    const details = ["Hello GlobalFindzz, I'd like to place an order.", "", "Order reference: " + orderId, ...items.map((item, i) => (i+1)+". "+item.name+" | "+money(item.price)+" × "+item.qty+" | Colour: "+item.colour+" | Size: "+item.size), "Product subtotal: "+money(total), "", "CUSTOMER & DELIVERY", "Full name: "+form.get("name"), "Phone / WhatsApp: "+form.get("phone"), "Country/region: "+form.get("country"), "City: "+form.get("city"), "Postal code: "+(form.get("postcode")||"Not provided"), "Street address: "+form.get("address"), "Notes: "+(form.get("notes")||"None"), "", "Please confirm stock, international shipping cost, delivery estimate and customs/tax before payment."];
    const localOrders = load("gf-orders", []); localOrders.push({id:orderId,status:"New — awaiting confirmation",createdAt:new Date().toISOString(),items, total, country:form.get("country")}); save("gf-orders",localOrders);
    const number = String(config.whatsappNumber || "").replace(/\D/g,"");
    if (!number) { notify("WhatsApp is not configured. Contact us on WeChat: "+(config.wechatId||"AHMEDLEBOSS")); return; }
    window.open("https://wa.me/"+number+"?text="+encodeURIComponent(details.join("
")),"_blank","noopener");
    cart.clear(); save("gf-cart",[]); updateCounts(); closeCheckout(); event.currentTarget.reset(); document.getElementById("tracking-number").value = orderId; document.getElementById("tracking-result").textContent = "Order reference: "+orderId+" — New, awaiting confirmation (saved only in this browser).";
  });
  document.getElementById("show-favorites").addEventListener("click", () => { showOnlyFavorites = !showOnlyFavorites; document.getElementById("show-favorites").textContent = showOnlyFavorites ? "SHOW ALL PRODUCTS" : "♡ Favorites " + favorites.length; renderCatalog(); document.getElementById("catalogue").scrollIntoView({behavior:"smooth"}); });
  document.getElementById("language-select").addEventListener("change", e => { language=e.target.value; save("gf-language",language); applyLanguageCurrency(); });
  document.getElementById("currency-select").addEventListener("change", e => { currency=e.target.value; save("gf-currency",currency); applyLanguageCurrency(); });
  document.getElementById("tracking-form").addEventListener("submit", e => { e.preventDefault(); const id=document.getElementById("tracking-number").value.trim().toUpperCase(); const found=load("gf-orders",[]).find(o=>o.id.toUpperCase()===id); document.getElementById("tracking-result").textContent = found ? id+" · "+found.status+" · "+new Date(found.createdAt).toLocaleDateString() : t("noTrack"); });
  document.getElementById("review-product").replaceChildren(...products.map(p => new Option(p.name,p.id)));
  document.getElementById("review-form").addEventListener("submit", async e => {
    e.preventDefault();
    const file=document.getElementById("review-photo").files[0];
    let photo="";
    if (file) {
      if (!file.type.startsWith("image/") || file.size > 800000) { notify("Please choose an image smaller than 800 KB."); return; }
      photo=await new Promise(resolve=>{ const reader=new FileReader(); reader.onload=()=>resolve(String(reader.result)); reader.onerror=()=>resolve(""); reader.readAsDataURL(file); });
    }
    const review={name:document.getElementById("review-name").value.trim(),productId:document.getElementById("review-product").value,rating:Number(document.getElementById("review-rating").value),text:document.getElementById("review-text").value.trim(),photo,createdAt:new Date().toISOString()};
    const reviews=load("gf-reviews",[]); reviews.unshift(review); save("gf-reviews",reviews.slice(0,20)); e.currentTarget.reset(); drawReviews(); notify(t("savedReview"));
  });
  function drawReviews() {
    const root=document.getElementById("review-list"); root.replaceChildren();
    load("gf-reviews",[]).forEach(review=>{const card=document.createElement("article");card.className="review-card";const head=document.createElement("strong");head.textContent=review.name+" · "+"★".repeat(review.rating);const product=products.find(p=>p.id===review.productId);const label=document.createElement("p");label.className="review-product";label.textContent=(product?product.name:"Product")+" · Customer-submitted, not verified";const body=document.createElement("p");body.textContent=review.text;card.append(head,label,body);if(review.photo){const img=document.createElement("img");img.src=review.photo;img.alt="Customer-submitted product photo";card.append(img);}root.append(card);});
  }
  document.getElementById("wechat-copy").addEventListener("click", async () => { const id=String(config.wechatId||"AHMEDLEBOSS"); try { await navigator.clipboard.writeText(id); notify("WeChat ID copied: "+id); } catch (_) { notify("WeChat ID: "+id); } });
  document.getElementById("wechat-label").textContent=config.wechatId||"AHMEDLEBOSS";
  document.getElementById("whatsapp-contact").href="https://wa.me/"+String(config.whatsappNumber||"8613376445596").replace(/\D/g,"");
  document.getElementById("year").textContent=new Date().getFullYear();
  initFilters();
  applyLanguageCurrency();
  drawReviews();
})();