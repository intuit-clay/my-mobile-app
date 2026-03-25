# Installing Xcode for iOS Simulator

## Current Status
Xcode is **NOT installed** on your system. You have Command Line Tools, but need the full Xcode app for the iOS Simulator.

## Installation Steps

### 1. Install Xcode from App Store
1. Open the **App Store** app on your Mac
2. Search for **"Xcode"**
3. Click **Get** or **Install**
4. Wait for download to complete (15-20GB, takes 30-60 minutes depending on internet speed)

### 2. Configure Xcode Command Line Tools
After installation completes, run these commands:

```bash
sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
sudo xcodebuild -runFirstLaunch
```

You'll need to enter your Mac password.

### 3. Accept License Agreement
Open Xcode for the first time:
- Launch Xcode from Applications
- Accept the license agreement
- Wait for additional components to install

### 4. Install iOS Simulator
The iOS Simulator is included with Xcode. To verify:
```bash
xcrun simctl list devices
```

### 5. Test with Your App
Once Xcode is installed, run:
```bash
cd my-mobile-app
npm run ios
```

This will:
- Launch the iOS Simulator
- Build your app
- Open your app in the simulator

## Alternative: Use Physical iPhone
If you have an iPhone, you don't need Xcode for basic testing:

1. Install **Expo Go** from the App Store on your iPhone
2. Run `npm start` in your project
3. Scan the QR code with your Camera app
4. Your app opens in Expo Go

## Troubleshooting

### "xcode-select: error: tool requires Xcode"
This means you need the full Xcode app, not just Command Line Tools.

### "Unable to boot simulator"
Try:
```bash
xcrun simctl shutdown all
xcrun simctl boot "iPhone 15"
```

### Build fails
Clean the build:
```bash
cd ios
rm -rf Pods Podfile.lock
cd ..
npx pod-install
```

## System Requirements
- macOS 13.0 or later
- At least 20GB free disk space
- Apple ID for App Store download
