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
    },
});

export const { setGraphImg } = graphImgSlice.actions;
export default graphImgSlice.reducer;
