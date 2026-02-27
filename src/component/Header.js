import { useNavigation } from '@react-navigation/native';
import { Icon } from 'native-base';
import React, { useState } from 'react';
import {
    Alert,
    Platform,
    StyleSheet,
    ToastAndroid,
    View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import CustomImage from '../component/customImage';
import CustomText from '../component/customText';
import Colors from '../config/appTheme';
import { SIZES } from '../constant/sizes';
import navigationServices from '../navigator/navigationServices';

const Header = props => {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.commonReducer.notification);
    const riderEvent = useSelector(state => state.commonReducer.riderEventData);
    const cartData = useSelector(state => state.commonReducer.cart);
    const navigationN = useNavigation();
    const [isModalVisible, setModalVisible] = useState(false);
    const {
        title,
        showBack,
        showList,
        headerColor,
        titleColor,
        close,
        navigateTO,
        index,
        cart,
        Notify,
        hideUser,
        navigation,
        textstyle,
        isGredient = false
    } = props;

    const [searchText, setSearchText] = useState('');
    const user_type = useSelector(state => state.authReducer.user_type);
    const user = useSelector(state => state.commonReducer.userData);
    const userRole = useSelector(state => state.commonReducer.selectedRole);
    const token = useSelector(state => state.authReducer.token);
    const [currentPossition, setcurrentPossition] = useState({});
    const [time, setTime] = useState(0);
    const statusArray = [
        { label: 'Change Password', value: 'ChangePassword' },
        { label: 'Terms & Conditions', value: 'TermsAndConditions' },
        { label: 'Financial Breakdown', value: 'FinancialBreakDown' },
        { label: 'Logout', value: 'Logout' },
    ];

    const renderLeftIcon = () => (
        <View
            style={{
                height: SIZES.h26,
                width: SIZES.h26,
                borderRadius: SIZES.h10,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {showBack ? (
                <Icon
                    name={'arrow-back'}
                    as={Ionicons}
                    size={SIZES.h24 + 10}
                    color={Colors.black}
                    onPress={() => {
                        navigationN.goBack();
                    }}
                />
            ) : (
                <Icon
                    style={[styles.menu, styles.shadowporp]}
                    name={'menu'}
                    as={Feather}
                    size={SIZES.h24}
                    color={Colors.black}
                    onPress={() => {
                        navigationN.toggleDrawer();
                    }}
                />
            )}
        </View>
    );

    const renderCenter = () => (
        title ? (
            <CustomText style={[styles.text, textstyle]} isBold>
                {title}
            </CustomText>
        ) : (
            <CustomImage
                resizeMode={'contain'}
                style={{
                    width: SIZES.windowWidth * 0.21,
                    height: SIZES.windowHeight * 0.05,
                }}
            // source={require('../Assets/Images/customerservice.png')}
            />
        )
    );

    const renderRightIcon = () => (
        !hideUser && cart ? (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingTop: SIZES.h10,
                }}>
                {cartData?.length > 0 && (
                    <View
                        style={{
                            width: SIZES.h14,
                            height: SIZES.h14,
                            borderRadius: SIZES.font,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: 'red',
                            position: 'absolute',
                            right: -4,
                            zIndex: 1,
                            top: 0,
                        }}>
                        <CustomText
                            style={{
                                fontSize: 8,
                            }}>
                            {cartData?.length < 10 ? cartData?.length : '9+'}
                        </CustomText>
                    </View>
                )}

                <Icon
                    name={'shopping-cart'}
                    as={Feather}
                    size={SIZES.h14}
                    color={Colors.black}
                    onPress={() => {
                        if (token == null) {
                            Confirm();
                        } else if (cartData?.length > 0) {
                            navigationServices.navigate('CartScreen');
                        } else {
                            return Platform.OS == 'android'
                                ? ToastAndroid.show('No Item in cart', ToastAndroid.SHORT)
                                : Alert('No Item in cart');
                        }
                    }}
                />
            </View>
        ) : (
            <View
                style={{
                    width: SIZES.windowHeight * 0.045,
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: SIZES.windowHeight * 0.045,
                    // backgroundColor: '#dedbdbc8',
                    borderRadius: (SIZES.windowHeight * 0.045) / 2,
                }}>
                {/* Empty view or placeholder */}
            </View>
        )
    );

    return (
        <>
            {isGredient ? (
                <LinearGradient
                    style={[styles.header2, index && { zIndex: 1 }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={headerColor ? headerColor : Colors.themegredient}>
                    {renderLeftIcon()}
                    {renderCenter()}
                    {renderRightIcon()}
                </LinearGradient>
            ) : (
                <View style={[styles.header2, index && { zIndex: 1, backgroundColor: headerColor ? headerColor : Colors.themeColor }]}>
                    {renderLeftIcon()}
                    {renderCenter()}
                    {renderRightIcon()}
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    header1: {
        width: SIZES.windowWidth,
        height: SIZES.windowHeight * 0.1,
        backgroundColor: Colors.white,
        marginBottom: SIZES.base,
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    user_name: {
        fontSize: SIZES.h20,
        color: Colors.blue,
    },
    text: {
        fontSize: SIZES.h18,
        color: Colors.black,
    },
    menu: {
        height: SIZES.windowHeight * 0.05,
        width: SIZES.windowHeight * 0.05,
        borderRadius: (SIZES.windowHeight * 0.05) / 2,
        textAlign: 'center',
        backgroundColor: 'white',
        paddingTop: SIZES.h10,
    },
    shadowporp: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
        elevation: 11,
    },
    statusModal: {
        alignSelf: 'flex-end',
        paddingVertical: SIZES.h14,
        paddingHorizontal: SIZES.h14,
        backgroundColor: Colors.white,
        marginTop: SIZES.h26,
        borderColor: Colors.green,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 3,
    },
    header2: {
        width: SIZES.windowWidth,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.h20,
        paddingVertical: SIZES.h14,
        alignItems: 'center',
    },
    notificationCircle: {
        position: 'absolute',
        height: SIZES.h10,
        width: SIZES.h10,
        borderRadius: SIZES.font,
        backgroundColor: Colors.green,
        right: SIZES.font,
    },
});

export default Header;