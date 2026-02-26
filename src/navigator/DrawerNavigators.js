import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../constant/sizes';
import Drawer from '../component/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screen/HomeScreen';
import CustomDrawer from '../component/drawer';

const DrawerNavigators = () => {
    const DrawerNavigation = createDrawerNavigator();
    const firstScreen = 'PlaceholderScreen';
    return (
        <DrawerNavigation.Navigator
            drawerContent={props => <CustomDrawer  {...props} />}
            initialRouteName={'HomeScreen'}
            screenOptions={{
                headerShown: false,
                drawerStyle: {
                    width: '75%',
                    borderTopRightRadius: SIZES.padding,
                    borderBottomRightRadius: SIZES.padding,
                },
            }}>
            <DrawerNavigation.Screen name="HomeScreen" component={HomeScreen} />
            {/* <DrawerNavigation.Screen name={'RateScreen'} component={RateScreen} />
            <DrawerNavigation.Screen name="RideScreen" component={RideScreen} />
            <DrawerNavigation.Screen name="PaymentScreen" component={PaymentScreen} />
            <DrawerNavigation.Screen name="History" component={History} />
            <DrawerNavigation.Screen
                name="ReferFriendScreen"
                component={ReferFriendScreen}
            />
            <DrawerNavigation.Screen
                name="TermsAndConditions"
                component={TermsAndConditions}
            />
            <DrawerNavigation.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicy}
            />

            <DrawerNavigation.Screen name="MapScreen" component={MapScreen} />

            <DrawerNavigation.Screen
                name="RecieptScreen"
                component={SendTripRecieptScreen}
            />
            <DrawerNavigation.Screen
                name="PassengerDetails"
                component={PassengerDetails}
            /> */}

        </DrawerNavigation.Navigator>
    );
}

export default DrawerNavigators

const styles = StyleSheet.create({})