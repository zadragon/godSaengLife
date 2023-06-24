import { configureStore } from '@reduxjs/toolkit';
import profileImgState from '../modules/auth';
const store = configureStore({
    reducer: { profileImgState },
});

export default store;
