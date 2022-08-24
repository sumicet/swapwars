import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Pool {
    id: string;
    in: string | null;
    out: string | null;
    exchangeRate: string | null;
    inSupply: string | null;
    outSupply: string | null;
}

const initialState: Pool[] = [];

export const counterSlice = createSlice({
    name: 'pools',
    initialState,
    reducers: {
        addPool: (state, action: PayloadAction<Partial<Pool>>) => {
            state.push(action.payload);
        },
        updatePool: (state, action: PayloadAction<Partial<Pool>>) => {
            state.push(action.payload);
        },
    },
});
