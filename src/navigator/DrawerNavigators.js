import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SIZES } from '../constant/sizes';
import Drawer from '../component/drawer';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screen/HomeScreen';
import CustomDrawer from '../component/drawer';
import WalletScreen from '../screen/WalletScreen';
import HistoryScreen from '../screen/HistoryScreen';
import ChangeScreen from '../screen/ChangeScreen';

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
            <DrawerNavigation.Screen name="WalletScreen" component={WalletScreen} />
            <DrawerNavigation.Screen name="HistoryScreen" component={HistoryScreen} />
            <DrawerNavigation.Screen name="ChangeScreen" component={ChangeScreen} />
        </DrawerNavigation.Navigator>
    );
}

export default DrawerNavigators

const styles = StyleSheet.create({})