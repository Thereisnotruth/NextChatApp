'use server'

import axios from 'axios'
import { redirect } from 'next/navigation'

export async function login(prevState: any, formData: any) {
  const id = formData.get('id')
  const password = formData.get('password')
  let success: boolean = false

  try {
    const { data } = await axios.post('http://localhost:5000/login', {
      id,
      password,
    })
    console.log(data)
    if (data.status === 200) {
      success = true
    }
  } catch (error: any) {
    return {}
  } finally {
    if (success) redirect('/register')
  }
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
    return {}
  }

  redirect('/')
}
