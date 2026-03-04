import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import Header from '../component/Header';
import Colors from '../config/appTheme';
import {FONTS, SIZES} from '../constant/sizes';
import {windowHeight, windowWidth} from '../utility/utils';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Divider, Icon, View} from 'native-base';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../component/customImage';
import Images from '../assests/Appimages';
import CustomText from '../component/customText';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomButton from '../component/customButton';
import navigationServices from '../navigator/navigationServices';
import SearchLocationModal from '../component/searchLocationModal';
import {GoogleApiKey} from '../config';
import Geolocation from 'react-native-geolocation-service';
import {useIsFocused} from '@react-navigation/native';
import {getDistance, isValidCoordinate} from 'geolib';
import PulsingMarker from '../component/pulsingMarker';
import {mapstyle} from '../constant/mapStyle';

const RideBooking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [locationType, setLocationType] = useState('pickup');
  const [isYourLocation, setIsyourLocation] = useState(null);
  const isFocused = useIsFocused();
  const mapRef = useRef(null);
  const [isNearDestination, setIsNearDestination] = useState(false);
  const data = {};
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 0,
    longitude: 0,
  });
  const origin = {
    lat: currentPosition?.latitude,
    lng: currentPosition?.longitude,
  };
  const destination = {
    lat: parseFloat(data?.dropoff_location_lat),
    lng: parseFloat(data?.dropoff_location_lng),
  };
  useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

  useEffect(() => {
    const watchId = Geolocation.watchPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setCurrentPosition(prevLocation => ({
          ...prevLocation,
          latitude,
          longitude,
        }));

        const distance = getDistance(currentPosition, destination);
        setIsNearDestination(distance <= 20);
      },
      error => console.log('Error getting location:', error),
      {
        enableHighAccuracy: true,
        distanceFilter: 1,
        interval: 1000,
      },
    );
    return () => {
      Geolocation.clearWatch(watchId);
    };
  }, [isFocused]);

  const getCurrentLocation = async () => {
    try {
      const position = await new Promise((resolve, reject) => {
        Geolocation.getCurrentPosition(
          position => {
            const coords = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            };
            console.log(
              position.coords.latitude,
              position.coords.longitude,
              'currrent location',
            );
            resolve(coords);
            getAddressFromCoordinates(
              position.coords.latitude,
              position.coords.longitude,
            );
          },
          error => {
            reject(new Error(error.message));
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 10000,
          },
        );
      });
      setCurrentPosition(position);
    } catch (error) {
      console.error('Error getting location:', error);
      throw error;
    }
  };

  useEffect(() => {
    if (isValidCoordinate(currentPosition)) {
      mapRef.current?.animateToRegion(
        {
          latitude: currentPosition.latitude,
          longitude: currentPosition.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000,
      );
    }
  }, [currentPosition]);

  const getAddressFromCoordinates = async (latitude, longitude) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GoogleApiKey}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data, 'daaaaaaaaaaaaaaaatttttttttttttttttaaaaaaaa');
      if (data.status === 'OK') {
        const givenaddress = data.results[0].formatted_address;
        setAddress(givenaddress);
      } else {
        console.log('No address found');
      }
    } catch (error) {
      console.error('--------------------------------- error', error);
    }
  };

  const pramsData = {
    pickupLocation: currentPosition,
    dropOffLocation: {
      latitude: '24.8016',
      longitude: '67.0295',
    },
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        urlTemplate="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=AIzaSyBzZFk3vPXDKBDyD3mHAyOeOvGmSiwhel4"
        showsMyLocationButton={true}
        customMapStyle={mapstyle}
        initialRegion={{
          latitude: currentPosition.latitude || 0,
          longitude: currentPosition.longitude || 0,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <PulsingMarker
          coordinate={{
            latitude: currentPosition?.latitude,
            longitude: currentPosition?.longitude,
          }}
          color={Colors.themeColorLight}
          text="📍"
        />
      </MapView>
      <View style={styles.overlay}>
        <View
          style={{
            width: windowWidth * 0.9,
            gap: moderateScale(-7, 0.1),
            backgroundColor: '#f3f3f3f8',
            borderRadius: moderateScale(10, 0.2),
            padding: moderateScale(12, 0.2),
            position: 'absolute',
            top: 20,
            shadowColor: '#46cc00',
            shadowOffset: {
              width: 0,
              height: 8,
            },
            shadowOpacity: 0.46,
            shadowRadius: 11.14,
            elevation: 17,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Icon
              as={FontAwesome}
              name="location-arrow"
              size={moderateScale(24, 0.2)}
              color={Colors.themeColorLight}
            />
            <TouchableOpacity
              onPress={() => {
                setLocationType('pickup');
                setIsModalVisible(true);
              }}
              style={styles.locationPickerBtn}>
              <CustomText
                numberOfLines={3}
                style={{
                  width: windowWidth * 0.7,
                  ...FONTS.Regular12,
                }}>
                {Object.keys(pickupLocation).length > 0
                  ? pickupLocation?.name || isYourLocation
                    ? 'Your Live Location'
                    : 'Choose Your Pickup Location'
                  : 'Choose Your Pickup Location'}
              </CustomText>
              <Icon
                as={AntDesign}
                name={
                  Object.keys(pickupLocation).length == 0 ? 'plus' : 'close'
                }
              />
            </TouchableOpacity>
          </View>
          <View style={styles.dotView}>
            <View style={{gap: -5}}>
              <Icon
                as={Entypo}
                name="dots-two-vertical"
                size={moderateScale(24, 0.2)}
                color={Colors.themeColor}
              />
              <Icon
                as={Entypo}
                name="dots-two-vertical"
                size={moderateScale(24, 0.2)}
                color={Colors.themeColor}
              />
            </View>
            <Divider
              color={Colors.lightGrey}
              width={'2xs'}
              borderWidth={0.2}
              marginLeft={2}
              borderColor={Colors.lightGrey}
            />
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              as={Entypo}
              name="location-pin"
              size={moderateScale(24, 0.2)}
              color={Colors.themeColorLight}
            />
            <TouchableOpacity
              onPress={() => {
                setLocationType('dropOff');
                setIsModalVisible(true);
              }}
              style={styles.locationPickerBtn}>
              <CustomText
                numberOfLines={3}
                style={{
                  width: windowWidth * 0.7,
                  ...FONTS.Regular12,
                }}>
                {Object.keys(dropOffLocation).length > 0
                  ? dropOffLocation?.name
                  : 'Choose Your Drop Location'}
              </CustomText>
              <Icon
                as={AntDesign}
                name={
                  Object.keys(dropOffLocation).length == 0 ? 'plus' : 'close'
                }
              />
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            width: windowWidth,
            height: windowHeight * 0.4,
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
          }}>
          <View style={styles.bottom_main_view}>
            <View style={styles.bottom_view}>
              <View style={styles.small_card}>
                <View
                  style={{
                    width: windowWidth * 0.2,
                    height: windowWidth * 0.2,
                    alignItems: 'center',
                  }}>
                  <CustomImage source={Images.carimage} />
                </View>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: -10,
                  }}>
                  <CustomText style={styles.heading} isBold>
                    Basic
                  </CustomText>
                  <CustomText
                    style={[styles.text, {color: Colors.veryLightGray}]}>
                    4 Seater
                  </CustomText>
                  <CustomText isBold style={styles.price}>
                    6 $
                  </CustomText>
                </View>
              </View>
              <View style={styles.image_card_view}>
                <View
                  style={{
                    width: windowWidth * 0.2,
                    height: windowWidth * 0.2,
                    alignItems: 'center',
                  }}>
                  <CustomImage source={Images.carimage} />
                </View>
                <CustomText style={styles.heading} isBold>
                  Premium
                </CustomText>
                <CustomText
                  style={[styles.text, {color: Colors.veryLightGray}]}>
                  4 Seater
                </CustomText>
                <CustomText isBold style={styles.price}>
                  6 $
                </CustomText>
              </View>
              <View style={styles.small_card}>
                <View
                  style={{
                    width: windowWidth * 0.2,
                    height: windowWidth * 0.2,
                    alignItems: 'center',
                  }}>
                  <CustomImage source={Images.carimage} />
                </View>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    top: -10,
                  }}>
                  <CustomText style={styles.heading} isBold>
                    Standerd
                  </CustomText>
                  <CustomText
                    style={[styles.text, {color: Colors.veryLightGray}]}>
                    4 Seater
                  </CustomText>
                  <CustomText isBold style={styles.price}>
                    6 $
                  </CustomText>
                </View>
              </View>
            </View>
            <View
              style={{
                top: -30,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: '95%',
                  height: 0.5,
                  backgroundColor: Colors.veryLightGray,
                }}
              />
              <View
                style={{
                  width: '95%',
                  height: windowWidth * 0.15,
                  backgroundColor: 'rgba(70, 204, 0,0.1)',
                  marginTop: moderateScale(10, 0.6),
                  borderRadius: moderateScale(10, 0.6),
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: moderateScale(10, 0.6),
                }}>
                <CustomText isBold style={styles.pm_text}>
                  Payment Method
                </CustomText>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CustomText
                    isBold
                    style={[styles.pm_text, {color: Colors.mediumGray}]}>
                    Credit Card
                  </CustomText>
                  <Icon
                    name="triangle-right"
                    as={Entypo}
                    size={moderateScale(25, 0.6)}
                    color={Colors.mediumGray}
                  />
                </View>
              </View>
            </View>
          </View>
          <CustomButton
            text={'Book Now'}
            textColor={Colors.white}
            width={SIZES.windowWidth * 0.85}
            height={SIZES.windowHeight * 0.08}
            marginTop={SIZES.padding}
            bgColor={Colors.button_gredient}
            borderRadius={SIZES.padding}
            isBold
            isGradient
            elevation
            onPress={() =>
              navigationServices.navigate('RideDetails', {pramsData})
            }
          />
        </View>
      </View>
      <SearchLocationModal
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        setPickupLocation={setPickUpLocation}
        setdropOffLocation={setDropOffLocation}
        locationType={locationType}
        onPressCurrentLocation={() => {
          setIsyourLocation(true);
          setIsModalVisible(false);
          setPickUpLocation(currentPosition);
        }}
      />
    </ScrollView>
  );
};

