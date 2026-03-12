// screens/rider/EditProfile.js
import {Icon, theme} from 'native-base';
import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {moderateScale} from 'react-native-size-matters';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Images from '../assests/Appimages';
import CustomButton from '../component/customButton';
import CustomImage from '../component/customImage';
import CustomText from '../component/customText';
import Header from '../component/Header';
import TextInputWithTitle from '../component/textInputWithTitle';
import {FONTS, SIZES} from '../constant/sizes';
import {useTheme} from '../context/ThemeContext';
import {windowWidth} from '../utility/utils';
import axios from 'axios';
import {onPressEditProfile} from '../apisConfig/auth';
import {useDispatch, useSelector} from 'react-redux';

const EditProfile = () => {
  const {theme} = useTheme();
  const [profileImage, setProfileImage] = useState(Images.driver1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone_number, setphoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(profileImage, 'profileImage');
  const dispatch = useDispatch();
  const userData = useSelector(state => state.commonReducer.userData);

  const handleImagePick = setter => {
    const options = {
      mediaType: 'photo',
      quality: 0.8,
      includeBase64: false,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        try {
          const imageUri = response.assets[0].uri;
          console.log('Selected image URI:', imageUri);
          const formData = new FormData();
          formData.append('profileImage', {
            uri: imageUri,
            type: response.assets[0].type,
            name: response.assets[0].fileName || 'profile.jpg',
          });
          const uploadResponse = await axios.post(
            'https://yourapi.com/api/user/upload-profile-image',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${yourToken}`,
              },
            },
          );
          console.log('Upload successful:', uploadResponse.data);
          setUserProfile(prev => ({
            ...prev,
            profileImage: uploadResponse.data.profileImage.url,
          }));
        } catch (error) {
          console.error('Upload failed:', error);
        }
      }
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <Header headerColor={theme.background} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileImageSection}>
          <View
            style={[styles.imageContainer, {backgroundColor: theme.border}]}>
            <CustomImage
              source={profileImage ? profileImage : Images.no_user_image}
              style={[styles.profileImage]}
            />
            <TouchableOpacity
              style={[styles.editImageBtn, {backgroundColor: theme.primary}]}
              onPress={() => handleImagePick(setProfileImage)}>
              <Icon
                as={MaterialIcons}
                name="edit"
                size={moderateScale(16, 0.6)}
                color={theme.white}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <TextInputWithTitle
            title="Full Name"
            placeholder={userData?.name}
            viewHeight={0.075}
            value={name}
            setText={setName}
            viewWidth={0.93}
            inputWidth={0.93}
            fontSize={SIZES.h12}
            borderRadius={10}
            backgroundColor={theme.card}
            marginTop={SIZES.h10}
            placeholderColor={theme.mediumGray}
            borderColor={theme.primary}
            inputStyle={{
              borderBottomWidth: 2,
              borderBottomColor: theme.border,
            }}
            titleStyle={{color: theme.text}}
          />

          <TextInputWithTitle
            title="Email Address"
            placeholder={userData?.email}
            value={email}
            setText={setEmail}
            viewHeight={0.075}
            viewWidth={0.93}
            inputWidth={0.93}
            fontSize={SIZES.h12}
            borderRadius={10}
            backgroundColor={theme.card}
            marginTop={SIZES.h10}
            placeholderColor={theme.mediumGray}
            borderColor={theme.primary}
            inputStyle={{
              borderBottomWidth: 2,
              borderBottomColor: theme.border,
            }}
            titleStyle={{color: theme.text}}
            keyboardType="email-address"
          />

          <TextInputWithTitle
            title="Phone Number"
            placeholder={
              userData?.phoneNumber
                ? userData?.phoneNumber
                : 'Enter your phone number'
            }
            value={phone_number}
            setText={setphoneNumber}
            viewHeight={0.075}
            viewWidth={0.93}
            inputWidth={0.93}
            fontSize={SIZES.h12}
            borderRadius={10}
            backgroundColor={theme.card}
            marginTop={SIZES.h10}
            placeholderColor={theme.mediumGray}
            borderColor={theme.primary}
            inputStyle={{
              borderBottomWidth: 2,
              borderBottomColor: theme.border,
            }}
            titleStyle={{color: theme.text}}
            keyboardType="phone-pad"
          />
        </View>
        <TextInputWithTitle
          title="City"
          placeholder={userData?.city ? userData?.city : 'Enter your city name'}
          value={city}
          setText={setCity}
          viewHeight={0.075}
          viewWidth={0.92}
          inputWidth={0.92}
          fontSize={SIZES.h12}
          borderRadius={10}
          backgroundColor={theme.card}
          marginTop={SIZES.base}
          placeholderColor={theme.mediumGray}
          borderColor={theme.primary}
          inputStyle={{
            borderBottomWidth: 2,
            borderBottomColor: theme.border,
          }}
          titleStyle={{color: theme.text}}
        />
        <TextInputWithTitle
          title="ZIP / Postal Code"
          placeholder={userData?.zipPostelCode ? userData?.zipPostelCode : 'Enter your  Postal Code'}
          viewHeight={0.075}
          value={zipCode}
          setText={setZip}
          viewWidth={0.92}
          inputWidth={0.92}
          fontSize={SIZES.h12}
          borderRadius={10}
          backgroundColor={theme.card}
          marginTop={SIZES.h10}
          placeholderColor={theme.mediumGray}
          borderColor={theme.primary}
          inputStyle={{
            borderBottomWidth: 2,
            borderBottomColor: theme.border,
          }}
          titleStyle={{color: theme.text}}
        />
        <CustomButton
          text="Update Profile"
          textColor={theme.white}
          width={SIZES.windowWidth * 0.9}
          height={SIZES.windowHeight * 0.07}
          bgColor={theme.button_gredient || ['#46cc00', '#339500']}
          borderRadius={SIZES.h16}
          isBold
          isGradient
          loader={loading}
          onPress={() =>
            onPressEditProfile({
              setLoading,
              body: {
                name: name,
                email: email,
                phoneNumber: phone_number,
                zipPostelCode: zipCode,
                city: city,
              },
              dispatch,
            })
          }
          marginTop={moderateScale(10, 0.6)}
          elevation
          btn_style={{
            ...FONTS.Regular14,
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: moderateScale(20, 0.6),
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth * 0.92,
    padding: moderateScale(15, 0.6),
    borderRadius: moderateScale(10, 0.6),
    marginTop: SIZES.base,
    marginBottom: SIZES.padding,
    alignSelf: 'center',
  },
  toggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  onlineDot: {
    width: moderateScale(10, 0.6),
    height: moderateScale(10, 0.6),
    borderRadius: moderateScale(5, 0.6),
    marginRight: moderateScale(8, 0.6),
  },
  toggleText: {
    ...FONTS.Medium14,
  },
  profileImageSection: {
    marginBottom: SIZES.padding,
    marginTop: moderateScale(15, 0.7),
  },
  imageContainer: {
    borderRadius: windowWidth / 2,
  },
  profileImage: {
    width: moderateScale(100, 0.6),
    height: moderateScale(100, 0.6),
    borderRadius: moderateScale(50, 0.6),
    borderWidth: 2,
  },
  editImageBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: moderateScale(30, 0.6),
    height: moderateScale(30, 0.6),
    borderRadius: moderateScale(15, 0.6),
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageHint: {
    ...FONTS.Regular11,
    marginTop: moderateScale(5, 0.6),
  },
  section: {
    width: windowWidth * 0.93,
    marginBottom: SIZES.padding,
    alignSelf: 'center',
  },
  sectionTitle: {
    ...FONTS.Bold18,
    marginBottom: SIZES.base,
  },
  rowInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfInput: {
    width: '48%',
  },
  vehicleImageSection: {
    marginBottom: SIZES.base,
  },
  vehicleLabel: {
    ...FONTS.Regular12,
    marginBottom: moderateScale(5, 0.6),
  },
  vehicleImageContainer: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.2,
    borderRadius: moderateScale(8, 0.6),
    overflow: 'hidden',
    position: 'relative',
  },
  vehicleImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  vehicleEditOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  docItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: moderateScale(12, 0.6),
    borderRadius: moderateScale(8, 0.6),
    marginBottom: moderateScale(8, 0.6),
  },
  docLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  docInfo: {
    marginLeft: moderateScale(10, 0.6),
  },
  docName: {
    ...FONTS.Medium13,
  },
  docStatus: {
    ...FONTS.Regular11,
  },
});

export default EditProfile;
