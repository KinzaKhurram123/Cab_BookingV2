import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import LoginScreen from './screen/LoginScreen';
import SignupScreen from './screen/SignupScreen';
import ForgetPassword from './screen/ForgetPassword';
import OtpScreen from './screen/OtpScreen';
import ResetPassword from './screen/ResetPassword';
import DrawerNavigators from './navigator/DrawerNavigators';
import RideBooking from './screen/RideBooking';
import SetRoutes from './screen/SetRoute';
import RideDetails from './screen/RideDetails';
import ConfirmBooking from './screen/confirmBooking';
import ChooseVechicle from './screen/chooseVechicle';
import AcceptRideRequest from './screen/acceptRideRequest';
import ThemeSettings from './screen/ThemeSetting';
import SelectUserTypeScreen from './screen/SelectUserTypeScreen';
import navigationServices from './navigator/navigationServices';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const token = useSelector(state => state.authReducer.token);
  console.log('Token updated:', token);
  const firstScreen = token == null ? 'LoginScreen' : 'DrawerNavigators';

  return (
    <NavigationContainer ref={navigationServices.navigationRef}>
      <Stack.Navigator
        initialRouteName={firstScreen}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="ChooseVechicle" component={ChooseVechicle} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="DrawerNavigators" component={DrawerNavigators} />
        <Stack.Screen name="RideBooking" component={RideBooking} />
        <Stack.Screen name="SetRoutes" component={SetRoutes} />
        <Stack.Screen name="RideDetails" component={RideDetails} />
        <Stack.Screen name="ConfirmBooking" component={ConfirmBooking} />
        <Stack.Screen name="AcceptRideRequest" component={AcceptRideRequest} />
        <Stack.Screen name="ThemeSettings" component={ThemeSettings} />
        <Stack.Screen
          name="SelectUserTypeScreen"
          component={SelectUserTypeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
