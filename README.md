# 🍋 Little Lemon · iOS Developer Capstone

A complete mobile restaurant menu project built with **React Native + Expo SDK 58**. It follows the Little Lemon peer-review rubric: three-page onboarding, a home screen based on the included wireframe, searchable and filterable menu, editable persistent profile, stack navigation, and full logout/reset.

## Project files

- **`design/wireframe-home.jpg`** — exported home-screen wireframe for peer review (JPG).
- `App.js` — root navigation, startup restoration, profile persistence and logout.
- `src/screens/OnboardingScreen.js` — onboarding pages 1/3, 2/3 and 3/3.
- `src/screens/HomeScreen.js` — header, hero with restaurant text and search, menu breakdown, dish list.
- `src/screens/ProfileScreen.js` — profile, validation, save, back and logout.
- `src/data/menu.js` — nine local dishes, five categories, search/filter logic.
- `assets/dishes/` — nine included original illustrated food images. No API key or internet connection required for menu assets.

## Run the project

You need **Node.js 22.13+** and npm. On macOS you may use Xcode/iOS Simulator; on Windows you can start the project and test on Android. Expo SDK 58 may require a development build for physical iPhone depending on Expo Go App Store availability.

```bash
npm install
npx expo install --fix
npx expo start
```

Then use **`i`** for iOS Simulator on Mac, **`a`** for Android emulator, or use a compatible Expo Go/development build to open the QR code. If the SDK-specific Expo Go application is not yet available on your iPhone, create a development build with EAS Build or use Xcode on Mac.

**To generate a native iOS Xcode project on macOS** (not committed by default):

```bash
npx expo prebuild --platform ios
npx expo run:ios
```

The repository intentionally uses Expo's managed-workflow source rather than checking generated `ios/` code into source control. You can commit the generated iOS project after prebuilding on a Mac if your instructor specifically requires the `.xcodeproj` file.

## Functional testing / peer-review checklist

1. On a fresh install (or after Log out), page **1/3** asks for first and last names. **Next** opens page **2/3**, which asks for email. **Next** opens page **3/3**, which asks for phone. Submit with valid values.
2. The **Home** screen opens and says hello to the user. It has header/avatar, green hero with Little Lemon description and **Search**, category navigation, and nine dish summaries with descriptions, prices, and images.
3. Try searching for `lemon` or `fish`; the visible list changes. Tap **Desserts** or **Drinks**; the chip visibly changes and the menu list filters. A search with no matches shows a reset button.
4. Tap the **avatar** to open **Profile** via stack navigation. All four fields contain the details entered during onboarding. Use the **Back** button to return to Home.
5. Edit a field and tap **Save changes**. Restart the app and reopen Profile: the updated value remains.
6. Tap **Log out**, then confirm. Stored profile details are removed, the onboarding flow reappears, and the old details do not repopulate the fields.
7. `design/wireframe-home.jpg` corresponds to the app Home screen sections and is included with the source in the same project ZIP/repository.

### Data and privacy

The app stores entered profile details **locally** in `@react-native-async-storage/async-storage` (unencrypted). The app does not send information to a backend. It is an educational capstone, not a production service. For production, use secure storage for sensitive information and a proper privacy policy.

### Improvement ideas

Add online ordering, dish details, allergies/dietary tags, real restaurant hours, accessibility testing, and integration with a live API.

## Submit

Create a new **public GitHub repository** (e.g. `little-lemon-ios-capstone`) and upload the contents of this project folder, including `design/wireframe-home.jpg`. In Coursera's **My submission** tab, use:

**Project Title:** Little Lemon iOS Developer Capstone

**URL:** `https://github.com/YOUR_USERNAME/little-lemon-ios-capstone` (replace with your real published repository URL).

After submission, peer-review two other submissions and give specific, honest observations about their behavior and design.

## Versions

- Expo SDK 58, React 19.3, React Native 0.88.
- Navigation: React Navigation native stack.
- Local persistence: AsyncStorage 2.2.0.

Note: installing and building native dependencies requires Internet access and an appropriate environment. Source files and local assets are included, but an iOS build was not executed when this package was created.
