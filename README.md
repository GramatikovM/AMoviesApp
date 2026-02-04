## AMoviesApp

A React Native client for browsing OMDb content. The app fetches curated movie/series sections, lets you inspect full details, and manage personal lists (Liked + Watchlist) with persistent storage. A global light/dark theme keeps the experience consistent across screens, and you can flip modes from the Account → Settings screen.

### Features

- **Home feed** — Config-driven sections (Trending, Action, Series, etc.) with infinite scrolling and skeleton loading.
- **Movie details** — Full OMDb metadata plus quick actions to like or add to your watchlist.
- **My Account** — Access liked titles, watchlist, and a Settings screen to toggle themes.
- **State & persistence** — Redux Toolkit + redux-persist keep catalogue data, likes, watchlist, and theme mode across app launches.

### Getting Started

> Requirements: Node 20+, Xcode/Android Studio, CocoaPods, and the OMDb API key in `.env` (`OMDB_API_KEY`, `OMDB_BASE_URL`).

1. **Install dependencies**
   ```sh
   npm install
   cd ios && pod install && cd ..
   ```
2. **Start Metro**
   ```sh
   npm start
   ```
3. **Run the app**
   ```sh
   npm run ios   # or npm run android
   ```

### Using the App

- Browse the Home feed to discover titles; tap a card to open details, long-press (in Liked/Watchlist) to remove.
- In details, tap the thumbs-up to toggle “Liked” or the plus/check to manage “My List”.
- Open the Account tab to access Watchlist, Liked Movies, or the Settings screen. Use the Light/Dark buttons there to swap themes instantly.

### Troubleshooting

- iOS build errors referencing `Pods-*.xcconfig` usually mean CocoaPods hasn’t been installed—run `cd ios && pod install`.
- If Metro or the native build hangs, clear caches (`npm start -- --reset-cache`, `rm -rf ios/Pods ios/Podfile.lock && pod install`) and retry.

### Contributing

1. Fork / branch from `main`.
2. Run `npm run lint` and `npm test` before opening a PR.
3. Include screenshots for UI changes, especially new screens or theme updates.