export default RideBooking;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  main_view: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingHorizontal: SIZES.padding2,
    paddingVertical: SIZES.padding2,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationPickerBtn: {
    // marginTop: moderateScale(6, 0.2),
    // width: windowWidth * 0.8,
    padding: moderateScale(7, 0.2),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dotView: {
    flexDirection: 'row',
    gap: moderateScale(2, 0.2),
    alignItems: 'center',
  },
  locationPickerBtn: {
    // marginTop: moderateScale(6, 0.2),
    // width: windowWidth * 0.8,
    padding: moderateScale(7, 0.2),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  heading: {
    ...FONTS.Bold13,
    color: Colors.black,
  },
  image_card_view: {
    width: windowWidth * 0.33,
    height: windowWidth * 0.4,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10, 0.6),
    alignSelf: 'center',
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#46cc00',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    borderBottomWidth: 5,
    borderBottomColor: Colors.themeColorLight,
  },
  small_card: {
    width: windowWidth * 0.28,
    height: windowWidth * 0.34,
    backgroundColor: Colors.white,
    borderRadius: moderateScale(10, 0.6),
    alignSelf: 'center',
    top: -50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  bottom_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom_main_view: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.55,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(6, 0.5),
  },
  text: {
    ...FONTS.Regular13,
  },
  price: {
    ...FONTS.Bold16,
    color: Colors.themeColor,
  },
  pm_text: {
    ...FONTS.Bold14,
    color: Colors.black,
  },
});
