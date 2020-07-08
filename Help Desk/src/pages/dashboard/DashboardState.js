export const initialState = {
    isLoading: false,
  };
  
export const START_LOADING = "Dashboad/START_LOADING";
export const STOP_LOADING = "Dashboad/STOP_LOADING";

export const startLoading = () => ({
    type: START_LOADING
});

export const stopLoading = () => ({
    type: STOP_LOADING
});

export default function DashboardReducer(state = initialState, { type, payload }) {
switch (type) {
    case START_LOADING:
            return {
            ...state,
            isLoading: true
        };
        case STOP_LOADING:
            return {
                ...state,
                isLoading: false
        };    
    default:
        return state;
    }
}