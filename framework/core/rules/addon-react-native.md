---
trigger: model_decision
description: Apply this rule on React Native projects using Expo
---

# React Native + Expo Best Practices

## Project Structure

```
src/
  components/         # Reusable UI components
  screens/            # Screen components (route endpoints)
  navigation/         # Navigators configuration
  hooks/              # Custom React hooks
  utils/              # Pure utility functions
  services/           # API clients and external services
  types/              # TypeScript types/interfaces
  assets/             # Fonts, images, etc.
```

- Use **absolute imports** with path aliases (`@/components`, `@/hooks`, etc.).
- Keep screens in `src/screens/` with minimal coupling.
- Organize navigators under `src/navigation/`.

## Tech Stack (Recommended)

| Component       | Recommended Choice                               |
|-----------------|--------------------------------------------------|
| Framework       | React Native (functional components + hooks)     |
| Runtime         | Expo SDK                                         |
| Language        | TypeScript                                       |
| Navigation      | React Navigation                                 |
| Styling         | StyleSheet (or light styled-components)          |
| Icons           | Expo Vector Icons                                |
| Secure Storage  | Expo SecureStore                                 |
| Offline Support | AsyncStorage + Query Caching (e.g., React Query) |
| OTA Updates     | Expo OTA Updates                                 |

## Best Practices

- Use **functional components with React Hooks**.
- Leverage **Expo SDK APIs** whenever possible.
- Implement navigation using **React Navigation**.
- Use **Expo's asset system** for fonts and images.
- Add **error boundaries** and crash reporting.
- Integrate **push notifications** via Expo.
- Use **TypeScript** for strict typing.
- Apply **StyleSheet** for consistent styling.
- Use **Expo Vector Icons** for icons.
- Store sensitive data securely with **Expo SecureStore**.
- Implement **offline support and caching**.
- Follow **React Native performance best practices**.

## What to Avoid

- Class components.
- Non-Expo APIs when an Expo alternative exists.
- Logging secrets or sensitive info.
- Heavy synchronous work on the UI thread.

## Performance Tips

- Use `useMemo` and `useCallback` to prevent unnecessary re-renders.
- Wrap pure UI components with `React.memo`.
- Optimize lists using `keyExtractor`, `getItemLayout`, and `windowSize`.
- Lazy load heavy screens and code-split routes.
- Pass stable props and avoid inline objects or functions.

## Navigation

- Type route parameters (`RootStackParamList`).
- Organize navigators under `src/navigation/`.
- Keep screens in `src/screens/` with minimal coupling.
- Support **deep linking** if relevant.

## Asset Management

- Preload fonts and images using `Asset` and `Font` APIs.
- Use `require()` or static `import` for proper bundling.
- Support multiple scales (`@2x`, `@3x`).

## Security Guidelines

- Keep **all tokens and secrets** in SecureStore only.
- Never commit credentials to the repository.
- Validate all API inputs and outputs.
- Use **HTTPS/TLS** for all network requests.

## Testing & Quality

- Use **ESLint + Prettier + TypeScript strict mode**.
- Add unit tests for hooks and utils (Jest or React Testing Library).
- Measure list and screen performance for large datasets.

## Code Style Reference

### Component Example

```tsx
// src/components/ButtonPrimary.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonPrimaryProps = {
  label: string;
  onPress: () => void;
  disabled?: boolean;
};

export const ButtonPrimary: React.FC<ButtonPrimaryProps> = ({ 
  label, 
  onPress, 
  disabled 
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabled]}
      onPress={onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  label: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  disabled: {
    opacity: 0.6,
  },
});
```

### Hook Example

```tsx
// src/hooks/useOnlineStatus.ts
import { useState, useEffect } from "react";
import NetInfo from "@react-native-community/netinfo";

export const useOnlineStatus = () => {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsOnline(!!state.isConnected);
    });
    return () => unsubscribe();
  }, []);

  return isOnline;
};
```

### Import Guidelines

- Use **absolute imports**:

  ```tsx
  import { ButtonPrimary } from "@/components/ButtonPrimary";
  ```

- Group imports in this order:
  1. React and React Native core
  2. Third-party packages
  3. Internal modules (`@/components`, `@/hooks`, `@/utils`)

- Always use **named exports** (no default exports).
- Use **2-space indentation** and trailing commas.
- Prefer **const assertions** and explicit return types.
