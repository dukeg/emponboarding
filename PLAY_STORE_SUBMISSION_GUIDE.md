# OnboardHub - Google Play Store Submission Guide

## Complete Step-by-Step Instructions

This guide provides detailed instructions for submitting OnboardHub to Google Play Store.

## Phase 1: Preparation (Before Building)

### 1.1 Create Google Play Developer Account

Visit https://play.google.com/console and create a developer account. The registration fee is $25 USD (one-time). You'll need a Google account and payment method.

### 1.2 Install Required Tools

Install the following tools on your development machine:

- Node.js 18+ and npm
- Java Development Kit (JDK) 17+
- Android SDK (via Android Studio)
- Expo CLI: `npm install -g eas-cli`

### 1.3 Prepare Assets

Create the following assets in the specified dimensions:

**App Icon (512x512px)** - Professional icon representing workflow and progress. Save as `assets/images/icon.png`.

**Feature Graphic (1024x500px)** - Marketing image showing key features. Used on Play Store listing.

**Screenshots (1080x1920px)** - 5-8 screenshots showing app features and user interface.

**Privacy Policy** - Write a comprehensive privacy policy explaining data collection and usage.

## Phase 2: Build Configuration

### 2.1 Update app.json

Configure the app for Android with package name `com.dukeg.onboardinghub`, version 2.0.0, and required permissions for biometric authentication, camera, and storage.

### 2.2 Create Signing Key

Generate a keystore file for signing your app:

```bash
keytool -genkey -v -keystore onboarding-release-key.keystore \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -alias onboarding-key
```

Store this file securely and never commit it to version control.

### 2.3 Initialize EAS Build

Run `eas init --id your-app-id` to initialize Expo Application Services. This creates the `eas.json` configuration file.

## Phase 3: Build for Android

### 3.1 Build Android App Bundle (AAB)

The AAB format is required for Google Play Store:

```bash
eas build --platform android
```

This builds the app in the cloud and generates an AAB file. The build process takes 10-30 minutes.

### 3.2 Download Build

Once the build completes, download the AAB file from the EAS build dashboard. You'll need this file for Play Store submission.

## Phase 4: Create Play Store Listing

### 4.1 Create New App

1. Go to https://play.google.com/console
2. Click "Create new app"
3. Enter app name: "OnboardHub"
4. Select category: Business
5. Confirm app is free

### 4.2 Fill App Details

**Store Listing:**
- Title: "OnboardHub"
- Short description: "AI-powered employee onboarding with biometric auth, global ops, and analytics"
- Full description: Comprehensive description of features and benefits (see GOOGLE_PLAY_STORE_LISTING.md)

**Graphics:**
- Upload app icon (512x512px)
- Upload feature graphic (1024x500px)
- Upload 5-8 screenshots (1080x1920px)

**Contact Details:**
- Support email: support@onboardhub.app
- Privacy policy URL: https://github.com/dukeg/emponboarding/blob/main/PRIVACY_POLICY.md
- Website: https://github.com/dukeg/emponboarding

### 4.3 Content Rating

Complete the content rating questionnaire. For a business app, you'll typically receive a G (General Audiences) rating. Answer all questions honestly about content, violence, sexual content, profanity, and other mature themes.

### 4.4 Target Audience

Select target audience as Business or Productivity app. Choose target regions (recommend Global for worldwide distribution).

## Phase 5: Upload Build

### 5.1 Go to Release Section

In Google Play Console, navigate to "Release" → "Production".

### 5.2 Create New Release

Click "Create new release" and upload your AAB file.

### 5.3 Add Release Notes

Add version 2.0.0 release notes describing features and improvements:

"Initial Release - Complete employee onboarding workflow automation with AI-powered task recommendations, biometric authentication, multi-language support (20+ languages), global timezone and currency management, real-time analytics, platform integrations (Slack, Teams, Salesforce, Workday, Google Workspace, Microsoft 365, Zoom, Jira), and manager approval workflows."

### 5.4 Review and Submit

Review all information carefully. Ensure all required fields are filled. Accept Google Play policies and click "Submit for review".

## Phase 6: Review Process

### 6.1 Wait for Approval

Google typically reviews apps within 24-48 hours. You'll receive email notifications about the review status.

### 6.2 Address Feedback

If your app is rejected, carefully review the rejection reason. Common issues include missing privacy policy, misleading description, unjustified permissions, or content policy violations. Fix the issues and resubmit.

### 6.3 Approval

Once approved, your app becomes available on Google Play Store. It may take a few hours for the app to appear in search results.

## Phase 7: Post-Launch

### 7.1 Monitor Performance

Track key metrics in Google Play Console:
- Downloads and installs
- Uninstalls and crashes
- User ratings and reviews
- Performance metrics

### 7.2 Respond to Reviews

Respond professionally to user reviews. Address negative feedback and thank users for positive reviews.

### 7.3 Plan Updates

Monitor user feedback and plan updates to fix bugs and add features. Each update requires incrementing the version code and resubmitting to Play Store.

## Important Considerations

**Permissions:** Justify every permission your app requests. Unjustified permissions are a common rejection reason.

**Privacy Policy:** Ensure your privacy policy is complete and accessible. Missing or incomplete privacy policies cause rejections.

**Testing:** Test thoroughly on multiple Android devices before submission. Crashes and ANRs are common rejection reasons.

**Compliance:** Ensure your app complies with Google Play policies. Review https://play.google.com/about/developer-content-policy/ before submission.

**Security:** Keep your signing key secure. Never commit it to version control. Use environment variables for sensitive data.

## Troubleshooting

**Build Fails:** Check Java version (need 17+), verify internet connection, clear cache with `eas build --platform android --clear-cache`.

**Submission Rejected:** Review rejection reason carefully. Common issues include missing privacy policy, misleading description, unjustified permissions, content policy violations, or app crashes.

**App Crashes:** Test on multiple devices and Android versions. Fix bugs before resubmitting. Check crash reports in Play Console.

**Low Ratings:** Monitor user reviews and address issues quickly. Respond to negative feedback professionally.

## Resources

- Google Play Console: https://play.google.com/console
- Expo Build Documentation: https://docs.expo.dev/build/setup/
- Android Developer Guide: https://developer.android.com/guide
- Google Play Policies: https://play.google.com/about/developer-content-policy/
- App Store Optimization: https://support.google.com/googleplay/android-developer

## Support

For technical issues, consult Expo documentation at https://docs.expo.dev. For Play Store issues, visit Google Play Help at https://support.google.com/googleplay. Review app logs with `eas build:list` for build-related issues.

---

**Version:** 2.0.0  
**Status:** Ready for Submission  
**Last Updated:** April 15, 2026
