import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale} from 'react-native-size-matters';
import Images from '../assests/Appimages';
import CustomImage from './customImage';
import Colors from '../config/appTheme';
import {SIZES} from '../constant/sizes';
import navigationServices from '../navigator/navigationServices';

const {width: windowWidth} = Dimensions.get('window');

const VehicleCard = () => {
  const [scaleValue] = useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
      tension: 150,
      friction: 3,
    }).start();
  };

  const handleCardPress = (vehicleType, title) => {
    navigationServices.navigate('RideBooking', {
      vehicleType: vehicleType,
      title: title,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.vehicleMainRow}>
        <TouchableOpacity
          style={styles.leftCardContainer}
          activeOpacity={0.8}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => handleCardPress('car', 'Car Ride')}>
          <Animated.View style={[{transform: [{scale: scaleValue}], flex: 1}]}>
            <LinearGradient
              style={styles.leftBigCard}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={Colors.button_gredient}>
              <View style={styles.bigCardImageBg}>
                <CustomImage
                  style={styles.carImage}
                  source={Images.car_image}
                  resizeMode="cover"
                />
              </View>
            </LinearGradient>
          </Animated.View>
        </TouchableOpacity>

        <View style={styles.rightSmallCards}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleCardPress('cargo', 'Cargo Delivery')}>
            <LinearGradient
              style={styles.smallCard}
              start={{x: 0.5, y: 0}}
              end={{x: 1, y: 1}}
              colors={Colors.red_gredient}>
              <View style={styles.cargoImageContainer}>
                <CustomImage
                  style={styles.image}
                  source={Images.cargo_card}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleCardPress('pet', 'Pet Transport')}>
            <LinearGradient
              style={[styles.smallCard, styles.smallCardMargin]}
              start={{x: 0.5, y: 0}}
              end={{x: 1, y: 1}}
              colors={Colors.red_gredient}>
              <View style={styles.petImageContainer}>
                <CustomImage
                  style={styles.image}
                  source={Images.pet_card}
                  resizeMode="contain"
                />
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleCardPress('pet_delivery', 'Pet Delivery')}>
        <LinearGradient
          style={styles.lastCard}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={Colors.button_gredient}>
          <View style={styles.bigCardImageBg}>
            <CustomImage
              style={styles.petDeliveryImage}
              source={Images.pet_delivery}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: SIZES.base,
  },
  vehicleMainRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.windowWidth * 0.91,
    height: SIZES.windowWidth * 0.52,
  },
  leftCardContainer: {
    width: SIZES.windowWidth * 0.55,
    height: '100%',
  },
  leftBigCard: {
    width: '100%',
    height: '100%',
    borderRadius: SIZES.h12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    backgroundColor: Colors.themeColorLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightSmallCards: {
    width: SIZES.windowWidth * 0.33,
    height: SIZES.windowWidth * 0.52,
    justifyContent: 'space-between',
  },
  smallCard: {
    width: '100%',
    height: SIZES.windowWidth * 0.25,
    borderRadius: SIZES.h12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallCardMargin: {
    marginTop: moderateScale(8, 0.6),
  },
  lastCard: {
    width: SIZES.windowWidth * 0.91,
    height: windowWidth * 0.4,
    borderRadius: SIZES.h12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
    backgroundColor: Colors.themeColorLight,
    marginTop: moderateScale(10, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bigCardImageBg: {
    width: '100%',
    height: '100%',
  },
  carImage: {
    width: '90%',
    height: '90%',
  },
  petDeliveryImage: {
    width: '90%',
    height: '90%',
  },
  cargoImageContainer: {
    width: windowWidth * 0.25,
    height: windowWidth * 0.25,
    alignSelf: 'center',
    top: 10,
  },
  petImageContainer: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.28,
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default VehicleCard;
