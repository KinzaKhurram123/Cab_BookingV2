import React, {useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Divider, Icon} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Header from '../component/Header';
import Colors from '../config/appTheme';
import {mapstyle} from '../constant/mapStyle';
import {FONTS, SIZES} from '../constant/sizes';
import {windowHeight, windowWidth} from '../utility/utils';
import CustomText from '../component/customText';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/customButton';
import MapViewDirections from 'react-native-maps-directions';
import {GoogleApiKey} from '../config';
import navigationServices from '../navigator/navigationServices';
import {useTheme} from '../context/ThemeContext';
import {confirmRider} from '../apisConfig/bookings';
import {useDispatch, useSelector} from 'react-redux';
import {now} from 'moment';

const RideDetails = props => {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const data = props?.route?.params?.pramsData;
  const userData = useSelector(state => state.commonReducer.userData);
  console.log(userData, '===========>userDataaaa');
  const token = useSelector(state => state.authReducer.token);
  const mapRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const pickupLocation = {
    latitude: data?.pickupLocation?.lat || data?.pickupLocation?.latitude,
    longitude: data?.pickupLocation?.lng || data?.pickupLocation?.longitude,
  };
  const dropOffLocation = {
    latitude: data?.dropOffLocation?.lat || 0,
    longitude: data?.dropOffLocation?.lng || 0,
  };

  const body = {
    category: 'cab',
    pickupLocation: {
      lat: pickupLocation?.latitude || 0,
      lng: pickupLocation?.longitude || 0,
    },
    dropOffLocation: {
      lat: dropOffLocation?.latitude || 0,
      lng: dropOffLocation?.longitude || 0,
    },
    pickupLocationName: data?.pickupLocationName || '',
    dropoffLocationName: data?.dropOffLocation?.name || '',
    distance: parseFloat(data?.distance) || 0,
    distanceInKm: parseFloat(data?.distance) || 0,
    time: parseFloat(data?.time) || 0,
    duration: parseFloat(data?.time) || 0,
    durationInMinutes: parseFloat(data?.time) || 0,
    fare: parseInt(data?.price) || 0,
    price: parseInt(data?.price) || 0,
    status: 'pending',
    rideStatus: 'pending',
    bookingStatus: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'cash',
    paymentType: 'cash',
    user: userData?._id,
    userId: userData?._id,
    date: new Date().toISOString().split('T')[0],
    bookingDate: new Date().toISOString(),
  };

  return (
    <View style={[styles.scrollContainer, {backgroundColor: theme.background}]}>
      <View style={[styles.main_view, {backgroundColor: theme.background}]}>
        <Header
          showBack
          headerColor={theme.background}
          iconColor={theme.text}
        />

        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={mapstyle}
          onMapReady={() => console.log('Map is ready')}
          onError={error => console.log('Map error:', error)}
          initialRegion={{
            latitude: pickupLocation?.latitude || 37.78825,
            longitude: pickupLocation?.longitude || -122.4324,
            latitudeDelta: 0.2,
            longitudeDelta: 0.1,
          }}>
          {pickupLocation?.latitude !== 0 && (
            <Marker
              coordinate={{
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude,
              }}
              pinColor={theme.primary}
              title="Pickup Location"
            />
          )}

          <MapViewDirections
            origin={pickupLocation}
            destination={dropOffLocation}
            strokeColor={theme.primary}
            strokeWidth={6}
            apikey={GoogleApiKey}
            optimizeWaypoints={false}
            onError={e => {
              console.log('MapViewDirections error:', e);
            }}
            tappable={true}
            onReady={result => {
              if (mapRef.current && result.coordinates.length > 0) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 50,
                    left: 50,
                    top: 300,
                    bottom: 100,
                  },
                });
              }
            }}
          />

          {dropOffLocation?.latitude !== 0 && (
            <Marker
              coordinate={{
                latitude: dropOffLocation.latitude,
                longitude: dropOffLocation.longitude,
              }}
              pinColor={theme.error || '#DA3029'}
              title="Dropoff Location"
            />
          )}
        </MapView>

        <View style={styles.backButton}>
          <Icon
            name="left"
            as={AntDesign}
            size={moderateScale(30, 0.6)}
            color={theme.text}
            onPress={() => navigationServices.goBack()}
          />
        </View>

        <View style={styles.bottom_main_view}>
          <View
            style={[
              styles.bottom_sub_view,
              {backgroundColor: `${theme.primary}80`},
            ]}>
            <View
              style={[
                styles.bottom_sub,
                {
                  borderRightWidth: 5,
                  borderRightColor: theme.primary,
                  backgroundColor: theme.white,
                },
              ]}>
              <CustomText
                isBold
                style={[styles.label, {color: theme.darkGray}]}>
                Total Price
              </CustomText>
              <CustomText isBold style={[styles.price, {color: theme.primary}]}>
                {' $ ' + data?.price}
              </CustomText>
              <View style={[styles.divider, {backgroundColor: theme.border}]} />
              <CustomText
                isBold
                style={[
                  styles.label,
                  {color: theme.darkGray, marginTop: moderateScale(10, 0.6)},
                ]}>
                Total Distance
              </CustomText>
              <CustomText
                isBold
                style={[styles.distance, {color: theme.primary}]}>
                {data?.distance + ' km'}
              </CustomText>
            </View>

            <View
              style={[
                styles.bottom_sub,
                {
                  backgroundColor: 'transparent',
                  justifyContent: 'center',
                },
              ]}>
              <CustomText
                isBold
                style={[styles.label, {color: theme.darkGray}]}>
                Approximate Time
              </CustomText>
              <CustomText isBold style={[styles.time, {color: theme.text}]}>
                {data?.time + ' mins.'}
              </CustomText>

              <View
                style={[
                  styles.divider,
                  {
                    backgroundColor: theme.border,
                    marginTop: moderateScale(10, 0.6),
                  },
                ]}
              />
            </View>
          </View>

          <View
            style={[
              styles.locationCard,
              {
                backgroundColor: theme.white,
                shadowColor: theme.primary,
              },
            ]}>
            <View style={{flexDirection: 'row'}}>
              <Icon
                as={FontAwesome}
                name="location-arrow"
                size={moderateScale(24, 0.2)}
                color={theme.primary}
              />
              <View style={styles.locationPickerBtn}>
                <CustomText
                  numberOfLines={2}
                  style={[styles.locationText, {color: theme.veryLightGray}]}>
                  {data?.pickupLocation?.name || data?.pickupLocationName}
                </CustomText>
              </View>
            </View>

            <View style={styles.dotView}>
              <View style={{gap: -2}}>
                <Icon
                  as={Entypo}
                  name="dots-two-vertical"
                  size={moderateScale(20, 0.2)}
                  color={theme.primary}
                />
                <Icon
                  as={Entypo}
                  name="dots-two-vertical"
                  size={moderateScale(20, 0.2)}
                  color={theme.primary}
                />
              </View>
              <Divider
                bg={theme.border}
                width={'2xs'}
                borderWidth={0.2}
                marginLeft={2}
                borderColor={theme.border}
              />
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                as={Entypo}
                name="location-pin"
                size={moderateScale(24, 0.2)}
                color={theme.primary}
              />
              <View style={styles.locationPickerBtn}>
                <CustomText
                  numberOfLines={2}
                  style={[styles.locationText, {color: theme.veryLightGray}]}>
                  {data?.dropOffLocation?.name || 'Dropoff Location'}
                </CustomText>
              </View>
            </View>
          </View>

          <CustomButton
            text={'Confirm Booking'}
            textColor={theme.white}
            width={SIZES.windowWidth * 0.85}
            height={SIZES.windowHeight * 0.08}
            marginTop={SIZES.padding}
            bgColor={theme.button_gredient || ['#46cc00', '#339500']}
            borderRadius={SIZES.padding}
            isBold
            isGradient
            elevation
            loader={loading}
            onPress={() => confirmRider({setLoading, body, dispatch, token})}
          />
        </View>
      </View>
    </View>
  );
};

