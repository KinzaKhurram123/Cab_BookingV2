import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../config/appTheme';
import Header from '../component/Header';
import {FONTS, SIZES} from '../constant/sizes';
import CustomText from '../component/customText';
import {windowHeight, windowWidth} from '../utility/utils';
import {history} from '../constant/arrays';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../component/customImage';

const HistoryScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}>
      <Header title={'History'} headerColor={Colors.white} hideUser={true} />
      <View style={styles.main_view}>
        <CustomText style={styles.heading} isBold>
          Your privious Ride history
        </CustomText>
        <FlatList
          data={history}
          style={{
            height: windowHeight,
            width: windowWidth,
          }}
          contentContainerStyle={{
            flex: 1,
          }}
          renderItem={({item}) => {
            return (
              <View
                style={[
                  styles.card_view,
                  {
                    borderColor:
                      item?.status === 'Cancel'
                        ? Colors.red
                        : Colors.themeColorLight,
                    backgroundColor:
                      item?.status === 'Cancel'
                        ? 'rgba(218, 48, 41,0.2)'
                        : 'rgba(70, 204, 0,0.2)',
                  },
                ]}>
                <View style={styles.image_view}>
                  <CustomImage source={item?.image} style={styles.image} />
                </View>
                <View style={{width: '55%'}}>
                  <CustomText style={{...FONTS.Bold12}} isBold>
                    {item?.from}
                  </CustomText>
                  <CustomText
                    style={{...FONTS.Bold12, marginTop: moderateScale(6, 0.6)}}
                    isBold>
                    {item?.to}
                  </CustomText>
                  <View
                    style={[
                      styles.row_view,
                      {marginTop: moderateScale(5, 0.6)},
                    ]}>
                    <CustomText
                      style={{...FONTS.Bold11, color: Colors.veryLightGray}}
                      isBold>
                      {'status :'}
                    </CustomText>
                    <CustomText
                      style={{
                        ...FONTS.Bold11,
                        marginLeft: moderateScale(5, 0.6),
                      }}>
                      {item?.status}
                    </CustomText>
                  </View>
                </View>
                <View>
                  <CustomText
                    style={{
                      ...FONTS.UrbanistLight11,
                      bottom: 12,
                    }}>
                    {item?.date}
                  </CustomText>
                  <CustomText
                    isBold
                    style={{
                      ...FONTS.Bold18,
                    }}>
                    {'$ ' + item?.fare}
                  </CustomText>
                </View>
              </View>
            );
          }}
        />
      </View>
    </ScrollView>
  );
};

export default HistoryScreen;

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
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 6,
    // },
    // shadowOpacity: 0.39,
    // shadowRadius: 8.3,
    // elevation: 13,
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
