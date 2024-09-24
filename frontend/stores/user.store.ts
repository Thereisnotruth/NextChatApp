import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type UserState = {
  id: string | null
}

export type UserActions = {
  setUser: (user: UserState) => void
  unsetUser: () => void
}

export type UserStore = UserState & UserActions

export const initUserStore = (): UserState => {
  return { id: null }
}

export const defaultUserState: UserState = {
  id: null,
}

export const createUserStore = (initState: UserState = defaultUserState) => {
  return create(
    persist<UserStore>(
      (set) => ({
        ...initState,
        setUser(user: UserState) {
          set({ id: user.id })
        },
        unsetUser() {
          set(() => initUserStore())
        },
      }),
      {
        name: 'NEXT_CHAT_APP',
      }
    )
  )
}