export default RideDetails;

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
  },
  main_view: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding2,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    top: 10,
    left: moderateScale(10, 0.6),
    position: 'absolute',
    zIndex: 10,
  },
  bottom_main_view: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.5,
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.6),
    position: 'absolute',
    bottom: 80,
  },
  bottom_sub_view: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.6,
    borderRadius: moderateScale(12, 0.6),
    paddingHorizontal: moderateScale(12, 0.6),
    paddingVertical: moderateScale(12, 0.6),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom_sub: {
    width: '48%',
    height: '98%',
    borderRadius: moderateScale(10, 0.7),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  label: {
    ...FONTS.Regular18,
    marginBottom: moderateScale(6, 0.6),
    textAlign: 'center',
  },
  price: {
    fontFamily: 'Urbanist-Bold',
    fontSize: moderateScale(24, 0.6),
    width: '100%',
    textAlign: 'center',
  },
  distance: {
    ...FONTS.Bold18,
    width: '100%',
    textAlign: 'center',
  },
  time: {
    fontSize: moderateScale(22, 0.6),
    width: '100%',
    textAlign: 'center',
  },
  divider: {
    width: '80%',
    height: 1,
    alignSelf: 'center',
    marginTop: moderateScale(10, 0.6),
  },
  locationCard: {
    width: windowWidth * 0.95,
    gap: moderateScale(-7, 0.1),
    borderRadius: moderateScale(10, 0.2),
    padding: moderateScale(15, 0.2),
    marginTop: moderateScale(10, 0.6),
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  locationPickerBtn: {
    flex: 1,
    marginLeft: moderateScale(10, 0.6),
  },
  locationText: {
    width: windowWidth * 0.7,
    ...FONTS.Regular14,
  },
  dotView: {
    flexDirection: 'row',
    gap: moderateScale(5, 0.2),
    alignItems: 'center',
    paddingVertical: moderateScale(4, 0.6),
  },
});
