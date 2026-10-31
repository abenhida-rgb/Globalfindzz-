function gfWalletArt(base, accent, open = false) {
  const svg = open ? `
  <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 1000 800">
  <defs>
    <linearGradient id="bg" x2="0" y2="1"><stop stop-color="#f8f7f3"/><stop offset="1" stop-color="#e6e2d9"/></linearGradient>
    <linearGradient id="leather" x2="1" y2="1"><stop stop-color="${base}"/><stop offset=".55" stop-color="${base}"/><stop offset="1" stop-color="#101510" stop-opacity=".34"/></linearGradient>
    <linearGradient id="lining" x2="0" y2="1"><stop stop-color="#e8dfcc"/><stop offset="1" stop-color="#c9bda7"/></linearGradient>
    <pattern id="canvas" width="38" height="34" patternUnits="userSpaceOnUse"><path d="M19 2 L35 17 L19 32 L3 17 Z M19 9 L27 17 L19 25 L11 17 Z" fill="none" stroke="${accent}" stroke-width="2.2" opacity=".72"/><path d="M0 0 L38 34 M38 0 L0 34" stroke="${accent}" stroke-width=".7" opacity=".18"/></pattern>
    <filter id="shadow"><feGaussianBlur stdDeviation="18"/></filter>
  </defs>
  <rect width="1000" height="800" fill="url(#bg)"/>
  <ellipse cx="500" cy="620" rx="350" ry="42" fill="#29251f" opacity=".22" filter="url(#shadow)"/>
  <g transform="rotate(-3 500 410)">
    <rect x="105" y="210" width="790" height="390" rx="28" fill="#5c5549" opacity=".25"/>
    <rect x="105" y="190" width="790" height="390" rx="26" fill="url(#leather)" stroke="#171916" stroke-width="8"/>
    <rect x="105" y="190" width="790" height="390" rx="26" fill="url(#canvas)"/>
    <rect x="126" y="211" width="748" height="348" rx="15" fill="none" stroke="${accent}" stroke-width="2.5" stroke-dasharray="3 8" opacity=".9"/>
    <path d="M500 198 V575" stroke="#171916" stroke-width="5" opacity=".45"/>
    <rect x="137" y="258" width="328" height="255" rx="12" fill="url(#lining)" stroke="#b4a78f" stroke-width="4"/>
    <rect x="535" y="258" width="328" height="255" rx="12" fill="url(#lining)" stroke="#b4a78f" stroke-width="4"/>
    <g fill="none" stroke="#8e8069" stroke-width="3">
      <path d="M155 326 H447 M155 386 H447 M155 446 H447"/>
      <path d="M553 326 H845 M553 386 H845 M553 446 H845"/>
    </g>
    <g fill="#f5f0e5" stroke="#b7a98f" stroke-width="2">
      <path d="M155 267 H447 V319 H155 Z"/><path d="M553 267 H845 V319 H553 Z"/>
    </g>
    <path d="M500 215 V555" stroke="#d7c8a9" stroke-width="3" stroke-dasharray="4 8"/>
    <rect x="430" y="535" width="140" height="28" rx="8" fill="${base}" opacity=".85"/>
  </g>
  <text x="500" y="710" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" letter-spacing="5" fill="#777064">BIFOLD WALLET • INTERIOR VIEW</text>
  </svg>` : `
  <svg xmlns="http://www.w3.org/2000/svg" width="1000" height="800" viewBox="0 0 1000 800">
  <defs>
    <linearGradient id="bg" x2="0" y2="1"><stop stop-color="#faf9f6"/><stop offset="1" stop-color="#e7e2d9"/></linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${base}"/><stop offset=".45" stop-color="${base}"/><stop offset="1" stop-color="#090d0a" stop-opacity=".42"/></linearGradient>
    <linearGradient id="edge" x2="0" y2="1"><stop stop-color="#ffffff" stop-opacity=".3"/><stop offset="1" stop-color="#000000" stop-opacity=".28"/></linearGradient>
    <pattern id="canvas" width="42" height="38" patternUnits="userSpaceOnUse"><path d="M21 2 L39 19 L21 36 L3 19 Z M21 10 L30 19 L21 28 L12 19 Z" fill="none" stroke="${accent}" stroke-width="2.5" opacity=".78"/><path d="M0 0 L42 38 M42 0 L0 38" stroke="${accent}" stroke-width=".8" opacity=".2"/></pattern>
    <filter id="shadow"><feGaussianBlur stdDeviation="22"/></filter>
  </defs>
  <rect width="1000" height="800" fill="url(#bg)"/>
  <ellipse cx="500" cy="620" rx="310" ry="48" fill="#27231e" opacity=".25" filter="url(#shadow)"/>
  <g transform="rotate(-5 500 400)">
    <rect x="205" y="215" width="590" height="365" rx="34" fill="#151713" opacity=".35"/>
    <rect x="190" y="195" width="620" height="380" rx="34" fill="url(#body)" stroke="#171916" stroke-width="9"/>
    <rect x="190" y="195" width="620" height="380" rx="34" fill="url(#canvas)"/>
    <rect x="211" y="216" width="578" height="338" rx="22" fill="none" stroke="${accent}" stroke-width="3" stroke-dasharray="4 9" opacity=".95"/>
    <path d="M225 235 Q500 205 775 235" fill="none" stroke="#fff" stroke-width="8" opacity=".12"/>
    <path d="M210 540 Q500 580 790 540" fill="none" stroke="#000" stroke-width="12" opacity=".18"/>
    <rect x="748" y="340" width="24" height="92" rx="9" fill="#c4b18b" stroke="#796748" stroke-width="4"/>
    <path d="M760 352 V420" stroke="#f5e8c9" stroke-width="3" opacity=".7"/>
  </g>
  <text x="500" y="700" text-anchor="middle" font-family="Arial,sans-serif" font-size="19" letter-spacing="5" fill="#777064">GEOMETRIC CANVAS BIFOLD WALLET</text>
  </svg>`;
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
    category: "ACCESSORIES",
    name: "Vintage Metal Frame Sunglasses",
    price: 10,
    description: "Men's vintage-inspired slim metal-frame sunglasses with a classic European & American look. Prescription-lens compatibility should be confirmed before ordering.",
    image: "https://www.retrospectacle.co.uk/cdn/shop/files/Dunhill6161Men_sSunglasses.png?v=1778062126&width=800",
    colours: ["Gold frame / dark lenses", "Silver frame / dark lenses", "Black frame", "Brown lenses"],
    sizes: ["One size"]
  },
  {
    id: "y2k-patchwork-hoodie",
    category: "CLOTHING",
    name: "Men's Y2K Contrast Patchwork Hooded Sweatshirt",
    price: 17,
    description: "Men's short-length Y2K-inspired contrast patchwork hooded sweatshirt with long sleeves and an oversized fit. Dark grey, 100% polyester. Check measurements before ordering.",
    image: "https://img.ltwebstatic.com/v4/j/pi/2025/10/21/c1/1761010339ff09c9df4ebe55bc734b6a2d885fb119_thumbnail_900x.webp",
    colours: ["Dark Grey"],
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
    id: "victoire-style-wallet",
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
    sizes: ["One size"]
  }
];