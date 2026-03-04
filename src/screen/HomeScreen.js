import {Icon} from 'native-base';
import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Images from '../assests/Appimages';
import CustomImage from '../component/customImage';
import CustomText from '../component/customText';
import VehicleCard from '../component/vehicleCard';
import Colors from '../config/appTheme';
import {rideHistory} from '../constant/arrays';
import {FONTS, SIZES} from '../constant/sizes';
import {windowWidth} from '../utility/utils';
import Header from '../component/Header';

const HomeScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}>
      <Header headerColor={Colors.white} hideUser={true} />

      <View style={styles.header_view}>
        <View
          style={[
            styles.row_view,
            {
              justifyContent: 'space-between',
              paddingHorizontal: SIZES.padding2,
            },
          ]}>
          <View>
            <View style={styles.row_view}>
              <CustomText isBold style={styles.heading}>
                Hello{' '}
              </CustomText>
              <CustomText isBold style={styles.name_heading}>
                Path Jhonson
              </CustomText>
            </View>
            <CustomText style={styles.text}>Jhonson@gmail.com</CustomText>
          </View>
          <View style={styles.image_view}>
            <CustomImage
              source={Images.user_image2}
              style={[
                styles.image,
                {
                  borderRadius: SIZES.windowWidth / 2,
                },
              ]}
            />
          </View>
        </View>

        <View style={styles.search_view}>
          <Icon
            name="location"
            as={Ionicons}
            size={SIZES.padding + 5}
            color={Colors.red}
          />
          <View style={{marginLeft: SIZES.padding2}}>
            <CustomText style={styles.location_heading} isBold>
              Yellowstone National Park
            </CustomText>
            <CustomText style={styles.location_text}>
              Wyoming, Montana, Idaho
            </CustomText>
          </View>
        </View>
      </View>

      <View style={styles.sub_view}>
        <CustomText style={styles.title} isBold>
          Let's Book Your Ride :
        </CustomText>

        <VehicleCard />

        <CustomText style={[styles.title, {marginTop: SIZES.padding}]} isBold>
          Past Rides :
        </CustomText>
        <FlatList
          data={rideHistory}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.past_ride_card}>
                <View style={styles.history_image}>
                  <Icon
                    name="location-outline"
                    as={Ionicons}
                    size={SIZES.padding + 10}
                    color={Colors.red}
                  />
                </View>
                <View
                  style={{
                    width: '78%',
                  }}>
                  <CustomText isBold style={styles.history_title}>
                    {item?.to}
                  </CustomText>
                  <CustomText style={styles.history_txt}>
                    {item?.from}
                  </CustomText>
                </View>
                <CustomText style={styles.date}>{item?.date}</CustomText>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    backgroundColor: Colors.white,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  header_view: {
    width: SIZES.windowWidth * 0.92,
    height: SIZES.windowHeight * 0.22,
    backgroundColor: Colors.white,
    alignSelf: 'center',
    marginTop: SIZES.padding2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: SIZES.padding,
    paddingVertical: SIZES.padding2,
    borderTopWidth: 6,
    borderTopColor: Colors.themeColor,
  },
  sub_view: {
    width: SIZES.windowWidth,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  heading: {
    ...FONTS.Bold22,
    color: Colors.black,
  },
  name_heading: {
    ...FONTS.Bold22,
    color: Colors.themeColor,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  text: {
    ...FONTS.Medium12,
    color: Colors.mediumGray,
    textTransform: 'lowercase',
  },
  image_view: {
    width: SIZES.windowWidth * 0.18,
    height: SIZES.windowWidth * 0.18,
    borderRadius: SIZES.windowWidth / 2,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  search_view: {
    width: SIZES.windowWidth * 0.86,
    height: SIZES.windowWidth * 0.17,
    backgroundColor: Colors.lightGrey,
    alignSelf: 'center',
    marginTop: SIZES.padding2,
    borderRadius: SIZES.padding2,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: SIZES.padding2,
  },
  location_heading: {
    ...FONTS.Regular12,
    color: Colors.black,
  },
  location_text: {
    ...FONTS.UrbanistLight10,
    color: Colors.veryLightGray,
  },
  title: {
    ...FONTS.Bold16,
    color: Colors.black,
    marginBottom: SIZES.h20,
  },
  flatListStyle: {
    width: SIZES.windowWidth,
    marginTop: SIZES.h10,
  },
  flatListContent: {
    paddingRight: SIZES.h20,
  },
  vehicleCard: {
    width: SIZES.windowWidth * 0.47,
    height: SIZES.windowWidth * 0.5,
    backgroundColor: Colors.lightGrey,
    marginRight: SIZES.h12,
    borderRadius: SIZES.h12,
    overflow: 'hidden',
  },
  emptyContainer: {
    width: '100%',
    height: SIZES.windowWidth * 0.32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.lightGrey,
    borderRadius: SIZES.h12,
    marginTop: SIZES.h10,
  },
  location: {
    ...FONTS.Regular12,
    color: Colors.grey,
  },
  date: {
    ...FONTS.Regular11,
    color: Colors.veryLightGray,
    paddingRight: SIZES.padding2,
    position: 'absolute',
    top: 10,
    right: 0,
  },
  past_ride_card: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.2,
    backgroundColor: Colors.lightGrey,
    marginBottom: SIZES.padding2,
    paddingHorizontal: SIZES.base,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: SIZES.padding2,
    flexDirection: 'row',
  },
  history_image: {
    width: windowWidth * 0.16,
    height: windowWidth * 0.16,
    backgroundColor: Colors.white,
    borderRadius: windowWidth / 2,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,
    elevation: 13,
  },
  history_title: {
    ...FONTS.Bold12,
    color: Colors.black,
    width: '70%',
  },
  history_txt: {
    ...FONTS.Medium11,
    color: Colors.mediumGray,
    width: '80%',
  },
});
