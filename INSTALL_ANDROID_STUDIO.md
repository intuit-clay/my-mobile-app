# Installing Android Studio for Android Emulator

## Current Status
Android Studio is **NOT installed** on your system.

## Installation Steps

### 1. Download Android Studio
1. Visit [developer.android.com/studio](https://developer.android.com/studio)
2. Click **Download Android Studio**
3. Accept the terms and download the Mac version
4. Wait for download to complete (~1GB)

### 2. Install Android Studio
1. Open the downloaded `.dmg` file
2. Drag **Android Studio** to your **Applications** folder
3. Launch Android Studio from Applications
4. Follow the setup wizard:
   - Choose "Standard" installation
   - Accept all license agreements
   - Wait for SDK components to download (~3-5GB)

### 3. Install Android SDK Components
In Android Studio:
1. Go to **Settings/Preferences** → **Appearance & Behavior** → **System Settings** → **Android SDK**
2. In the **SDK Platforms** tab, install:
   - Latest Android version (Android 14 or 15)
3. In the **SDK Tools** tab, ensure these are checked:
   - Android SDK Build-Tools
   - Android Emulator
   - Android SDK Platform-Tools
   - Intel x86 Emulator Accelerator (if Intel Mac) or Android Emulator hypervisor driver (if M1/M2/M3 Mac)
4. Click **Apply** and wait for installation

### 4. Set Up Environment Variables
Add to your `~/.zshrc` file:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
```

Then reload:
```bash
source ~/.zshrc
```

### 5. Create a Virtual Device (AVD)
1. In Android Studio, click **More Actions** → **Virtual Device Manager**
2. Click **Create Device**
3. Select a device (e.g., **Pixel 7**)
4. Select a system image (e.g., **Android 14** - choose one with Google Play)
5. Download the system image if needed
6. Click **Finish**

### 6. Test with Your App
Once setup is complete, run:
```bash
cd my-mobile-app
npm run android
```

This will:
- Launch the Android Emulator
- Build your app
- Install and open your app in the emulator

## Alternative: Use Physical Android Phone
If you have an Android phone, you don't need Android Studio for basic testing:

1. Install **Expo Go** from Google Play Store on your phone
2. Run `npm start` in your project
3. Scan the QR code with the Expo Go app
4. Your app opens in Expo Go

## Verify Installation
Check if everything is installed correctly:
```bash
adb --version           # Should show Android Debug Bridge version
emulator -list-avds     # Should list your virtual devices
```

## Troubleshooting

### "adb not found"
Make sure you added the paths to your `~/.zshrc` and ran `source ~/.zshrc`

### "No emulators found"
Create a virtual device using AVD Manager in Android Studio

### Emulator is slow
- For M1/M2/M3 Macs: Use ARM64 system images
- For Intel Macs: Enable Intel HAXM in SDK Tools
- Allocate more RAM to the emulator in AVD settings

### Build fails
Try:
```bash
cd android
./gradlew clean
cd ..
npm run android
```

## System Requirements
- macOS 10.14 or later
- At least 8GB RAM (16GB recommended)
- At least 10GB free disk space
