import React from 'react';

import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigator from './src/app/navigation/RootNavigator';
import { store, persistor } from '@/store/store';
import { useTheme } from '@/theme/hooks';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
};

const AppContent = () => {
  const safeAreaInsets = useSafeAreaInsets();
  const { mode, colors } = useTheme();

  const statusBarStyle = mode === 'dark' ? 'dark-content' : 'light-content';

  return (
    <>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={colors.headerBackground}
      />
      <View
        style={[
          styles.container,
          {
            paddingTop: safeAreaInsets.top,
            backgroundColor: colors.screenBackground,
          },
        ]}
      >
        <RootNavigator />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
