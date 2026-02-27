import { FlatList, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import CustomButton from '../component/customButton';
import CustomText from '../component/customText';
import Header from '../component/Header';
import TextInputWithTitle from '../component/textInputWithTitle';
import Colors from '../config/appTheme';
import { FONTS, SIZES } from '../constant/sizes';
import navigationServices from '../navigator/navigationServices';
import { Icon, View } from 'native-base';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { windowWidth } from '../utility/utils';
import { mode } from 'native-base/lib/typescript/theme/tools';
import CustomImage from '../component/customImage';
import Images from '../assests/Appimages';
import { wallet_list } from '../constant/arrays';

const WalletScreen = () => {
  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      showsVerticalScrollIndicator={true}
    >
      <Header headerColor={Colors.white} hideUser={true} />
      <View
        style={styles.gradient}
      >
        <View style={styles.row_view}>
          <CustomText
            isBold
            style={{
              ...FONTS.Bold24,
              color: Colors.black,
              paddingVertical: SIZES.padding2,
              textAlign: 'left',
              width: '95%'
            }}
          >
            My Wallet
          </CustomText>
          <View style={{ width: windowWidth * 0.08, height: windowWidth * 0.08, backgroundColor: Colors.lightGrey, borderRadius: windowWidth / 2, justifyContent: 'center', alignItems: 'center' }} >
            <Icon name='check' as={FontAwesome} size={SIZES.padding} color={Colors.themeColor} />
          </View>
        </View>
        <View style={styles.header_view}>
          <View style={{ width: "50%" }}>
            <CustomText style={styles.heading}>
              Your Balance
            </CustomText>
            <CustomText style={styles.price_heading} isBold>
              $ 100.00
            </CustomText>
          </View>
          <View style={styles.image_view}>
            <CustomImage source={Images.card} style={styles.image} resizeMode={'contain'} />
          </View>
        </View>
        <FlatList
          data={wallet_list}
          style={{
            marginTop: windowWidth * 0.2
          }}
          horizontal
          renderItem={((item) => {
            return (
              <View style={{
                width: windowWidth * 0.45,
                height: windowWidth * 0.3,
                backgroundColor: 'rgba(70, 204, 0,0.2)',
                marginRight: SIZES.radius_sm,
                borderRadius: SIZES.padding2
              }}>

              </View>
            )
          })}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: SIZES.base,
    backgroundColor: Colors.white,
  },
  text: {
    color: Colors.veryLightGray,
    width: '95%',
    ...FONTS.Regular14,
    textAlign: 'left',
  },
  heading: {
    color: Colors.darkGray,
    marginTop: SIZES.base,
    textAlign: 'left',
    width: SIZES.windowWidth * 0.9,
    ...FONTS.Bold22,
    marginLeft: SIZES.padding
  },
  input_container: {
    borderTopWidth: 6,
    borderTopColor: Colors.themeColor,
    borderRadius: 20,
    width: SIZES.windowWidth * 0.95,
    alignItems: 'center',
    paddingTop: SIZES.h16,
    paddingHorizontal: SIZES.h10,
    backgroundColor: 'rgba(199, 199, 198, 0.2)',
    marginTop: SIZES.padding,
    paddingVertical: SIZES.windowWidth * 0.05,
  },
  header_view: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.35,
    borderRadius: SIZES.padding,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SIZES.padding
  },
  row_view: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: SIZES.windowWidth * 0.3,
  },
  forgotpassword: {
    ...FONTS.Medium13,
    color: Colors.themeColor,
    textAlign: 'right',
    width: '95%',
    paddingVertical: SIZES.base,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  image_view: {
    width: SIZES.windowWidth * 0.5,
    height: SIZES.windowWidth * 0.5,
    backgroundColor: Colors.white,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    marginTop: SIZES.padding * 2,
    borderTopLeftRadius: SIZES.padding + 10,
    borderBottomLeftRadius: SIZES.padding + 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: SIZES.padding + 10,
    borderBottomLeftRadius: SIZES.padding + 10,
  },
  lines: {
    borderWidth: 0.5,
    borderColor: Colors.veryLightGray,
    width: '30%',
    backgroundColor: Colors.veryLightGray,
    marginHorizontal: SIZES.padding2,
  },
  do_text: {
    letterSpacing: 0.5,
    color: Colors.darkGray,
    ...FONTS.Medium14,
  },
  Sign_text: {
    color: Colors.themeColor,
    ...FONTS.Bold18,
    marginLeft: SIZES.radius_sm,
  },
  price_heading: {
    color: Colors.themeColor,
    marginTop: SIZES.base,
    textAlign: 'left',
    width: SIZES.windowWidth * 0.9,
    ...FONTS.Bold26,
    marginLeft: SIZES.padding
  }
});

export default WalletScreen;
