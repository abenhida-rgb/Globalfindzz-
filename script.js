(() => {
  const products = Array.isArray(window.STORE_PRODUCTS) ? window.STORE_PRODUCTS : [];
  const config = window.STORE_CONFIG || {};
  const grid = document.getElementById("product-grid");
  const toast = document.getElementById("toast");
  let toastTimer;

  const money = amount => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: config.currency || "USD",
    maximumFractionDigits: 0
  }).format(Number(amount) || 0);

  function notify(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
  }

  function sendOrder(product, colour, size) {
    const message = [
      "Hello GlobalFindzz, I would like to ask about:",
      product.name,
      "Price: " + (product.price == null ? "Please quote" : money(product.price)),
      "Colour: " + colour,
      "Size: " + size,
      "Please confirm availability and delivery."
    ].join("\n");

    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    if (number && number !== "REPLACE_WITH_YOUR_WHATSAPP_NUMBER") {
      window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(message), "_blank", "noopener");
    } else {
      notify("Please contact us on WeChat: " + (config.wechatId || "AHMEDLEBOSS"));
    }
  }

  function makeSelect(label, values) {
    const select = document.createElement("select");
    select.setAttribute("aria-label", label);
    values.forEach(value => select.add(new Option(value, value)));
    return select;
  }

  function renderProduct(product, index) {
    const card = document.createElement("article");
    card.className = "product-card";

    const photo = document.createElement("div");
    photo.className = "product-photo";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    image.onerror = () => {
      image.remove();
      photo.classList.add("image-fallback");
      photo.textContent = "GLOBALFINDZZ";
    };
    photo.append(image);

    const info = document.createElement("div");
    info.className = "product-info";

    const meta = document.createElement("div");
    meta.className = "product-meta";
    const category = document.createElement("span");
    category.className = "product-category";
    category.textContent = product.category || "COLLECTION";
    const number = document.createElement("span");
    number.className = "product-index";
    number.textContent = "0" + (index + 1);
    meta.append(category, number);

    const name = document.createElement("h3");
    name.textContent = product.name;
    const price = document.createElement("div");
    price.className = "price";
    price.textContent = product.price == null ? "Price on request" : money(product.price);
    const description = document.createElement("p");
    description.className = "description";
    description.textContent = product.description;

    const options = document.createElement("div");
    options.className = "options";
    const colour = makeSelect("Choose colour", product.colours || ["One colour"]);
    const size = makeSelect("Choose size", product.sizes || ["One size"]);
    options.append(colour, size);

    const order = document.createElement("button");
    order.className = "order";
    order.type = "button";
    order.textContent = "ORDER / ENQUIRE";
    const arrow = document.createElement("span");
    arrow.textContent = "↗";
    order.append(arrow);
    order.addEventListener("click", () => sendOrder(product, colour.value, size.value));

    info.append(meta, name, price, description, options, order);
    card.append(photo, info);
    return card;
  }

  products.forEach((product, index) => grid.append(renderProduct(product, index)));

  const whatsapp = document.getElementById("whatsapp-contact");
  const number = String(config.whatsappNumber || "").replace(/\D/g, "");
  if (number && number !== "REPLACE_WITH_YOUR_WHATSAPP_NUMBER") {
    whatsapp.href = "https://wa.me/" + number + "?text=" + encodeURIComponent("Hello, I'd like to ask about the GlobalFindzz collection.");
  } else {
    whatsapp.addEventListener("click", event => {
      event.preventDefault();
      notify("WhatsApp is not set up yet. Please use WeChat.");
    });
  }

  document.getElementById("wechat-copy").addEventListener("click", async () => {
    const id = String(config.wechatId || "AHMEDLEBOSS");
    try {
      await navigator.clipboard.writeText(id);
      notify("WeChat ID copied: " + id);
    } catch (error) {
      notify("WeChat ID: " + id);
    }
  });

  document.getElementById("wechat-label").textContent = config.wechatId || "AHMEDLEBOSS";
  document.getElementById("year").textContent = new Date().getFullYear();
})();