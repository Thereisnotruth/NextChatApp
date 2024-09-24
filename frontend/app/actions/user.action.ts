'use server'

import axios from 'axios'

export async function login(prevState: any, formData: any) {}

export async function register(prevState: any, formData: FormData) {
  const id = formData.get('id')
  const password = formData.get('password')

  console.log(id, password)

  const { data } = await axios.post(
    'https://nextchatapp-production.up.railway.app/login',
    {
      id,
      password,
    }
  )

  console.log(data)

  return {
    errors: {
      id: !id ? 'id is required' : undefined,
      password: !password ? 'id is required' : undefined,
    },
  }
}
