import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../config/appTheme';
import Header from '../component/Header';
import {FONTS, SIZES} from '../constant/sizes';
import CustomText from '../component/customText';
import {windowHeight, windowWidth} from '../utility/utils';
import {notifications} from '../constant/arrays';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../component/customImage';

const NotificationScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}>
      <Header headerColor={Colors.white} hideUser={true} />
      <View style={styles.main_view}>
        <CustomText style={styles.heading} isBold>
          Notifications
        </CustomText>
        <CustomText
          style={{
            ...FONTS.UrbanistLight14,
            textAlign: 'left',
            width: windowWidth * 0.9,
            color: Colors.veryLightGray,
          }}>
          you have one Unread notification
        </CustomText>
        <FlatList
          data={notifications}
          style={{
            flex: 1,
            paddingBottom: moderateScale(10, 0.6),
          }}
          contentContainerStyle={{
            flex: 1,
            paddingBottom: moderateScale(10, 0.6),
          }}
          renderItem={({item}) => {
            return (
              <View
                style={[
                  styles.card_view,
                  {
                    backgroundColor: item?.background,
                    borderColor: item?.border,
                    borderWidth: 1,
                  },
                ]}>
                <View>
                  <CustomText
                    isBold
                    style={{
                      ...FONTS.Bold13,
                    }}>
                    {item?.title}
                  </CustomText>
                  <CustomText
                    style={
                      ([
                        {
                          color: Colors.mediumGray,
                          width: '90%',
                        },
                      ],
                      item?.type === 'ride_request'
                        ? {...FONTS.UrbanistLight11}
                        : {...FONTS.Regular13})
                    }>
                    {item?.message}
                  </CustomText>
                  {item?.type === 'ride_request' && (
                    <View
                      style={[
                        styles.row_view,
                        {
                          justifyContent: 'flex-start',
                          width: windowWidth * 0.5,
                        },
                      ]}>
                      <CustomText
                        isBold
                        style={{
                          ...FONTS.UrbanistLight11,
                          color: Colors.black,
                        }}>
                        {'from :'}
                      </CustomText>
                      <CustomText
                        style={{
                          ...FONTS.UrbanistLight11,
                          color: Colors.mediumGray,
                          marginLeft: moderateScale(3, 0.5),
                        }}>
                        {item?.location?.pickup}
                      </CustomText>
                      <CustomText
                        isBold
                        style={{
                          ...FONTS.UrbanistLight11,
                          color: Colors.black,
                          marginLeft: moderateScale(10, 0.5),
                        }}>
                        {'To :'}
                      </CustomText>
                      <CustomText
                        style={{
                          ...FONTS.UrbanistLight11,
                          color: Colors.mediumGray,
                          marginLeft: moderateScale(3, 0.5),
                        }}>
                        {item?.location?.pickup}
                      </CustomText>
                    </View>
                  )}
                </View>
                <CustomText
                  style={{
                    ...FONTS.UrbanistLight11,
                    color: Colors.mediumGray,
                    top: 10,
                    position: 'absolute',
                    right: 10,
                  }}>
                  {item?.time}
                </CustomText>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default NotificationScreen;

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
    paddingTop: SIZES.padding2,
  },
  heading: {
    ...FONTS.Bold18,
    color: Colors.black,
    textAlign: 'left',
    width: windowWidth * 0.9,
    marginTop: SIZES.padding2,
  },
  card_view: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.22,
    backgroundColor: Colors.white,
    marginTop: SIZES.padding,
    paddingHorizontal: moderateScale(8, 0.6),
    paddingVertical: SIZES.padding,
    borderRadius: moderateScale(10, 0.8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
});
