import { createSlice, PayloadAction } from "@reduxjs/toolkit"




export interface IGlobalState {
    currentItem?: IItem;
    currentActor?: IActorItem;
}

const initialState: IGlobalState = {
    currentItem: undefined,
    currentActor: undefined
}

export const globalSlice = createSlice({
    name: "global",
    initialState,
    reducers: {
        updateCurrentItem: (state, action: PayloadAction<IItem>) => {
            state.currentItem = action.payload
        },
        updateCurrentActor: (state, action: PayloadAction<IActorItem>) => {
            state.currentActor = action.payload
        }
    }
})

export const { updateCurrentActor, updateCurrentItem } = globalSlice.actions