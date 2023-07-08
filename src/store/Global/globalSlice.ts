import { createSlice, PayloadAction } from "@reduxjs/toolkit"




export interface IGlobalState {
    currentItem?: IItem;
    currentActor?: IActorItem;
    isLoggedIn: boolean;
}

const initialState: IGlobalState = {
    currentItem: undefined,
    currentActor: undefined,
    isLoggedIn: false
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
        },
        updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
            state.isLoggedIn = action.payload
        }
    }
})

export const { updateCurrentActor, updateCurrentItem, updateIsLoggedIn } = globalSlice.actions