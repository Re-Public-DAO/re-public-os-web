import { Object, User, } from '@types/parse'
import { ReactNode, }    from 'react'

export type ObjectJson = {
  objectId: string
  createdAt: Date
  updatedAt: Date
}

export type RepublicUser = User & Object & {
  username: string
  email: string
  logOut: (options?: {}) => Promise<void>
}


export type RepublicUserJson = ObjectJson & {
  username: string
  email: string
}

export type TopNavDropdownItem = {
  title: string
  description: string
  href: string
  icon: ReactNode
}

export type AppState = {
  activeApp: string | null
  activeConnector: string | null
  isWaitingForOAuthResponse: boolean
  isConnectingDevice: boolean
  isAddingConnector: boolean
  qrCodeKey: string | null
}



