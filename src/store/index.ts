// store.ts
import { createStore } from 'redux';

// Define the state type
export interface AppState {
  network: string;
}

// Define the initial state
const initialState: AppState = {
  network: 'Ethereum',
};

// Define action types
enum ActionType {
  NETWORK='NETWORK'
}

// Define action interfaces
interface NetworkAction {
  type: ActionType.NETWORK;
  payload: string;
}


// Define the reducer
const networkReducer = (state = initialState, action: NetworkAction): AppState => {
  switch (action.type) {
    case ActionType.NETWORK:
      return { ...state, network: action.payload };
    default:
      return state;
  }
};

// Create the Redux store
const store = createStore(networkReducer);

export default store;