import React from 'react';
import {
  ActivityIndicator,
  I18nManager,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Colors from '../config/appTheme';
import { FONTS, SIZES } from '../constant/sizes';
import CustomText from './customText';

const CustomButton = props => {
  const {
    activeOpacity,
    onPress,
    width,
    height,
    bgColor,
    borderWidth,
    borderColor,
    marginTop,
    marginBottom,
    justifyContent,
    borderRadius,
    isGradient,
    fontSize,
    loader,
    loaderColor,
    iconName,
    iconType,
    iconStyle,
    textColor,
    textTransform,
    text,
    isBold,
    disabled = false,
    alignSelf,
    elevation,
    marginRight,
    textstyle,
    iconIsImage,
    image,
    fontcase,
    style,
    btn_style
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity ? activeOpacity : 0.9}
      onPress={onPress}
      style={[
        styles.mainBtn,
        {
          width: width,
          height: height,
          borderWidth: borderWidth,
          backgroundColor: bgColor,
          borderColor: borderColor,
          marginTop: marginTop || 0,
          marginBottom: marginBottom || 0,
        },
        elevation && {
          shadowColor: Colors.themeBlack,
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.32,
          shadowRadius: 5.46,

          elevation: 9,
        },
        alignSelf && {
          alignSelf: alignSelf,
        },
        justifyContent && {
          justifyContent: justifyContent,
        },
        marginRight && {
          marginRight: marginRight,
        },
        borderRadius && {
          borderRadius: borderRadius,
        },
        borderWidth && {
          borderWidth: borderWidth,
        },
        disabled && {
          backgroundColor: Colors.themeLightGray,
          borderColor: Colors.themeLightGray,
          color: Colors.white,
        },
        style,
      ]}
      disabled={disabled}
    >
      {disabled == false && isGradient ? (
        <LinearGradient
          style={{
            flexDirection: 'row',
            width: width,
            height: height,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: borderRadius,
          }}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={bgColor}
        >
          {loader && (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={loaderColor ? loaderColor : Colors.white}
            />
          )}
          {iconIsImage && (
            <View
              style={{
                width: SIZES.windowWidth * 0.1,
                height: SIZES.windowWidth * 0.1,
                overflow: 'hidden',
              }}
            >
              {/* <CustomImage
                source={require('../Assets/Images/goal.png')}
                style={{ width: '100%', height: '100%' }}
              /> */}
            </View>
          )}
          {/* {iconName && (
            <Icon
              name={iconName}
              as={iconType}
              style={[styles.iconCustom, iconStyle && iconStyle]}
            />
          )} */}
          <CustomText
            style={[
              styles.text,
              // textStyle && textStyle,
              {
                color: textColor,
                fontSize: fontSize ? fontSize : SIZES.h13,
              },
              textTransform && {
                textTransform: textTransform,
              },
              btn_style
            ]}
            isRegular={isBold ? false : true}
            isBold={isBold ? true : false}
          >
            {text}
          </CustomText>
        </LinearGradient>
      ) : (
        <>
          {loader && (
            <ActivityIndicator
              style={styles.indicatorStyle}
              size="small"
              color={loaderColor ? loaderColor : Colors.white}
            />
          )}
          {iconIsImage && (
            <View
              style={{
                width: SIZES.windowWidth * 0.07,
                marginRight: SIZES.h10,
                height: SIZES.windowWidth * 0.07,
                overflow: 'hidden',
              }}
            >
              {/* <CustomImage
                source={require('../Assets/Images/goal.png')}
                style={{ width: '100%', height: '100%', tintColor: 'black' }}
              /> */}
            </View>
          )}
          {/* {iconName && (
            <Icon
              name={iconName}
              as={iconType}
              style={[styles.iconCustom, iconStyle && iconStyle]}
            />
          )} */}
          <CustomText
            style={[
              styles.text,
              textstyle,
              {
                color: textColor,
              },
              textTransform && {
                textTransform: textTransform,
              },
              disabled && {
                color: Colors.white,
                opacity: 0.6,
              },
            ]}
            isRegular={isBold ? false : true}
            isBold={isBold ? true : false}
          >
            {text}
          </CustomText>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    flexDirection: 'row',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.base,
  },
  text: {
    color: 'white',
    textTransform: 'uppercase',
    textAlign: 'center',
    letterSpacing: 0.9,
    ...FONTS.Medium11,
  },
  indicatorStyle: {
    paddingRight: 5,
    paddingLeft: I18nManager.isRTL ? 5 : 0,
  },
  iconCustom: {
    color: 'white',
    fontSize: SIZES.h16,
    marginRight: SIZES.h10,
  },
});

export default CustomButton;
