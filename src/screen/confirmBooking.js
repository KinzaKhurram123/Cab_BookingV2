import {useIsFocused} from '@react-navigation/native';
import {getDistance, isValidCoordinate} from 'geolib';
import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Images from '../assests/Appimages';
import CustomButton from '../component/customButton';
import CustomImage from '../component/customImage';
import CustomText from '../component/customText';
import PulsingMarker from '../component/pulsingMarker';
import {GoogleApiKey} from '../config';
import {mapstyle} from '../constant/mapStyle';
import {FONTS, SIZES} from '../constant/sizes';
import {useTheme} from '../context/ThemeContext';
import navigationServices from '../navigator/navigationServices';
import {windowWidth} from '../utility/utils';
import {color} from 'native-base/lib/typescript/theme/styled-system';

const ConfirmBooking = props => {
  const {theme} = useTheme();
  const data = props?.route?.params?.data;
  console.log(data, '===============>dataaaaaaaaaa');
  const isFocused = useIsFocused();
  const mapRef = useRef(null);

  const currentPosition = {
    latitude: data?.pickupLocation?.lat,
    longitude: data?.pickupLocation?.lng,
  };

  return (
    <View style={[styles.scrollContainer, {backgroundColor: theme.background}]}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        customMapStyle={mapstyle}
        onMapReady={() => console.log('Map is ready')}
        onError={error => console.log('Map error:', error)}
        initialRegion={{
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {isValidCoordinate(currentPosition) && (
          <PulsingMarker
            coordinate={{
              latitude: currentPosition?.latitude,
              longitude: currentPosition?.longitude,
            }}
            color={theme.primary}
            text="📍"
          />
        )}
      </MapView>

      <View style={styles.overlay} pointerEvents="box-none">
        <View style={styles.bottom_main}>
          <View
            style={[
              styles.bottom_main_view,
              {
                backgroundColor: 'rgba(255,255,255,0.95)',
                borderBottomColor: theme.primary,
                shadowColor: theme.primary,
              },
            ]}>
            <View style={styles.image_card_view}>
              <CustomImage
                source={Images.confirm_ride}
                style={[styles.image]}
              />
            </View>

            <CustomText isBold style={[styles.heading, {color: theme.text}]}>
              Your Ride Is Confirmed
            </CustomText>
            <CustomText style={{...FONTS.Regular12, color: theme.black}}>
              Please wait for the rider to accept your ride
            </CustomText>
          </View>
          <View style={styles.row_view}>
            <CustomButton
              text={'Cancel'}
              textColor={theme.white}
              width={SIZES.windowWidth * 0.6}
              height={SIZES.windowHeight * 0.08}
              marginTop={SIZES.padding}
              bgColor={theme.red_gredient || ['#DA3029', '#3F2925']}
              borderRadius={SIZES.padding}
              isBold
              isGradient
              elevation
              iconName={'cross'}
              iconType={Entypo}
              onPress={() => navigationServices.goBack()}
            />

            <CustomButton
              text={'Edit'}
              textColor={theme.white}
              width={SIZES.windowWidth * 0.33}
              height={SIZES.windowHeight * 0.08}
              marginTop={SIZES.padding}
              bgColor={theme.button_gredient || ['#46cc00', '#339500']}
              borderRadius={SIZES.padding}
              isBold
              isGradient
              elevation
              iconName={'edit'}
              iconType={FontAwesome}
              onPress={() => navigationServices.navigate('RideBooking')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ConfirmBooking;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottom_main: {
    width: windowWidth * 0.95,
    position: 'absolute',
    bottom: 20,
  },
  bottom_main_view: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.6,
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  image_card_view: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    top: -10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  heading: {
    ...FONTS.Bold20,
    marginTop: moderateScale(-20, 0.6),
    marginBottom: moderateScale(10, 0.6),
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: moderateScale(5, 0.6),
  },
  driverImage: {
    width: moderateScale(50, 0.6),
    height: moderateScale(50, 0.6),
    borderRadius: moderateScale(25, 0.6),
    overflow: 'hidden',
    marginRight: moderateScale(10, 0.6),
  },
  driverImageStyle: {
    width: '100%',
    height: '100%',
  },
  driverDetails: {
    flex: 1,
  },
  driverName: {
    ...FONTS.Bold14,
    marginBottom: moderateScale(2, 0.6),
  },
  driverCar: {
    ...FONTS.Regular12,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  etaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: moderateScale(10, 0.6),
    borderRadius: moderateScale(8, 0.6),
    marginTop: moderateScale(10, 0.6),
  },
  etaText: {
    ...FONTS.Regular12,
    marginLeft: moderateScale(8, 0.6),
  },
});
