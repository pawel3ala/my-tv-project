# Expo Router TV demo 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

This project uses

- the [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos), which supports both phone (Android and iOS) and TV (Android TV and Apple TV) targets
- the [React Native TV config plugin](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv) to allow Expo prebuild to modify the project's native files for TV builds

## 🚀 How to use

- `cd` into the project

- For TV development:

```sh
yarn
yarn prebuild:tv # Executes clean Expo prebuild with TV modifications
yarn ios # Build and run for Apple TV
yarn android # Build for Android TV
yarn web # Run the project on web from localhost
```
- For mobile development:

```sh
yarn
yarn prebuild # Executes Expo prebuild with no TV modifications
yarn ios # Build and run for iOS
yarn android # Build for Android mobile
yarn web # Run the project on web from localhost
```

> **_NOTE:_**
> Setting the environment variable `EXPO_TV=1` enables the `@react-native-tvos/config-tv` plugin to modify the project for TV.
> This can also be done by setting the parameter `isTV` to true in the `app.json`.

## Development

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

This project includes a [demo](./components/EventHandlingDemo.tsx) showing how to use React Native TV APIs to highlight controls as the user navigates the screen with the remote control.

## Deploy

Deploy on all platforms with Expo Application Services (EAS).

- Deploy the website: `npx eas-cli deploy` — [Learn more](https://docs.expo.dev/eas/hosting/get-started/)
- Deploy on iOS and Android using: `npx eas-cli build` — [Learn more](https://expo.dev/eas)

## TV specific file extensions

This project includes an [example Metro configuration](./metro.config.js) that allows Metro to resolve application source files with TV-specific code, indicated by specific file extensions (`*.ios.tv.tsx`, `*.android.tv.tsx`, `*.tv.tsx`).

## Info

1. Project scafolding & boilerplate code - https://docs.expo.dev/guides/building-for-tv/

2. In expo project, prettier and linter is not fully setup out of the box, so I took care of it

3. When it comes to `Image` component I decided to use `expo-image` instead of the one available in core `react-native` library. The former supports image caching, the latter doesn't

4. I burned quite a bit of time figuring out why I am not able to render an image - it has turned out that my Android TV simulator didn't have internet connection
That's not all, after restoring wifi I still was not able to render any image or run any video, I was getting w weird error

```
LOG  error {"error": "Failed to load resource
There was 1 root cause:
javax.net.ssl.SSLHandshakeException(Chain validation failed)", "target": 88}
```

Took some time to identify that my date on simulator was not correct, which caused the SSL certificate to be expired, hence I was unable to connect with any server to get any data
I had to wipe out all the simulator data and restore factory default settings

5. Extracted data fetching part to a hook (that also simulates data fetching error)

## Unfinished tasks

I didn't had a chance to fully dig into how to properly do an e2e test utilising a d-pad on Android TV