# Deploy Your App to GitHub and Host It Live

## 🎯 Goal
Get your app on GitHub and make it accessible without running localhost.

## Step 1: Set Up Git (One-Time Setup)

First, configure git with your information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email.

## Step 2: Commit Your Code

```bash
cd my-mobile-app

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Task list mobile app prototype"
```

## Step 3: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)
1. Go to [github.com](https://github.com)
2. Click the **+** icon → **New repository**
3. Name it: `my-mobile-app` (or whatever you prefer)
4. Choose **Public** or **Private**
5. **DO NOT** initialize with README (you already have one)
6. Click **Create repository**

### Option B: Using GitHub CLI (If Installed)
```bash
gh repo create my-mobile-app --public --source=. --push
```

## Step 4: Push to GitHub

After creating the repo on GitHub, you'll see commands like:

```bash
git remote add origin https://github.com/YOUR-USERNAME/my-mobile-app.git
git branch -M main
git push -u origin main
```

Copy and run those commands (replace YOUR-USERNAME with your actual GitHub username).

## 🚀 Step 5: Deploy for Live Access

Now that it's on GitHub, you have multiple deployment options:

### Option A: Deploy Web Version to Vercel (Easiest)

**Setup:**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Click **Add New** → **Project**
4. Import your `my-mobile-app` repository
5. Configure build settings:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build:web`
   - **Output Directory:** `web-build`
6. Click **Deploy**

**Result:** You get a live URL like `my-mobile-app.vercel.app`

**Note:** We need to add a build script first. Run:
```bash
npm install --save-dev @expo/webpack-config
```

Then add to `package.json` scripts:
```json
"build:web": "expo export:web"
```

### Option B: Deploy Web Version to Netlify

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click **Add new site** → **Import an existing project**
4. Select your GitHub repo
5. Build settings:
   - **Build command:** `npm run build:web`
   - **Publish directory:** `web-build`
6. Click **Deploy**

### Option C: Deploy with Expo (For Mobile App)

**Best for phone access without localhost:**

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure project
eas build:configure

# Publish update
eas update --auto
```

**Result:** Your app is hosted on Expo's servers and accessible via Expo Go app on your phone.

### Option D: GitHub Pages (Free Static Hosting)

1. Add to `package.json` scripts:
```json
"predeploy": "expo export:web",
"deploy": "gh-pages -d web-build"
```

2. Install gh-pages:
```bash
npm install --save-dev gh-pages
```

3. Deploy:
```bash
npm run deploy
```

4. Enable GitHub Pages:
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Result:** Live at `https://YOUR-USERNAME.github.io/my-mobile-app`

## 📱 Recommended Setup for You

**For the best experience, I recommend:**

1. **Push to GitHub** (version control)
2. **Deploy web version to Vercel** (browser access from anywhere)
3. **Use Expo hosting** (mobile app access on phone via Expo Go)

This gives you:
- ✅ Code backed up on GitHub
- ✅ Live web URL you can access from any browser
- ✅ Mobile app accessible on your phone without localhost
- ✅ Automatic deployments when you push changes

## 🔄 Updating Your Live App

Once set up, to update:

```bash
# Make changes to App.js
# Commit changes
git add .
git commit -m "Update: description of changes"
git push

# Vercel/Netlify auto-deploys from GitHub
# For Expo mobile updates:
eas update --auto
```

## ⚡ Quick Start Commands

```bash
# 1. Configure git (one time)
git config --global user.name "Your Name"
git config --global user.email "your@email.com"

# 2. Commit everything
git add .
git commit -m "Initial commit: Task list mobile app"

# 3. Create repo on github.com, then:
git remote add origin https://github.com/YOUR-USERNAME/my-mobile-app.git
git push -u origin main

# 4. Deploy to Vercel (after connecting on vercel.com)
# Automatic from GitHub!
```

Would you like me to help with any specific step?
