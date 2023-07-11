import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    profileImg: '',
};

const profileSlice = createSlice({
    name: 'profileImgState',
    initialState,
    reducers: {
        setProfileImg: (state, action) => {
            return { ...state, profileImg: action.payload };
        },
    },
});

export const { setProfileImg } = profileSlice.actions;
export default profileSlice.reducer;
