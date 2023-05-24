import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';

export const getDishesList = createAsyncThunk('menu/getDishesList', async (page, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099`);
      console.log(data,"ddddataaaa");
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  })
export const dishesSlice = createSlice({
  name: "dishes",
  initialState: {
    data: [],
    loading: false,
  },
  extraReducers: {
    [getDishesList.pending]: (state, { payload }) => {
        state.loading = true
      },
    [getDishesList.fulfilled]: (state, { payload }) => {
        state.loading = false
        state.data = payload
    },
  },
});

export default dishesSlice.reducer;
