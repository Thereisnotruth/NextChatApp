'use client'

import { useState } from 'react'
import { type ReactNode, createContext, useContext } from 'react'

import { createUserStore } from '@/stores/user.store'

export type UserStoreApi = ReturnType<typeof createUserStore>

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
)

export interface UserStoreProviderProps {
  children: ReactNode
}

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const [store] = useState(() => createUserStore())

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  )
}

export const useUserStore = () => {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within UserStoreProvider`)
  }

  return useContext(UserStoreContext)!
}
