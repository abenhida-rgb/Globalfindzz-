(() => {
  const products = Array.isArray(window.STORE_PRODUCTS) ? window.STORE_PRODUCTS : [];
  const config = window.STORE_CONFIG || {};
  const grid = document.getElementById("product-grid");
  const toast = document.getElementById("toast");
  let activeCategory = "All";
  let toastTimer;

  const formatPrice = (price) => new Intl.NumberFormat("en-US", {
    style: "currency", currency: config.currency || "USD", maximumFractionDigits: 2
  }).format(Number(price) || 0);

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function orderMessage(product) {
    return `${config.orderIntro || "Hello! I'm interested in this product:"}\n${product.name}\nPrice shown: ${formatPrice(product.price)}\nPlease confirm availability, sizes and worldwide shipping options.`;
  }

  function whatsappUrl(product) {
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    if (!number || number === "REPLACE_WITH_YOUR_WHATSAPP_NUMBER") return "";
    return `https://wa.me/${number}?text=${encodeURIComponent(orderMessage(product))}`;
  }

  function openOrder(product) {
    const url = whatsappUrl(product);
    if (!url) {
      showToast("Add your WhatsApp number in store-config.js to enable order links.");
      document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function render() {
    const visible = products.filter(p => activeCategory === "All" || p.category === activeCategory);
    grid.innerHTML = "";
    visible.forEach(product => {
      const card = document.createElement("article");
      card.className = "product-card";
      const photoWrap = document.createElement("div");
      photoWrap.className = "product-photo-wrap";
      const img = document.createElement("img");
      img.className = "product-photo";
      img.src = product.image;
      img.alt = product.name;
      img.loading = "lazy";
      img.onerror = () => { img.style.display = "none"; photoWrap.style.background = "#e9e5dc"; };
      photoWrap.appendChild(img);
      if (product.tag) {
        const tag = document.createElement("span");
        tag.className = "product-tag";
        tag.textContent = product.tag;
        photoWrap.appendChild(tag);
      }
      const quick = document.createElement("button");
      quick.type = "button";
      quick.className = "quick-order";
      quick.innerHTML = '<span>ASK ABOUT THIS ITEM</span><span>↗</span>';
      quick.addEventListener("click", () => openOrder(product));
      photoWrap.appendChild(quick);

      const info = document.createElement("div");
      info.className = "product-info";
      const cat = document.createElement("div");
      cat.className = "product-category";
      cat.textContent = product.category;
      const titleRow = document.createElement("div");
      titleRow.className = "product-title-row";
      const title = document.createElement("h3");
      title.className = "product-title";
      title.textContent = product.name;
      const price = document.createElement("span");
      price.className = "product-price";
      price.textContent = formatPrice(product.price);
      titleRow.append(title, price);
      const desc = document.createElement("p");
      desc.className = "product-description";
      desc.textContent = product.description || "";
      const mobile = document.createElement("button");
      mobile.type = "button";
      mobile.className = "mobile-order";
      mobile.textContent = "ASK / ORDER ↗";
      mobile.addEventListener("click", () => openOrder(product));
      info.append(cat, titleRow, desc, mobile);
      card.append(photoWrap, info);
      grid.appendChild(card);
    });
    document.getElementById("all-count").textContent = String(products.length).padStart(2, "0");
    document.querySelectorAll(".filter").forEach(btn => {
      const active = btn.dataset.category === activeCategory;
      btn.classList.toggle("active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  document.querySelectorAll(".filter").forEach(btn => {
    btn.addEventListener("click", () => { activeCategory = btn.dataset.category; render(); });
  });

  const waContact = document.getElementById("whatsapp-contact");
  const contactProduct = { name: "General inquiry", price: "" };
  const generalMessage = "Hello! I'd like to ask about your collection and worldwide shipping.";
  const waNumber = String(config.whatsappNumber || "").replace(/\D/g, "");
  if (waNumber && waNumber !== "REPLACE_WITH_YOUR_WHATSAPP_NUMBER") {
    waContact.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(generalMessage)}`;
  } else {
    waContact.addEventListener("click", e => {
      e.preventDefault();
      showToast("Add your WhatsApp number in store-config.js to enable this link.");
    });
  }

  document.getElementById("wechat-copy").addEventListener("click", async () => {
    const id = String(config.wechatId || "");
    if (!id || id === "REPLACE_WITH_YOUR_WECHAT_ID") {
      showToast("Add your exact WeChat ID in store-config.js first.");
      return;
    }
    try {
      await navigator.clipboard.writeText(id);
      showToast(`WeChat ID copied: ${id}`);
    } catch (_) {
      showToast(`Your WeChat ID: ${id}`);
    }
  });
  document.getElementById("wechat-label").textContent =
    config.wechatId && config.wechatId !== "REPLACE_WITH_YOUR_WECHAT_ID" ? `WeChat ID: ${config.wechatId}` : "Set your WeChat ID in store-config.js";
  document.getElementById("year").textContent = new Date().getFullYear();
  render();
})();
