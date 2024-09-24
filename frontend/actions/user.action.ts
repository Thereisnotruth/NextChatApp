'use server'

import axios from 'axios'
import { useUserStore } from '@/providers/user-store-provider'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { login as loginService } from '@/services/user.service'

export async function loginAction({
  id,
  password,
}: {
  id: string
  password: string
}) {
  // Validation 처리는 여기서
  const res = await loginService({ id, password })

  if (res.status === 200) {
    return {
      id,
    }
  }
  return { id: null }
}

export async function register(prevState: any, formData: FormData) {
  const id = formData.get('id')
  const password = formData.get('password')

  try {
    await axios.post('http://localhost:5000/register', {
      id,
      password,
    })
  } catch (error) {
    return {
      success: false,
    }
  }

  return {
    success: true,
  }
}
