import {Divider, Icon, View} from 'native-base';
import React, {useRef} from 'react';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
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

const RideDetails = props => {
  const data = props?.route?.params?.pramsData;
  console.log(data, 'dataaaaaaaaaaaaaaaaa');
  const mapRef = useRef(null);

  const pickupLocation = {
    latitude: data?.pickupLocation?.lat || 0,
    longitude: data?.pickupLocation?.lng || 0,
  };
  const dropOffLocation = {
    latitude: data?.dropOffLocation?.lat || 0,
    longitude: data?.dropOffLocation?.lng || 0,
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}>
      <View style={styles.main_view}>
        <Header showBack />
        <MapView
          ref={mapRef}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          urlTemplate="https://{s}.tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=AIzaSyBzZFk3vPXDKBDyD3mHAyOeOvGmSiwhel4"
          showsMyLocationButton={true}
          customMapStyle={mapstyle}
          initialRegion={{
            latitude: pickupLocation?.latitude || 0,
            longitude: pickupLocation?.longitude || 0,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          {pickupLocation && (
            <Marker
              coordinate={{
                latitude: pickupLocation.latitude,
                longitude: pickupLocation.longitude,
              }}
              pinColor="black"
              title="Pickup Location"
            />
          )}

          <MapViewDirections
            origin={pickupLocation}
            destination={dropOffLocation}
            strokeColor={Colors.black}
            strokeWidth={6}
            apikey={GoogleApiKey}
            optimizeWaypoints={false}
            onStart={params => {}}
            onError={e => {
              console.log('map vview direction erorrrrrrrrrrrrrr', e);
            }}
            tappable={true}
            onReady={result => {
              mapRef.current.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: 50,
                  left: 50,
                  top: 300,
                  bottom: 100,
                },
              });
            }}
          />
          {dropOffLocation && (
            <Marker
              coordinate={{
                latitude: dropOffLocation.latitude,
                longitude: dropOffLocation.longitude,
              }}
              pinColor="black"
              title="Dropoff Location"
            />
          )}
        </MapView>
        <View
          style={{
            top: 10,
            width: windowWidth,
            paddingHorizontal: moderateScale(10, 0.6),
            position: 'absolute',
          }}>
          <Icon
            name="left"
            as={AntDesign}
            size={moderateScale(30, 0.6)}
            color={Colors.black}
          />
        </View>
        <View style={styles.bottom_main_view}>
          <View style={styles.bottom_sub_view}>
            <View
              style={[
                styles.bottom_sub,
                {
                  borderRightWidth: 5,
                  borderRightColor: Colors.themeColorLight,
                },
              ]}>
              <CustomText
                isBold
                style={{
                  ...FONTS.Regular20,
                  color: Colors.darkGray,
                  marginBottom: moderateScale(6, 0.6),
                  textAlign: 'center',
                }}>
                Total Price
              </CustomText>
              <CustomText isBold style={styles.heading}>
                $ 14
              </CustomText>
              <View
                style={{
                  width: '80%',
                  height: 1,
                  backgroundColor: Colors.veryLightGray,
                  alignSelf: 'center',
                  marginTop: moderateScale(10, 0.6),
                }}
              />
              <CustomText
                isBold
                style={{
                  ...FONTS.Regular20,
                  color: Colors.darkGray,
                  marginVertical: moderateScale(15, 0.6),
                }}>
                Total Distance
              </CustomText>
              <CustomText
                isBold
                style={{
                  ...FONTS.Bold20,
                  color: Colors.themeColor,
                  width: '100%',
                  textAlign: 'center',
                }}>
                14 km
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
                style={{
                  ...FONTS.Regular20,
                  color: Colors.themeDarkGray,
                  marginBottom: moderateScale(6, 0.6),
                  textAlign: 'center',
                }}>
                Approximate Time
              </CustomText>
              <CustomText isBold style={styles.time}>
                10 mins.
              </CustomText>
              <View
                style={{
                  width: '80%',
                  height: 1,
                  backgroundColor: Colors.veryLightGray,
                  alignSelf: 'center',
                  marginTop: moderateScale(10, 0.6),
                }}
              />
            </View>
          </View>
          <View
            style={{
              width: windowWidth * 0.95,
              gap: moderateScale(-7, 0.1),
              backgroundColor: '#f3f3f3f8',
              borderRadius: moderateScale(10, 0.2),
              padding: moderateScale(15, 0.2),
              marginTop: moderateScale(10, 0.6),
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 6,
              },
              shadowOpacity: 0.37,
              shadowRadius: 7.49,
              elevation: 12,
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
                    ...FONTS.Regular14,
                    marginLeft: moderateScale(10, 0.6),
                  }}>
                  {data?.pickupLocation?.name}
                </CustomText>
              </TouchableOpacity>
            </View>
            <View style={styles.dotView}>
              <View style={{gap: -5}}>
                <Icon
                  as={Entypo}
                  name="dots-two-vertical"
                  size={moderateScale(20, 0.2)}
                  color={Colors.themeColor}
                />
                <Icon
                  as={Entypo}
                  name="dots-two-vertical"
                  size={moderateScale(20, 0.2)}
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
                  numberOfLines={2}
                  style={{
                    width: windowWidth * 0.7,
                    ...FONTS.Regular14,
                    marginLeft: moderateScale(10, 0.6),
                  }}>
                  {data?.dropOffLocation?.name}
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
          <CustomButton
            text={'Confirm Booking'}
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
              navigationServices.navigate('ConfirmBooking', {data: data})
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default RideDetails;

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
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bottom_main_view: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.5,
    alignSelf: 'center',
    borderRadius: moderateScale(10, 0.6),
    position: 'absolute',
    bottom: 40,
  },
  dotView: {
    flexDirection: 'row',
    gap: moderateScale(5, 0.2),
    alignItems: 'center',
    paddingVertical: moderateScale(4, 0.6),
  },
  bottom_sub_view: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.6,
    backgroundColor: 'rgba(70, 204, 0,0.2)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: moderateScale(10, 0.7),
    paddingHorizontal: moderateScale(10, 0.6),
    paddingVertical: moderateScale(10, 0.6),
  },
  heading: {
    fontFamily: 'Urbanist-Bold',
    fontSize: moderateScale(36, 0.6),
    width: '100%',
    textAlign: 'center',
    color: Colors.themeColor,
  },
  time: {
    fontSize: moderateScale(30, 0.6),
    width: '100%',
    textAlign: 'center',
  },
});
