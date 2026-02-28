import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './screen/LoginScreen';
import navigationServices from './navigator/navigationServices';
import SignupScreen from './screen/SignupScreen';
import ForgetPassword from './screen/ForgetPassword';
import OtpScreen from './screen/OtpScreen';
import ResetPassword from './screen/ResetPassword';
import DrawerNavigators from './navigator/DrawerNavigators';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer ref={navigationServices.navigationRef}>
      <Stack.Navigator
        initialRouteName="LoginScreen"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="DrawerNavigators" component={DrawerNavigators} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
