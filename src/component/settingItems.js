import {Badge, Checkbox, Icon, Switch} from 'native-base';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import CustomText from '../component/customText';
import Colors from '../config/appTheme';
import {FONTS, SIZES} from '../constant/sizes';
import {windowWidth} from '../utility/utils';
const SettingItem = ({item}) => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [displayTraffic, setDisplayTraffic] = useState(false);
  const [dontCallMe, setDontCallMe] = useState(false);
  const [shareLocation, setShareLocation] = useState(false);
  const [appLanguage, setAppLanguage] = useState('English');

  return (
    <View style={styles.card_view}>
      <View>
        <CustomText isBold style={styles.heading}>
          {item?.title}
        </CustomText>
        {item?.description ? (
          <CustomText style={styles.description}>
            {item?.description}
          </CustomText>
        ) : (
          <CustomText style={styles.description}>{item?.status}</CustomText>
        )}
      </View>
      {item?.check ? (
        <Switch
          value={item?.check}
          //   onValueChange={onValueChange}
          trackColor={{false: '#E0E0E0', true: '#34C759'}}
          thumbColor={'#FFFFFF'}
          ios_backgroundColor="#E0E0E0"
          disabled
        />
      ) : (
        <Icon
          name="chevron-right"
          as={Entypo}
          size={moderateScale(20, 0.6)}
          color={Colors.veryLightGray}
        />
      )}
    </View>
  );
};

export default SettingItem;

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
    ...FONTS.Bold13,
    color: Colors.black,
    textAlign: 'left',
  },
  card_view: {
    width: windowWidth * 0.9,
    backgroundColor: Colors.white,
    marginTop: SIZES.padding2,
    paddingHorizontal: moderateScale(8, 0.6),
    paddingVertical: SIZES.padding2,
    borderRadius: moderateScale(10, 0.8),
    justifyContent: 'space-between',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBlockColor: Colors.lightGrey,
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  description: {
    ...FONTS.Regular12,
    width: windowWidth * 0.7,
  },
});
