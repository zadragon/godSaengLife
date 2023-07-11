import { configureStore } from '@reduxjs/toolkit';
import profileImgState from '../modules/auth';
import graphImgState from '../modules/community';
const store = configureStore({
    reducer: { profileImgState, graphImgState },
});

export default store;
