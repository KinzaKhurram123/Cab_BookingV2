import {Alert, Platform, ToastAndroid} from 'react-native';
import {Post} from '../../axios/AxiosInterceptorFunction';
import navigationServices from '../../navigator/navigationServices';
import {setUserToken} from '../../store/slices/auth-slice';
import {setUserData} from '../../store/slices/common';
import {
  code_url,
  edit_profile,
  forgetPswrd_url,
  login_url,
  reset_pswrd,
  signup_url,
} from '../endpoints';
import {apiHeader} from '../../utility/utils';

export const onPressLogin = async ({
  setLoading,
  body,
  dispatch,
  navigation,
}) => {
  setLoading(true);
  for (let key in body) {
    if (body[key] == '') {
      setLoading(false);
      return Platform.OS == 'android'
        ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
        : Alert.alert(`${key} is required`);
    }
  }

  const response = await Post(login_url, body, apiHeader());
  console.log(response?.data, 'response?.dataaaaaaaa');
  if (response != undefined) {
    await dispatch(setUserToken({token: response?.data?.token}));
    await dispatch(setUserData(response?.data));
    ToastAndroid.show(`Login SuccessFully`, ToastAndroid.SHORT);
  } else {
    ToastAndroid.show('Login Failed', ToastAndroid.SHORT);
  }

  setLoading(false);
};

export const onPressSignup = async ({setLoading, body, dispatch}) => {
  setLoading(true);
  for (let key in body) {
    if (body[key] == '') {
      return Platform.OS == 'android'
        ? ToastAndroid.show(`${key} is required`, ToastAndroid.SHORT)
        : Alert.alert(`${key} is required`);
    }
  }
  const response = await Post(signup_url, body, apiHeader());
  setLoading(false);
  if (response != undefined) {
    setLoading(false);
    navigationServices.navigate('DrawerNavigators');
    console.log(response?.data, 'dataaaaaaaaa');
    dispatch(setUserToken({token: response?.data?.token}));
    dispatch(setUserData(response?.data));
    Platform.OS == 'android'
      ? ToastAndroid.show(`Signup SuccessFully`, ToastAndroid.SHORT)
      : Alert.alert(`Signup SuccessFully`);
  }
};

export const onPressForgetPassword = async ({setLoading, body, dispatch}) => {
  console.log(body, 'body');
  setLoading(true);
  const response = await Post(forgetPswrd_url, body, apiHeader());
  console.log(response?.data, 'reponse?.dataaaaaaaa');
  setLoading(false);
  if (response != undefined) {
    Platform.OS == 'android'
      ? ToastAndroid.show(`OTP sent to ${body?.email}`, ToastAndroid.SHORT)
      : Alert.alert(`OTP sent to ${body?.email}`);
    navigationServices.navigate('OtpScreen', {
      data: response?.data,
    });
  }
};

export const onPressCodeCheck = async ({setLoading, body, dispatch}) => {
  console.log(body, 'body');
  setLoading(true);
  const response = await Post(code_url, body, apiHeader());
  console.log(response?.data, 'reponse?.dataaaaaaaa');
  setLoading(false);
  if (response != undefined) {
    Platform.OS == 'android'
      ? ToastAndroid.show(`otp verified Succcessfully`, ToastAndroid.SHORT)
      : Alert.alert(`otp verified Succcessfully`);
    navigationServices.navigate('ResetPassword', {email: body?.email});
  }
};

export const onPressResetPassword = async ({setLoading, body, dispatch}) => {
  console.log(body, 'body');
  setLoading(true);
  const response = await Post(reset_pswrd, body, apiHeader());
  console.log(response?.data, 'reponse?.dataaaaaaaa');
  setLoading(false);
  if (response != undefined) {
    Platform.OS == 'android'
      ? ToastAndroid.show(`Reset Password Succcessfully`, ToastAndroid.SHORT)
      : Alert.alert(`Reset Password Succcessfully`);
    navigationServices.navigate('LoginScreen');
  }
};

export const onPressEditProfile = async ({setLoading, body, dispatch}) => {
  console.log(body, 'body');
  setLoading(true);
  const response = await Post(edit_profile, body, apiHeader());
  console.log(response?.data, 'reponse?.dataaaaaaaa');
  setLoading(false);
  if (response != undefined) {
    dispatch(setUserData(response?.data));
    Platform.OS == 'android'
      ? ToastAndroid.show(
          `Update Your Profile Successfully`,
          ToastAndroid.SHORT,
        )
      : Alert.alert(`Update Your Profile Successfully`);
  }
};

// export const onUploadImage = async ({setLoading, body, dispatch}) => {
//   console.log(body, 'body');
//   setLoading(true);
//   const response = await Post(reset_pswrd, body, apiHeader());
//   console.log(response?.data, 'reponse?.dataaaaaaaa');
//   setLoading(false);
//   if (response != undefined) {
//     Platform.OS == 'android'
//       ? ToastAndroid.show(`Reset Password Succcessfully`, ToastAndroid.SHORT)
//       : Alert.alert(`Reset Password Succcessfully`);
//     navigationServices.navigate('LoginScreen');
//   }
// };
