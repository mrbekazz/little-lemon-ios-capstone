# Peer-review verification sheet

| Evaluation item | Where / how to verify |
| --- | --- |
| Home screen wireframe | `design/wireframe-home.jpg` |
| First-open onboarding | Clear app data and launch → `OnboardingScreen` |
| Onboarding 3 pages / Next | Follow page 1/3 → 2/3 → 3/3, then submit |
| Home 4 sections | `HomeScreen`: header, hero, menu breakdown, food menu list |
| Onboarding data visible in Profile | Home avatar → Profile |
| Saved profile persists after restart | Edit Profile → Save changes → relaunch app |
| Log out clears data | Profile → Log out → Confirm → blank onboarding |
| Stack navigation / Back | Home → Profile → Back |
| Restaurant description + search bar | Green Home hero |
| Selectable categories | All, Starters, Mains, Desserts, Drinks; selected chip changes color |
| Menu summary list | Nine items with image, title, description, category and price |
| Suggested improvement | Online ordering, item details, dietary filters and API |

## Notes for fair evaluation

An installation and functional test on an iPhone/iOS Simulator is necessary for actual runtime verification. Source-level structure and syntax checks alone cannot establish that the app has run successfully in an iOS environment.
