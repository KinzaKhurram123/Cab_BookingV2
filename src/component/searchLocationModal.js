import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Modal from 'react-native-modal';
import {moderateScale} from 'react-native-size-matters';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Colors from '../config/appTheme';
import CustomText from './customText';
import {windowHeight, windowWidth} from '../utility/utils';
import {FONTS} from '../constant/sizes';
import {Icon} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';

const SearchLocationModal = ({
  isModalVisible,
  setIsModalVisible,
  setLocation,
  locationType,
  setPickupLocation,
  setdropOffLocation,
  onPressCurrentLocation,
  isyourLocation = false,
}) => {
  return (
    <Modal
      hasBackdrop={true}
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
      isVisible={isModalVisible}
      onBackdropPress={() => {
        setIsModalVisible(false);
      }}>
      <View style={styles.maincontainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: windowWidth * 0.8,
          }}>
          <CustomText
            style={{
              color: Colors.black,
              marginBottom: moderateScale(15, 0.3),
              ...FONTS.Bold18,
            }}
            isBold>
            Select Location
          </CustomText>
          <Icon
            name="squared-cross"
            as={Entypo}
            size={moderateScale(30, 0.6)}
            color={Colors.red}
            onPress={() => {
              setIsModalVisible(false);
            }}
          />
        </View>
        {locationType == 'pickup' && (
          <TouchableOpacity
            onPress={onPressCurrentLocation}
            style={{
              width: windowWidth * 0.8,
              height: windowHeight * 0.05,
              marginVertical: moderateScale(5, 0.2),
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Icon
              name="my-location"
              as={MaterialIcons}
              size={moderateScale(25, 0.6)}
              color={Colors.veryLightGray}
            />
            <CustomText
              style={{
                ...FONTS.Regular12,
                marginLeft: moderateScale(10, 0.6),
                color: Colors.veryLightGray,
              }}>
              Use Your Current Location
            </CustomText>
          </TouchableOpacity>
        )}
        <GooglePlacesAutocomplete
          onFail={error => console.error(error, 'errrrrrorrrr')}
          placeholder={
            locationType === 'pickup'
              ? ' select your pickup location'
              : 'select your dropoff location'
          }
          textInputProps={{
            placeholderTextColor: '#5d5d5d',
            ...FONTS.Regular13,
          }}
          onPress={(data, details = null) => {
            console.log('Location ========>>>>', {
              name: data?.description,
              lat: details?.geometry?.location?.lat,
              lng: details?.geometry?.location?.lng,
            });
            locationType == 'pickup'
              ? setPickupLocation({
                  name: data?.description,
                  lat: details?.geometry?.location?.lat,
                  lng: details?.geometry?.location?.lng,
                })
              : setdropOffLocation({
                  name: data?.description,
                  lat: details?.geometry?.location?.lat,
                  lng: details?.geometry?.location?.lng,
                });
            setIsModalVisible(false);
          }}
          query={{
            key: 'AIzaSyBhrOck4__D57wSJQnLzJ6XR-zwIgUiT_k',
            language: 'en',
          }}
          isRowScrollable={true}
          fetchDetails={true}
          styles={{
            textInputContainer: {
              width: windowWidth * 0.85,
              marginLeft: moderateScale(5, 0.6),
              height: windowWidth * 0.12,
            },
            textInput: {
              height: windowWidth * 0.16,
              color: '#5d5d5d',
              fontSize: 16,
              borderWidth: 2,
              borderColor: Colors.themeColorLight,
              borderRadius: moderateScale(10, 0.6),
              backgroundColor: Colors.lightGrey,
            },
            listView: {
              width: windowWidth * 0.8,
              marginLeft: moderateScale(5, 0.6),
              borderColor: Colors.veryLightGray,
            },
            description: {
              color: 'black',
            },
          }}
        />
      </View>
    </Modal>
  );
};

export default SearchLocationModal;

const styles = StyleSheet.create({
  maincontainer: {
    backgroundColor: Colors.white,
    width: windowWidth * 0.9,
    height: windowHeight * 0.7,
    alignItems: 'center',
    borderRadius: moderateScale(20, 0.3),
    paddingVertical: moderateScale(15, 0.3),
    borderWidth: 1,
    borderColor: Colors.themeColor,
  },
});
