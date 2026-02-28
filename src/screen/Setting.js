import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../config/appTheme';
import Header from '../component/Header';
import {FONTS, SIZES} from '../constant/sizes';
import CustomText from '../component/customText';
import {windowHeight, windowWidth} from '../utility/utils';
import {settings_item} from '../constant/arrays';
import {moderateScale} from 'react-native-size-matters';
import CustomImage from '../component/customImage';
import SettingItem from '../component/settingItems';

const Setting = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}>
      <Header headerColor={Colors.white} hideUser={true} />
      <View style={styles.main_view}>
        <CustomText style={styles.heading} isBold>
          Settings
        </CustomText>
        <FlatList
          data={settings_item}
          renderItem={({item}) => {
            return <SettingItem item={item} />;
          }}
        />
      </View>
    </ScrollView>
  );
};

export default Setting;

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
    backgroundColor: Colors.lightGrey,
    marginTop: SIZES.padding2,
    paddingHorizontal: moderateScale(8, 0.6),
    paddingVertical: SIZES.padding,
    borderRadius: moderateScale(10, 0.8),
    justifyContent: 'space-between',
    alignSelf: 'center',
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
