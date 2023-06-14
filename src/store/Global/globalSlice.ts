import { createSlice, PayloadAction } from "@reduxjs/toolkit"




export interface IGlobalState {
    currentItem?: IItem;

}

const initialState: IGlobalState = {
    currentItem: undefined
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        updateCurrentItem: (state, action: PayloadAction<IItem>) => {
            state.currentItem = action.payload
        }
    }
})

export const { updateCurrentItem } = globalSlice.actions