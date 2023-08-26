import { createSlice, } from '@reduxjs/toolkit'
import { AppState, }    from '@/types'
import { RootState, }   from '@/redux'

const appSlice = createSlice({
  name         : 'app',
  initialState : {
    activeApp                 : null,
    activeConnector           : null,
    isWaitingForOAuthResponse : false,
    isConnectingDevice        : false,
    isAddingConnector         : false,
    qrCodeKey                 : null,
  },
  reducers : {
    updateActiveApp : ( state: AppState, { payload, }, ) => {
      state.activeApp = payload
    },
    updateActiveConnector : ( state: AppState, { payload, }, ) => {
      state.activeConnector = payload
    },
    updateIsWaitingForOAuthResponse : ( state: AppState, { payload, }, ) => {
      state.isWaitingForOAuthResponse = payload
    },
    updateIsConnectingDevice : ( state: AppState, { payload, }, ) => {
      state.isConnectingDevice = payload
    },
    updateQrCodeKey : ( state: AppState, { payload, }, ) => {
      state.qrCodeKey = payload
    },
    updateIsAddingConnector : ( state: AppState, { payload, }, ) => {
      state.isAddingConnector = payload
    },
  },
},)

export const selectApp = ( state: RootState, ) => state.app

export const {
  updateActiveApp,
  updateActiveConnector,
  updateIsConnectingDevice,
  updateIsWaitingForOAuthResponse,
  updateIsAddingConnector,
  updateQrCodeKey,
} = appSlice.actions

export default appSlice.reducer
