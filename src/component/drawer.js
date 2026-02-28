import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import Images from '../assests/Appimages';
import Colors from '../config/appTheme';
import {drawer_items} from '../constant/arrays';
import {FONTS, SIZES} from '../constant/sizes';
import {setUserToken} from '../store/slices/auth';
import {SetUserRole} from '../store/slices/auth-slice';
import {setUserLogOut} from '../store/slices/common';
import {windowWidth} from '../utility/utils';
import CustomImage from './customImage';
import CustomText from './customText';

const CustomDrawer = React.memo(() => {
  const dispatch = useDispatch();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={Images.drawer_bg}
      imageStyle={{width: '100%', height: '100%'}}
      resizeMode="cover"
      style={{
        flex: 1,
      }}>
      <View style={{flex: 1}}>
        <View style={styles.profile_view}>
          <View style={styles.image_view}>
            <CustomImage style={styles.image} source={Images.user_image2} />
          </View>
          <View style={{marginLeft: SIZES.padding}}>
            <CustomText isBold style={styles.heading_text}>
              PAT H. JHONSON
            </CustomText>
            <CustomText style={styles.text}>jhonson@gmail.com</CustomText>
          </View>
        </View>
        <View
          style={{
            height: '60%',
            marginTop: SIZES.padding,
          }}>
          {drawer_items.map((item, index) => (
            <>
              <TouchableOpacity
                key={item.id}
                onPress={item.onPress}
                style={{
                  width: SIZES.windowWidth * 0.7,
                  borderColor: Colors.black,
                  marginVertical: SIZES.padding2,
                  paddingHorizontal: SIZES.padding,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <CustomText
                  isBold
                  style={{
                    color: Colors.black,
                    ...FONTS.heavy14,
                  }}>
                  {item.name}
                </CustomText>
              </TouchableOpacity>
            </>
          ))}
        </View>
        <View style={styles.end_view}>
          <TouchableOpacity
            onPress={() => {
              // dispatch(setUserToken(''));
              // dispatch(SetUserRole(''));
              // dispatch(setUserLogOut());
              navigation.navigate('LoginScreen');
            }}
            style={{
              width: SIZES.windowWidth * 0.7,
              borderColor: Colors.black,
              margin: SIZES.base,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <CustomText
              isBold
              style={{
                ...FONTS.Regular16,
                color: Colors.veryLightGray,
              }}>
              Logout
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
});

export default CustomDrawer;

const styles = StyleSheet.create({
  Profile: {
    width: SIZES.windowWidth * 0.15,
    height: SIZES.windowWidth * 0.15,
    borderRadius: (SIZES.windowWidth * 0.2) / 1,
    borderWidth: 1,
    borderColor: Colors.white,
    overflow: 'hidden',
  },
  menu_text: {
    color: Colors.darkGray,
  },
  profile_view: {
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding + 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: SIZES.windowWidth * 0.4,
    backgroundColor: Colors.lightGreen,
  },
  image_view: {
    width: SIZES.padding + 40,
    height: SIZES.padding + 40,
    borderRadius: SIZES.windowHeight,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.windowHeight,
  },
  heading_text: {
    ...FONTS.Bold20,
    textTransform: 'uppercase',
    color: Colors.white,
    width: windowWidth * 0.35,
  },
  text: {
    ...FONTS.Regular12,
    color: Colors.white,
  },
  end_view: {
    height: '20%',
    width: '100%',
    paddingHorizontal: SIZES.padding,
    marginTop: SIZES.padding + 10,
  },
});
