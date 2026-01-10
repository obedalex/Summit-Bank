import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
// Correct storage import
// import DarkModeReducer  from "./darkModeSlice/darkModeSlice";
// import StudentSliceReducer from "./selectedStudentSlice/StudentSlice";

// Persist Config
const persistConfig = {
  key: "root",
  storage,
  whitelist:["selectedStudent"], // makes sure even when there is reload, the state does not vanish or reset
  version: 2, // Increase this when changing state structure
  migrate: async (state) => {
    if (!state) return Promise.resolve(state); 

    // Ensure completedSteps is initialized

    return Promise.resolve(state); // Ensures smooth state migration
  },
  
};

// Combine Reducers
const rootReducer = combineReducers({
  //  darkMode:DarkModeReducer,
//   selectedStudent: StudentSliceReducer,
  

});

// Apply Persist to the Root Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});


// Create Persistor
export const persistor = persistStore(store);

persistor.subscribe(() => {
  const state = store.getState();
  const rehydrated = state._persist?.rehydrated;
  if (!rehydrated) return;

  // Optional: Add custom validation here if needed
});


export default store;