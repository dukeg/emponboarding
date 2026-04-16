# OnboardHub Android App - Build & Play Store Guide

## Overview

This guide explains how to build the OnboardHub application for Android and submit it to Google Play Store.

## Prerequisites

Before building for Android, ensure you have:

1. **Java Development Kit (JDK) 17+**
   ```bash
   java -version
   ```

2. **Android SDK**
   - Download Android Studio from https://developer.android.com/studio
   - Install Android SDK tools and emulator

3. **Expo Account**
   - Sign up at https://expo.dev
   - Install EAS CLI: `npm install -g eas-cli`

4. **Google Play Developer Account**
   - Create account at https://play.google.com/console
   - Pay $25 one-time registration fee
   - Agree to developer terms

## Step 1: Initialize EAS Build

```bash
cd /home/ubuntu/onboarding-app
eas init --id your-app-id
```

This creates `eas.json` configuration file.

## Step 2: Configure app.json for Android

Update `app.json` with Android-specific settings:

```json
{
  "expo": {
    "name": "OnboardHub",
    "slug": "onboarding-hub",
    "version": "2.0.0",
    "android": {
      "package": "com.dukeg.onboardinghub",
      "versionCode": 1,
      "permissions": [
        "INTERNET",
        "USE_BIOMETRIC",
        "USE_FINGERPRINT",
        "CAMERA",
        "READ_EXTERNAL_STORAGE",
        "WRITE_EXTERNAL_STORAGE"
      ],
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/android-icon-foreground.png",
        "backgroundImage": "./assets/images/android-icon-background.png",
        "monochromeImage": "./assets/images/android-icon-monochrome.png"
      }
    }
  }
}
```

## Step 3: Create Signing Key

Generate a keystore for signing your APK:

```bash
keytool -genkey -v -keystore onboarding-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias onboarding-key
```

Keep this keystore file safe! You'll need it for future updates.

## Step 4: Build for Android

### Option A: Build APK (for testing)
```bash
eas build --platform android --local
```

### Option B: Build AAB (for Play Store - recommended)
```bash
eas build --platform android
```

The AAB (Android App Bundle) format is required for Google Play Store.

## Step 5: Create Google Play Store Listing

1. Go to https://play.google.com/console
2. Create new app with name "OnboardHub"
3. Fill in required information:
   - Short description (80 chars)
   - Full description (4000 chars)
   - Screenshots (5-8 images)
   - Feature graphic (1024x500px)
   - App icon (512x512px)
   - Privacy policy URL
   - Contact email

### App Description Template

**Short Description:**
"AI-powered employee onboarding platform with biometric authentication, global operations, and real-time analytics."

**Full Description:**
"OnboardHub is a comprehensive employee onboarding solution designed for modern enterprises. Features include:

- AI-powered task recommendations and scheduling
- Biometric authentication (Face ID/Fingerprint)
- Multi-language support (20+ languages)
- Global timezone and currency management
- Platform integrations (Slack, Teams, Salesforce, Workday)
- Real-time progress tracking and analytics
- Document management and compliance
- Training schedule coordination
- Manager approval workflows

Perfect for HR teams managing distributed workforces across multiple regions."

## Step 6: Upload Build to Play Store

1. In Google Play Console, go to "Release" → "Production"
2. Click "Create new release"
3. Upload the AAB file from EAS build
4. Add release notes:
   ```
   Version 2.0.0 - Initial Release
   
   - Complete employee onboarding workflow
   - AI-powered task recommendations
   - Biometric authentication
   - Global operations support
   - Real-time analytics dashboard
   - Platform integrations
   ```

## Step 7: Content Rating

1. Fill out content rating questionnaire
2. Get rating for your app (usually G or PG)

## Step 8: Target Audience

Select appropriate target audience:
- Business apps (HR, Enterprise)
- Productivity apps
- Target regions: Global

## Step 9: Review and Submit

1. Review all information
2. Accept Google Play policies
3. Click "Submit for review"
4. Wait for approval (usually 24-48 hours)

## Step 10: Monitor Performance

After approval, monitor:
- Downloads and installs
- User ratings and reviews
- Crash reports
- Performance metrics

## Troubleshooting

### Build Fails
- Check Java version: `java -version` (need 17+)
- Clear cache: `eas build --platform android --clear-cache`
- Check internet connection

### Submission Rejected
- Review rejection reason in Play Console
- Common issues:
  - Privacy policy missing or incomplete
  - Misleading description
  - Permissions not justified
  - Content policy violations

### Biometric Not Working
- Ensure device has biometric capability
- Test on physical device or emulator with biometric support
- Check permissions in AndroidManifest.xml

## Publishing Updates

For future updates:

1. Update version in `app.json`
2. Increment `versionCode`
3. Build new AAB: `eas build --platform android`
4. Upload to Play Store
5. Create release notes
6. Submit for review

## Security Best Practices

- Keep keystore file secure and backed up
- Never commit keystore to version control
- Use environment variables for sensitive data
- Enable SSL pinning for API calls
- Implement proper error handling
- Test on real devices before submission

## Resources

- Expo Build Documentation: https://docs.expo.dev/build/setup/
- Google Play Console: https://play.google.com/console
- Android Developer Guide: https://developer.android.com/guide
- App Store Policies: https://play.google.com/about/developer-content-policy/

## Support

For issues with building or publishing:
- Check Expo documentation: https://docs.expo.dev
- Visit Google Play Help: https://support.google.com/googleplay
- Review app logs: `eas build:list`

---

**Version:** 2.0.0  
**Last Updated:** April 15, 2026  
**Status:** Ready for Production
