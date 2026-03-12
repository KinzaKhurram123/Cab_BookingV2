import {createSlice, current} from '@reduxjs/toolkit';
import moment from 'moment';

const initialState = {
  userData: {},
  rideStart: false,
  rideData: {},
  riderMode: false,
  riderEventData: {},
  userEventData: {},
  riderModalVisible: false,
  appIsInBackground: false,
  currentLocation: null,
  currentRideId: null,
  currentStatus: null,
  vechicaltype: '',
};
console.log('🚀 ~ currentLocation:', initialState?.currentLocation);
console.log('🚀 ~ userData:', initialState.userData);

const CommonSlice = createSlice({
  name: 'commonReducer',
  initialState: initialState,
  reducers: {
    setRideStart(state, action) {
      state.rideStart = action.payload;
    },
    setRideData(state, action) {
      state.rideData = action.payload;
    },
    setUserData(state, action) {
      state.userData = action?.payload;
    },
    setUserLogOut(state, action) {
      state.userData = {};
    },
    setEventDataRider(state, action) {
      state.riderEventData = action.payload;
      console.log('🚀 ~ setEventDataRider ~ action.payload:', action.payload);
    },
    setAppIsInBackground(state, action) {
      console.log('🚀 ~ setAppIsInBackground ~ action:', action.payload);
      state.appIsInBackground = action.payload;
    },
    setCurrentLocation(state, action) {
      state.currentLocation = action.payload;
    },
    setCurrentRideId(state, action) {
      state.currentRideId = action.payload;
      console.log('🚀 ~ setCurrentRideId ~ action.payload:', action.payload);
    },
    setCurrentStatus(state, action) {
      state.currentStatus = action.payload;
    },
    setRiderMode(state, action) {
      state.riderMode = action.payload;
    },
    setVechicalType(state, action) {
      state.vechicaltype = action.payload;
    },
  },
});

export const {
  setRideStart,
  setUserData,
  setUserLogOut,
  setRideData,
  setEventDataRider,
  setUserEventData,
  setAppIsInBackground,
  setCurrentLocation,
  setCurrentRideId,
  setCurrentStatus,
  setRiderMode,
  setVechicalType,
} = CommonSlice.actions;

export default CommonSlice.reducer;
