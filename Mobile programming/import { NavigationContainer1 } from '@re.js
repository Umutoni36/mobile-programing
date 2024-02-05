import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators } from "@react-navigation/stack";
import React from 'react';
import {
  Easing,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ImageBackground } from 'react-native';
import Home from './src/screens/Home.jpeg';
import ScreenA from './src/screens/ScreenA.jpeg';
import ScreenB from './src/screens/ScreenB.jpeg';
import ScreenC from './src/screens/ScreenC.jpeg';
import ScreenD from './src/screens/ScreenD.jpeg';
import ScreenE from './src/screens/ScreenE.jpeg';

const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 200,
    easing: Easing.linear,
  }
}

const customTransition = {
  gestureEnabled: true,
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            })
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "0deg"],
            }),
          },
          {
            scale: next ?
              next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.7],
              }) : 1,
          }
        ]
      },
      opacity: current.opacity,
    }
  }
}

const AppStack = () => {
  return (
    <Stack.Navigator
      // apply for all screen
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
      }}
      // headerMode="none"
    >
      <Stack.Screen
        name="Home"
        component={() => (
          <ImageBackground source={require('./src/screens/Home.jpeg')} style={styles.imageBackground} />
        )}
      />
      <Stack.Screen
        name="ScreenA"
        component={() => (
          <ImageBackground source={require('./src/screens/ScreenA.jpeg')} style={styles.imageBackground} />
        )}
        options={{
          gestureDirection: 'vertical',
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
        }}
      />
      <Stack.Screen
        name="ScreenB"
        component={() => (
          <ImageBackground source={require('./src/screens/ScreenB.jpeg')} style={styles.imageBackground} />
        )}
        options={{
          transitionSpec: {
            open: config,
            close: closeConfig,
          },
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}
      />
      <Stack.Screen
        name="ScreenC"
        component={() => (
          <ImageBackground source={require('./src/screens/ScreenC.jpeg')} style={styles.imageBackground} />
        )}
        options={{
          ...customTransition,
        }}
      />
      <Stack.Screen
        name="ScreenD"
        component={() => (
          <ImageBackground source={require('./src/screens/ScreenD.jpeg')} style={styles.imageBackground} />
        )}
        options={{
          gestureDirection: 'vertical',
          cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS,
        }}
      />
      <Stack.Screen
        name="ScreenE"
        component={() => (
          <ImageBackground source={require('./src/screens/ScreenE.jpeg')} style={styles.imageBackground} />
        )}
        options={{
          gestureDirection: 'vertical-inverted',
          cardStyleInterpolator: CardStyleInterpolators.forRevealFromBottomAndroid,
        }}
      />
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

const App = () => {

  return (
    <NavigationContainer>
      <AppStack />
    </NavigationContainer>
  );
};

export default App;