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
import {Icon} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SaveAddress = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}>
      <Header
        title={'Saved Locations'}
        headerColor={Colors.white}
        hideUser={true}
      />
      <View style={styles.main_view}>
        <CustomText style={styles.heading} isBold>
          My Saved addresses :
        </CustomText>
        <View style={styles.card_view}>
          <Icon
            name="bookmark"
            as={FontAwesome5}
            size={moderateScale(20, 0.6)}
            color={Colors.red}
          />
          <CustomText
            style={{
              ...FONTS.UrbanistLight13,
              color: Colors.mediumGray,
              textAlign: 'left',
              width: '80%',
            }}>
            Add Address
          </CustomText>
          <Icon
            name="plus"
            as={FontAwesome5}
            size={moderateScale(20, 0.6)}
            color={Colors.mediumGray}
          />
        </View>
        <View style={styles.card_view}>
          <Icon
            name="home"
            as={Ionicons}
            size={moderateScale(20, 0.6)}
            color={Colors.red}
          />
          <CustomText
            style={{
              ...FONTS.UrbanistLight13,
              color: Colors.mediumGray,
              textAlign: 'left',
              width: '80%',
            }}>
            Add Home Address
          </CustomText>
          <Icon
            name="plus"
            as={FontAwesome5}
            size={moderateScale(20, 0.6)}
            color={Colors.mediumGray}
          />
        </View>
        <View style={styles.card_view}>
          <Icon
            name="building"
            as={FontAwesome5}
            size={moderateScale(20, 0.6)}
            color={Colors.red}
          />
          <CustomText
            style={{
              ...FONTS.UrbanistLight13,
              color: Colors.mediumGray,
              textAlign: 'left',
              width: '80%',
            }}>
            Add Work Address
          </CustomText>
          <Icon
            name="plus"
            as={FontAwesome5}
            size={moderateScale(20, 0.6)}
            color={Colors.mediumGray}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default SaveAddress;

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
    width: windowWidth * 0.98,
    height: windowWidth * 0.18,
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    paddingVertical: SIZES.padding,
    borderRadius: moderateScale(10, 0.8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.2,
    borderTopColor: Colors.lightGrey,
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
