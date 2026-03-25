# Quick Reference Guide

## 🎯 Your App is Running!

**Web Version:** http://localhost:8081

## Common Commands

```bash
# Start development server (for phone testing)
npm start

# Start web version (browser)
npm run web

# Start iOS simulator (needs Xcode)
npm run ios

# Start Android emulator (needs Android Studio)
npm run android

# Install new packages
npm install package-name

# Clear cache if something breaks
npm start -- --clear
```

## 📱 Testing on Your Phone (No Simulator Needed!)

### For iPhone:
1. Install "Expo Go" from App Store
2. Run `npm start` in terminal
3. Scan QR code with Camera app
4. App opens in Expo Go

### For Android:
1. Install "Expo Go" from Google Play
2. Run `npm start` in terminal
3. Scan QR code with Expo Go app
4. App opens in Expo Go

## 🎨 Customizing Your App

Edit `App.js` to change:
- UI layout and styling
- App functionality
- Colors, fonts, spacing
- Add new features

Changes auto-reload when you save!

## 📦 Adding Features

### Navigation (multiple screens)
```bash
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context
```

### Icons
```bash
npx expo install @expo/vector-icons
```

### Storage (save data)
```bash
npx expo install @react-native-async-storage/async-storage
```

### Camera
```bash
npx expo install expo-camera
```

## 🐛 Troubleshooting

### Port already in use
```bash
lsof -ti:8081 | xargs kill -9
```

### App won't reload
```bash
npm start -- --clear
```

### Need to reinstall
```bash
rm -rf node_modules package-lock.json
npm install
```

## 📖 Documentation Links

- [Expo Docs](https://docs.expo.dev/)
- [React Native Components](https://reactnative.dev/docs/components-and-apis)
- [React Hooks](https://react.dev/reference/react)

## 🎓 What You Have Now

- ✅ Working React Native app
- ✅ Web version running
- ✅ Task list prototype with add/complete/delete
- ✅ Modern UI with styling
- ✅ Hot reload enabled
- ⏳ Xcode (for iOS simulator) - not installed yet
- ⏳ Android Studio (for Android emulator) - not installed yet

## 🚀 Recommended Next Steps

1. **Test now:** Open http://localhost:8081 in your browser
2. **Install Expo Go** on your phone for real mobile testing
3. **Edit App.js** to customize your prototype
4. **Install Xcode/Android Studio** later when you need simulators
