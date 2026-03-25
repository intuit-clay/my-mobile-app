# Mobile Prototype Setup Guide

## ✅ What's Already Done

1. **Node.js v24.14.1** - Installed and working
2. **Expo React Native Project** - Created with a task list prototype app
3. **Development Server** - Starting now

## 📱 Your Prototype App

I've created a simple **Task List app** to demonstrate mobile UI patterns:

- Add tasks with text input
- Check/uncheck tasks to mark complete
- Delete tasks with X button
- Scrollable list
- Modern, clean UI with shadows and animations

The code is in `App.js` and uses React hooks (useState) for state management.

## 🚀 How to View Your App

### Option 1: Web Browser (Working Now!)
The easiest way to see your app immediately:
```bash
npm run web
```
This opens in your browser at http://localhost:8081

### Option 2: Physical Phone (Recommended for True Mobile Testing)

1. **Install Expo Go app** on your phone:
   - iOS: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - Android: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Scan the QR code** that appears:
   - iOS: Use Camera app
   - Android: Use Expo Go app

### Option 3: iOS Simulator (Requires Xcode)

**Status:** Xcode is NOT currently installed

**To install:**
1. Open Mac App Store
2. Search for "Xcode"
3. Download and install (this is ~15GB and takes a while)
4. After installation, run:
   ```bash
   sudo xcode-select --switch /Applications/Xcode.app/Contents/Developer
   sudo xcodebuild -runFirstLaunch
   ```

**Then run:**
```bash
npm run ios
```

### Option 4: Android Emulator (Requires Android Studio)

**Status:** Android Studio is NOT currently installed

**To install:**
1. Download from [developer.android.com/studio](https://developer.android.com/studio)
2. Install Android Studio
3. Open Android Studio > Settings > Android SDK
4. Install:
   - Android SDK Platform (latest version)
   - Android SDK Build-Tools
   - Android Emulator
5. Create a virtual device (AVD) via AVD Manager

**Then run:**
```bash
npm run android
```

## 🎯 Quick Start (No Simulator Needed)

For fastest prototyping without installing Xcode/Android Studio:

1. **Use the web version** (running now)
2. **Install Expo Go on your phone** and scan QR code from `npm start`

This lets you test on real devices without any additional setup!

## 📝 Editing Your App

- Edit `App.js` to modify the UI
- Changes auto-reload (hot reload)
- The app uses React Native components like `View`, `Text`, `TouchableOpacity`, `TextInput`

## 🔧 Useful Commands

```bash
npm start          # Start dev server with QR code
npm run web        # Open in web browser
npm run ios        # Open in iOS simulator (needs Xcode)
npm run android    # Open in Android emulator (needs Android Studio)
```

## 📚 Next Steps

1. Try the web version or install Expo Go on your phone
2. Edit `App.js` to customize the UI
3. Install Xcode/Android Studio when you're ready for simulator testing
4. Add more features to your prototype

## 🆘 Troubleshooting

- **Port already in use:** Kill the process with `lsof -ti:8081 | xargs kill`
- **Metro bundler issues:** Delete `node_modules` and run `npm install` again
- **Can't connect on phone:** Make sure phone and computer are on same WiFi network
