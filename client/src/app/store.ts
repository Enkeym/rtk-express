import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { listenerMiddleware } from '../middleware/auth'
import { api } from './services/api'
import authSlice from '../features/auth/authSlice'
import employeesSlice from '../features/employees/employeesSlice'

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    authSlice,
    employeesSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .prepend(listenerMiddleware.middleware)
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
