import {useIsFocused} from '@react-navigation/native';
import {getDistance, isValidCoordinate} from 'geolib';
import {View} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
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
import Colors from '../config/appTheme';
import {mapstyle} from '../constant/mapStyle';
import {FONTS, SIZES} from '../constant/sizes';
import {windowHeight, windowWidth} from '../utility/utils';

const RideBooking = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickupLocation, setPickUpLocation] = useState({});
  const [dropOffLocation, setDropOffLocation] = useState({});
  const [locationType, setLocationType] = useState('pickup');
  const [isYourLocation, setIsyourLocation] = useState(null);
  const [address, setAddress] = useState('');
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
        <View style={styles.bottom_main}>
          <View style={styles.bottom_main_view}>
            <View style={styles.image_card_view}>
              <CustomImage source={Images.confirm_ride} style={styles.image} />
            </View>
            <CustomText isBold style={styles.heading}>
              Your Ride Is Confirmed
            </CustomText>
          </View>
          <View style={styles.row_view}>
            <CustomButton
              text={'canceled'}
              textColor={Colors.white}
              width={SIZES.windowWidth * 0.6}
              height={SIZES.windowHeight * 0.08}
              marginTop={SIZES.padding}
              bgColor={Colors.red_gredient}
              borderRadius={SIZES.padding}
              isBold
              isGradient
              elevation
              iconName={'cross'}
              iconType={Entypo}
              // onPress={() =>
              //   navigationServices.navigate('ConfirmBooking', {data: data})
              // }
            />
            <CustomButton
              text={'Edit'}
              textColor={Colors.white}
              width={SIZES.windowWidth * 0.33}
              height={SIZES.windowHeight * 0.08}
              marginTop={SIZES.padding}
              bgColor={Colors.button_gredient}
              borderRadius={SIZES.padding}
              isBold
              isGradient
              elevation
              iconName={'edit'}
              iconType={FontAwesome}
              // onPress={() =>
              //   navigationServices.navigate('ConfirmBooking', {data: data})
              // }
            />
          </View>
        </View>
      </View>
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
    padding: moderateScale(7, 0.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  heading: {
    ...FONTS.Bold20,
    color: Colors.black,
  },
  image_card_view: {
    width: windowWidth * 0.45,
    height: windowWidth * 0.45,
    top: -10,
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

  row_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottom_main: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.37,
    position: 'absolute',
    bottom: 20,
  },
  bottom_main_view: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.6,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.6),
    paddingHorizontal: moderateScale(6, 0.5),
    paddingHorizontal: moderateScale(20, 0.6),
    paddingVertical: moderateScale(20, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 4,
    borderBottomColor: Colors.themeColorLight,
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
  image: {
    width: '100%',
    height: '100%',
  },
});
