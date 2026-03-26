# Biometric Authentication Guide

## Overview

The Employee Onboarding App (OnboardHub) includes built-in biometric authentication support for Face ID (iOS) and Fingerprint (Android/iOS). This guide explains how the biometric system works and how to use it.

## Features

### 1. Biometric Authentication Context (`lib/biometric-context.tsx`)

The biometric authentication system is managed through a React Context that provides:

- **Device Capability Detection**: Automatically detects if the device supports biometric authentication
- **Biometric Type Identification**: Determines whether the device uses Face ID or Fingerprint
- **Enrollment Status**: Checks if the user has enrolled biometric data on their device
- **Secure Storage**: Uses `AsyncStorage` to store biometric preferences
- **Error Handling**: Comprehensive error handling for various authentication scenarios

### 2. Biometric Login Screen (`app/login-biometric.tsx`)

An enhanced login screen that offers:

- **Biometric-First Option**: If enabled, users can sign in with a single tap using Face ID or Fingerprint
- **Password Fallback**: Users can always fall back to traditional email/password login
- **Device Detection**: Shows appropriate UI based on device biometric capabilities
- **Setup Prompts**: Guides users to enable biometric authentication if not already set up
- **Error Messages**: Clear feedback for authentication failures

### 3. Biometric Settings Screen (`app/(tabs)/biometric-settings.tsx`)

A dedicated settings screen where users can:

- **Enable/Disable Biometric**: Toggle biometric authentication on or off
- **View Device Info**: See device compatibility and biometric enrollment status
- **Learn Benefits**: Understand the advantages of biometric authentication
- **Privacy Information**: Understand how biometric data is handled securely

## How It Works

### Authentication Flow

```
User Opens App
    ↓
Check if Biometric is Enabled
    ↓
    ├─ YES → Attempt Biometric Authentication
    │         ├─ Success → Login & Navigate to Dashboard
    │         └─ Failure → Show Password Login Option
    │
    └─ NO → Show Standard Login Screen
            ├─ Email/Password Login
            └─ Biometric Setup Option
```

### Biometric Authentication Process

1. **Device Check**: The app checks if the device has biometric hardware
2. **Enrollment Verification**: Confirms that the user has enrolled biometric data
3. **Authentication Request**: Prompts the user to authenticate using Face ID or Fingerprint
4. **Secure Validation**: The authentication happens locally on the device (never sent to servers)
5. **Session Creation**: Upon success, the app creates a user session

### Error Handling

The system handles various error scenarios:

| Error | Cause | Solution |
|-------|-------|----------|
| `user_cancel` | User dismissed the authentication prompt | Try again or use password login |
| `system_cancel` | System cancelled the authentication | Device may have been locked; try again |
| `app_cancel` | App cancelled the authentication | Try again |
| `not_enrolled` | No biometric data enrolled on device | Set up Face ID or Fingerprint in device settings |
| `authentication_failed` | Authentication failed (e.g., face not recognized) | Try again or use password login |

## Implementation Details

### BiometricProvider Setup

The biometric system is initialized in the app layout (`app/_layout.tsx`):

```tsx
<BiometricProvider>
  <AuthProvider>
    <OnboardingProvider>
      {/* App content */}
    </OnboardingProvider>
  </AuthProvider>
</BiometricProvider>
```

### Using Biometric Context

Components can access biometric functionality using the `useBiometric()` hook:

```tsx
import { useBiometric } from '@/lib/biometric-context';

export function MyComponent() {
  const {
    availability,           // Device capability info
    isBiometricEnabled,    // Whether user enabled biometric
    isAuthenticating,      // Currently authenticating
    error,                 // Error message if any
    authenticateWithBiometric,  // Authenticate with biometric
    enableBiometric,       // Enable biometric
    disableBiometric,      // Disable biometric
  } = useBiometric();

  // Use the hook...
}
```

### Biometric Availability Object

```tsx
interface BiometricAvailability {
  available: boolean;           // Device supports biometric & user enrolled
  compatible: boolean;          // Device has biometric hardware
  biometryType: AuthenticationType | null;  // FACIAL_RECOGNITION or FINGERPRINT
  enrolled: boolean;            // User has enrolled biometric data
}
```

## Security Considerations

### Local Processing

All biometric authentication happens locally on the device. The biometric data itself is never transmitted to the server. Only the authentication result (success/failure) is used to establish a user session.

### Secure Storage

Biometric preferences are stored in `AsyncStorage`, which provides:

- Device-level encryption on iOS (Keychain)
- Device-level encryption on Android (Keystore)
- No sensitive data is stored in plain text

### Fallback Authentication

Users can always fall back to password-based authentication if:

- Biometric authentication fails
- The device doesn't support biometric authentication
- The user prefers password authentication

## Testing Biometric Authentication

### On Physical Devices

1. **iOS**: Use Face ID or Touch ID on iPhone/iPad
2. **Android**: Use fingerprint scanner or face unlock if available

### In Simulators/Emulators

- **iOS Simulator**: Simulate biometric authentication through Xcode
- **Android Emulator**: Use the emulator's biometric simulation features
- **Web**: Biometric features are not available in web browsers

### Testing Scenarios

1. **Successful Authentication**: Device recognizes biometric
2. **Failed Authentication**: Device rejects biometric (e.g., wrong fingerprint)
3. **Cancelled Authentication**: User cancels the authentication prompt
4. **No Biometric Enrolled**: Device has no biometric data enrolled
5. **Device Lock**: Device is locked during authentication attempt

## User Experience Best Practices

### For First-Time Users

1. Users see the login screen
2. If biometric is available, they see an option to enable it
3. They can set up biometric authentication before first login
4. They can always use password login as a fallback

### For Returning Users

1. If biometric is enabled, they see a "Sign in with Face ID/Fingerprint" button
2. One tap authenticates them
3. If biometric fails, they can use password login
4. They can manage biometric settings in the app

### Accessibility

- Clear labels for biometric buttons
- Descriptive error messages
- Always provide password login fallback
- Settings are easily accessible

## Troubleshooting

### "Biometric not available on this device"

**Cause**: Device doesn't have biometric hardware or user hasn't enrolled biometric data

**Solution**: 
- Ensure device has Face ID or fingerprint scanner
- Enroll biometric data in device settings
- Use password login as alternative

### "Authentication failed"

**Cause**: Device couldn't recognize biometric (e.g., dirty sensor, wrong face angle)

**Solution**:
- Try again with clean sensor or proper face angle
- Use password login
- Check device settings for biometric configuration

### "Too many failed attempts"

**Cause**: Multiple failed biometric authentication attempts

**Solution**:
- Wait a few minutes before trying again
- Use password login instead
- Check device settings

## Future Enhancements

Potential improvements to the biometric system:

1. **Biometric Enrollment Flow**: In-app biometric setup wizard
2. **Multi-Factor Authentication**: Combine biometric with password for sensitive operations
3. **Biometric Timeout**: Auto-lock after period of inactivity
4. **Biometric Audit Log**: Track biometric authentication attempts
5. **Device Binding**: Link biometric to specific device for security
6. **Adaptive Authentication**: Adjust security based on risk level

## References

- [Expo Local Authentication Documentation](https://docs.expo.dev/modules/local-authentication/)
- [iOS Face ID & Touch ID Guidelines](https://developer.apple.com/design/human-interface-guidelines/authentication/overview/face-id-and-touch-id/)
- [Android Biometric API](https://developer.android.com/training/sign-in/biometric-auth)
