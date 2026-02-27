import Images from '../assests/Appimages';
import navigationServices from '../navigator/navigationServices';

export const social_logins = [
  {
    id: 1,
    name: 'google',
    image: Images.google_icon,
  },
  {
    id: 2,
    name: 'facebook',
    image: Images.facebook_icon,
  },
  {
    id: 3,
    name: 'apple',
    image: Images.apple_icon,
  },
];

export const dummyUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
];

export const rideHistory = [
  { id: 1, from: 'Grand Canyon', to: 'Yellowstone National Park', date: '2025-02-24', fare: 250 },
  { id: 2, from: 'Mesa Verde National Park', to: 'Yellowstone National Park', date: '2025-02-23', fare: 180 },
  { id: 3, from: 'Mesa Verde National Park', to: 'Yellowstone National Park', date: '2025-02-23', fare: 180 },
];

export const carsList = [
  { id: 1, model: 'Toyota Corolla', plate: 'ABC-123', type: 'Sedan' },
  { id: 2, model: 'Honda Civic', plate: 'XYZ-789', type: 'Sedan' },
];

export const vehicle_list = [
  {
    id: 1,
    image: Images.cab_card,
    title: 'Cab \nBooking',
  },
  {
    id: 2,
    image: Images.cargo_card,
    title: 'Parcel \nDelivery',
  },
  {
    id: 3,
    image: Images.pet_card,
    title: 'Pet \nDelivery',
  },
];

export const wallet_list = [
  { id: 1, from: 'Today Earnings', fare: 250 },
  { id: 1, from: 'Deposit', fare: 250 },
];


export const drawer_items = [
  {
    id: 1,
    name: 'Home',
    onPress: () => {
      navigationServices.navigate('Home');
    },
  },
  {
    id: 2,
    name: 'Wallet',
    onPress: () => {
      navigationServices.navigate('WalletScreen');
    },
  },
  {
    id: 3,
    name: 'History',
    onPress: () => {
      navigationServices.navigate('HistoryScreen');
    },
  },
  {
    id: 5,
    name: 'Change Password',
    onPress: () => {
      navigationServices.navigate('ChangeScreen');
    },
  },
  {
    id: 6,
    name: 'Privacy Policy',
    onPress: () => {
      navigationServices.navigate('PrivacyPolicy');
    },
  },
  {
    id: 7,
    name: 'Terms & Conditions',
    onPress: () => {
      navigationServices.navigate('TermsAndConditions');
    },
  },
];

export default {
  social_logins,
  dummyUsers,
  rideHistory,
  carsList,
  drawer_items,
  vehicle_list
};