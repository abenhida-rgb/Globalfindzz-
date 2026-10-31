# Global Style — free online store template

A responsive, professional static store for clothing, shoes and accessories. Includes category filters, sample product cards, editable prices, and WhatsApp / WeChat inquiry actions.

## Files
- `index.html` — page content and structure
- `styles.css` — responsive styling
- `products.js` — product names, categories, prices, descriptions and image URLs
- `store-config.js` — currency, WhatsApp number and WeChat ID
- `script.js` — filters and order/contact interactions

## Before publishing
1. Open `store-config.js` in a text editor.
2. Replace `REPLACE_WITH_YOUR_WHATSAPP_NUMBER` with your WhatsApp number including country code, digits only. Example format: `447700900123` (example only; do not use unless it is your number).
3. Replace `REPLACE_WITH_YOUR_WECHAT_ID` with your exact WeChat ID.
4. Open `products.js` and edit sample names, prices, descriptions and photo URLs. Prices are examples, not live offers.
5. Replace sample stock photos with your own product images or images you have permission to use. The current images are remote Unsplash image URLs and need internet access.
6. Update store name, currency and contact details as desired.
7. Test all contact buttons and product details on phone and computer.

## Free publishing option: GitHub Pages
1. Sign in or create a free account at https://github.com
2. Create a new **public** repository, e.g. `global-style-store`.
3. Upload the contents of this folder to the repository root (upload the files, not the ZIP).
4. Open **Settings → Pages**.
5. Under **Build and deployment**, choose **Deploy from a branch**.
6. Choose branch `main` and folder `/(root)`, then save.
7. Wait for GitHub Pages to publish; the public URL appears in the Pages settings, usually `https://YOUR-USERNAME.github.io/global-style-store/`.

## Notes
- This is a static catalog, not a full checkout system. Orders are inquiries through WhatsApp; WeChat opens a copy-ID action.
- No payment details are collected on this site.
- Free hosting and service terms may change. Do not upload private customer information to a public repository.
- Product photos/prices/availability are samples. Confirm stock, delivery, returns and payment arrangements directly with customers.
