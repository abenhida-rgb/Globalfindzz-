function gfWalletArt(base, accent, open = false) {
  const pattern = `<pattern id="motif" width="34" height="34" patternUnits="userSpaceOnUse"><path d="M17 3 L29 17 L17 31 L5 17 Z M17 10 L23 17 L17 24 L11 17 Z" fill="none" stroke="${accent}" stroke-width="2" opacity=".8"/></pattern>`;
  const body = open
    ? `<path d="M115 300 Q115 265 150 265 H650 Q685 265 685 300 V560 H115 Z" fill="${base}" stroke="#252525" stroke-width="8"/><path d="M115 300 Q115 265 150 265 H650 Q685 265 685 300 V560 H115 Z" fill="url(#motif)"/><path d="M400 270 V560" stroke="#d7c6a4" stroke-width="7"/><rect x="145" y="330" width="225" height="180" rx="12" fill="#eee4d4" stroke="#c7b89e" stroke-width="5"/><rect x="430" y="330" width="225" height="180" rx="12" fill="#eee4d4" stroke="#c7b89e" stroke-width="5"/><path d="M160 380 H355 M445 380 H640 M160 430 H355 M445 430 H640" stroke="${base}" stroke-width="8" opacity=".7"/>`
    : `<rect x="135" y="230" width="530" height="350" rx="42" fill="${base}" stroke="#252525" stroke-width="9"/><rect x="135" y="230" width="530" height="350" rx="42" fill="url(#motif)"/><path d="M160 255 Q400 225 640 255" stroke="#ffffff" stroke-width="7" opacity=".28" fill="none"/><path d="M155 545 Q400 575 645 545" stroke="#111111" stroke-width="8" opacity=".22" fill="none"/><rect x="585" y="365" width="22" height="82" rx="8" fill="#d9c7a1" stroke="#8b7857" stroke-width="3"/>`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><defs><linearGradient id="bg" x2="0" y2="1"><stop stop-color="#faf8f3"/><stop offset="1" stop-color="#e9e3d8"/></linearGradient><linearGradient id="leather" x2="1" y2="1"><stop stop-color="#ffffff" stop-opacity=".16"/><stop offset="1" stop-color="#000000" stop-opacity=".18"/></linearGradient><filter id="shadow" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="18"/></filter>${pattern}</defs><rect width="800" height="800" fill="url(#bg)"/><ellipse cx="400" cy="615" rx="270" ry="42" fill="#000" opacity=".18" filter="url(#shadow)"/><g>${body}<path d="M135 230 H665 V580 H135 Z" fill="url(#leather)" opacity=".16"/></g><text x="400" y="700" text-anchor="middle" font-family="Arial,sans-serif" font-size="22" letter-spacing="4" fill="#6b665e">UNBRANDED BIFOLD WALLET</text></svg>`;
  return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}
window.STORE_PRODUCTS = [
  {
    id: "nike-tech",
    category: "TRACKSUITS",
    name: "Nike Tech Fleece Tracksuit",
    price: 29,
    description: "Two-piece tracksuit set. Ask us to confirm the exact colour and size.",
    image: "https://www.knvbshop.nl/media/catalog/product/cache/d81c8dc66c69ceb69419c2e7e72e896d/3/6/363695_nike-tech-fleece-sportswear-trainingspak-blauwgroen-zwart.jpg",
    colours: ["Black", "Grey", "Dark Grey", "Navy", "Blue", "Brown", "Green", "Beige"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
  },
  {
    id: "lacoste-monogram",
    category: "TRACKSUITS",
    name: "Lacoste Monogram Tracksuit",
    price: 32,
    description: "Monogram-style tracksuit. Ask us to confirm the exact colour and size.",
    image: "https://cdn.vuahanghieu.com/unsafe/0x0/left/top/smart/filters%3Aquality%2890%29/https%3A/admin.vuahanghieu.com/upload/news/content/2024/10/ao-khoac-nam-lacoste-paris-monogram-zip-up-sweatshirt-sh1368-qie-mau-xanh-navy-1-jpg-1728264257-07102024082417.jpg",
    colours: ["Black", "Navy", "Grey", "White", "Beige", "Brown", "Green", "Blue"],
    sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL"]
  },
  {
    id: "boken-slippers",
    category: "FOOTWEAR",
    name: "BOKEN Closed-Toe Slip-On Slippers",
    price: 10,
    description: "Men's style. Comfortable closed-toe slip-on slippers with a thick sole and easy buckle detail. Autumn/winter casual wear. Please confirm material, anti-slip performance and available sizes with us.",
    image: "https://ericcomfortshoes.com/cdn/shop/collections/Adobe_Express_-_file_3.jpg?v=1762616297",
    colours: ["Khaki", "Brown", "Black"],
    sizes: ["EU 36–37", "EU 38–39", "EU 40–41"]
  },
  {
    id: "sunglasses",
    category: "ACCid: "victoire-style-wallet",
    category: "ACCESSORIES",
    name: "Victoire-Style Bifold Wallet",
    price: 14.99,
    description: "Compact bi-fold wallet with an abstract geometric canvas pattern, card slots and space for notes. Unbranded style-inspired design; not an authentic Goyard product. Product artwork is an illustrative mock-up; confirm the exact supplier item, material and colour before ordering. Shipping is calculated separately.",
    image: gfWalletArt("#244b37", "#d8d0ae"),
    gallery: [gfWalletArt("#244b37", "#d8d0ae", true)],
    variantImages: {
      "Black": gfWalletArt("#242424", "#c8c1ad"),
      "Green": gfWalletArt("#244b37", "#d8d0ae"),
      "Yellow": gfWalletArt("#c5a43b", "#f0e4bf")
    },
    colours: ["Black", "Green", "Yellow"],
    sizes: ["One size"]   colours: ["Dark Grey"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "sneakers",
    category: "FOOTWEAR",
    name: "Nike Air Max TN original",
    price: 34,
    description: "Men's Nike Air Max Plus TN sneakers. Product photo sourced from Nike's official China store. Confirm the exact colourway and available sizes before ordering.",
    image: "https://static.nike.com.cn/a/images/t_PDP_1728_v1/f_auto%2Cq_auto%3Aeco%2Cu_9ddf04c7-2a9a-4d76-add1-d15af8f0263d%2Cc_scale%2Cfl_relative%2Cw_1.0%2Ch_1.0%2Cfl_layer_apply/f0e0ab7b-54f7-4df9-b16e-cfe3ac5567ef/NIKE%2BAIR%2BMAX%2BPLUS%2BFA.png",
    colours: ["White", "Black", "Grey", "Mixed"],
    sizes: ["EU 39", "EU 40", "EU 41", "EU 42", "EU 43", "EU 44", "EU 45"]
  }
  ,{
    id: "black-knight-bracelet",
    category: "ACCESSORIES",
    name: "Black Knight Matte Bracelet – Grey H Clasp",
    price: 14.99,
    description: "Unbranded matte enamel-style bangle with a grey-tone H-shaped clasp and a minimalist couple-inspired look. Confirm the exact item, material, finish and packaging before ordering. Not represented as an authentic Hermès product. Shipping is calculated separately.",
    image: "https://assets.hermes.com/is/image/hermesproduct/brazalete-clic-hh--703203FB5H-front-wm-1-0-0-1000-1000_g.jpg",
    supplierUrl: "https://detail.1688.com/offer/789306907856.html",
    colours: ["Steel", "Black Knight"],
    sizes: ["One size"]
  }
  ,{
    id: "goyard-style-belt",
    category: "ACCESSORIES",
    name: "Goyard-Style Wallet",
    price: 14.99,
    description: "Compact card wallet with a geometric chevron pattern. Available in black, green and yellow. Unbranded, style-inspired design; not represented as an authentic Goyard product. Shipping is calculated separately.",
    image: "https://sands-uae.com/cdn/shop/files/goyard-saint-sulpice-card-wallet-black-front-view.jpg?v=1771333796&width=1200",
    variantImages: {
      "Black": "https://sands-uae.com/cdn/shop/files/goyard-saint-sulpice-card-wallet-black-front-view.jpg?v=1771333796&width=1200",
      "Green": "https://sands-uae.com/cdn/shop/files/goyard-saint-sulpice-card-wallet-green-front-view.jpg?v=1771333796&width=1200",
      "Yellow": "https://sands-uae.com/cdn/shop/files/goyard-saint-sulpice-card-wallet-yellow-front-view.jpg?v=1771327312&width=1200"
    },
    colours: ["Black", "Green", "Yellow"],
    sizes: ["One size"]
  }
];
