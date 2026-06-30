# Wish Upon a Starre - Dorset Character Party Website

This is the complete, modern, fully responsive static frontend website for **Wish Upon a Starre**, a Dorset-based children's character party entertainment company.

The site is built with plain HTML, semantic utility styling, and vanilla JavaScript—ensuring lightning-fast load speeds, robust offline compatibility, clean WCAG-conscious accessibility, and effortless, free hosting on **Cloudflare Pages**.

---

## 🚀 Easy Deployment: GitHub → Cloudflare Pages

This website is designed to be fully compatible with **Cloudflare Pages** right out of the box with **zero build steps**!

### Step 1: Push code to your GitHub Repository
1. Initialize a new repository on GitHub (e.g., named `wish-upon-a-starre-site`).
2. Clone or upload the contents of this folder into your repository.
3. Commit and push the files to your default branch (usually `main`).

### Step 2: Connect to Cloudflare Pages
1. Log in to your [Cloudflare Dashboard](https://dash.cloudflare.com/) and navigate to **Workers & Pages**.
2. Click **Create Application** → Select the **Pages** tab → Click **Connect to Git**.
3. Select your GitHub account and choose the `wish-upon-a-starre-site` repository.
4. Set up the following build settings:
   - **Project Name:** `wish-upon-a-starre` (or your preferred subdomain)
   - **Production Branch:** `main`
   - **Framework Preset:** `None`
   - **Build Command:** *(Leave blank, or enter `exit 0`)*
   - **Build Output Directory:** `/` (the root directory)
5. Click **Save and Deploy**.

Cloudflare will automatically deploy your site and provide a free `.pages.dev` URL (e.g., `https://wish-upon-a-starre.pages.dev`). Any future commits pushed to your GitHub `main` branch will automatically trigger a fresh production rebuild within seconds!

---

## 🎨 Creative Adjustments & Customizations

The codebase contains helper comments starting with `CLIENT:` or specific code segments to make manual updates super easy:

### 1. Replacing Package Prices
Open **`packages-and-prices.html`** and locate the price indicators (e.g. `From £___`). Replace them with your actual figures. You can also customize the bullet points underneath to reflect your latest package deliverables.

### 2. Updating Contact Information
We use `info@example.com` throughout the HTML pages. Search for `info@example.com` in your editor to bulk replace it with your real business email (e.g., `info@wishuponastarredorset.co.uk`).

### 3. Placing Real Images
All images are systematically stored in the `/assets/images/` folder. Simply overwrite the existing SVG placeholder files with your real `.jpg` or `.png` photographs matching the filenames exactly:
- `logo-main.png` — Main company round badge
- `owner-abbie.jpg` — Photo of founder Abbie for the Our Story page
- `hero-main-character-party.jpg` — Hero homepage banner
- `characters-princess.jpg`, `characters-superhero.jpg`, `characters-fairy.jpg`, `characters-science-professor.jpg` — Cast cards
- `OBT.png` — Trust partner certification badge in the footer

---

## 🔒 Fully Custom Consent Management

We have built a proprietary cookie consent manager in `/assets/js/cookies.js` which loads automatically on first visit:
- Prevents optional cookies from firing prior to consent.
- Provides a "Manage choices" modal available on every single page footer.
- Keyboard navigable and screen-reader accessible.
