/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Advertisement } from "../../../interfaces/Advertisement ";

export interface AdState {
  mode: "create" | "update";
  data: Advertisement;
}

const initialState: AdState = {
  mode: "create",
  data: {
    id: "",
    title: "",
    body: "",
    advertisable_id: "",
    advertisable_type: "",
    images: [],
  },
};

export const adSlice = createSlice({
    name:'ad',
    initialState,
    reducers:{
        setMode: (state, action: PayloadAction<"create" | "update">) => {
            state.mode = action.payload;
        },
        updateAdField:(state, action: PayloadAction<{ field: keyof Advertisement; value: any }>)=>{
            const {field, value}= action.payload;
            state.data[field] = value;
        },
        setAd: (state, action: PayloadAction<Advertisement>) => {
            state.data = action.payload;
            state.mode = "update";
        },
        resetAd: () => initialState,
    }
})

export const {
    setMode,
    updateAdField, 
    setAd, 
    resetAd,
} = adSlice.actions;

export default adSlice.reducer;
