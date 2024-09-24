'use server'

import axios from 'axios'
import { useUserStore } from '@/providers/user-store-provider'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { login, register } from '@/services/user.service'

export async function loginAction({
  id,
  password,
}: {
  id: string
  password: string
}) {
  // validation
  const res = await login({ id, password })

  if (res.status === 200) {
    revalidatePath('/')
    return {
      id,
    }
  }
  return { id: null }
}

export async function registerAction({
  id,
  password,
}: {
  id: string
  password: string
}) {
  const res = await register({ id, password })

  if (res.status === 200) {
    return {
      id,
    }
  }
  return { id: null }
}
