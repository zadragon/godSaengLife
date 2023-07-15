import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    graphImg: '',
};

const graphImgSlice = createSlice({
    name: 'graphImgState',
    initialState,
    reducers: {
        setGraphImg: (state, action) => {
            return { ...state, graphImg: action.payload };
        },
        initGraphImg: () => {
            return { ...initialState };
        },
    },
});

export const { setGraphImg, initGraphImg } = graphImgSlice.actions;
export default graphImgSlice.reducer;
