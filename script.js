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
    document.getElementById("checkout-product").value = product.name || "";
    document.getElementById("checkout-colour").value = colour || "";
    document.getElementById("checkout-size").value = size || "";
    const overlay = document.getElementById("checkout-overlay");
    overlay.classList.add("open");
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("checkout-open");
    document.getElementById("customer-name").focus();
  }

  function closeCheckout() {
    const overlay = document.getElementById("checkout-overlay");
    overlay.classList.remove("open");
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("checkout-open");
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
    image.alt = product.name;
    image.loading = "lazy";
    image.onerror = () => {
      image.remove();
      photo.classList.add("image-fallback");
      photo.textContent = product.name;
    };
    if (product.image) {
      image.src = product.image;
      photo.append(image);
    } else {
      photo.classList.add("image-fallback");
      photo.textContent = product.name;
    }

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

document.getElementById("checkout-close").addEventListener("click", closeCheckout);
  document.getElementById("checkout-overlay").addEventListener("click", event => {
    if (event.target.id === "checkout-overlay") closeCheckout();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") closeCheckout();
  });
  document.getElementById("checkout-form").addEventListener("submit", event => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const productName = document.getElementById("checkout-product").value;
    const product = products.find(item => item.name === productName);
    const details = [
      "Hello GlobalFindzz, I would like to place an order.",
      "",
      "Product: " + productName,
      "Price: " + (!product || product.price == null ? "Please quote" : money(product.price)),
      "Colour: " + document.getElementById("checkout-colour").value,
      "Size: " + document.getElementById("checkout-size").value,
      "",
      "CUSTOMER & DELIVERY",
      "Full name: " + form.get("name"),
      "Phone / WhatsApp: " + form.get("phone"),
      "Country/region: " + form.get("country"),
      "City: " + form.get("city"),
      "Postal code: " + (form.get("postcode") || "Not provided"),
      "Street address: " + form.get("address"),
      "Notes: " + (form.get("notes") || "None"),
      "",
      "Please confirm stock, shipping price, delivery estimate and any customs/tax before payment."
    ];
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    if (!number || number === "REPLACE_WITH_YOUR_WHATSAPP_NUMBER") {
      notify("WhatsApp is not configured. Please contact us on WeChat: " + (config.wechatId || "AHMEDLEBOSS"));
      return;
    }
    window.open("https://wa.me/" + number + "?text=" + encodeURIComponent(details.join("\n")), "_blank", "noopener");
    closeCheckout();
  });

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