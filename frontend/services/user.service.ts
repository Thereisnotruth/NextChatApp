import axios from 'axios'

export async function login({
  id,
  password,
}: {
  id: string
  password: string
}) {
  const { data } = await axios.post(process.env.API_URL + '/login', {
    id,
    password,
  })

  return data
}

export async function register({
  id,
  password,
}: {
  id: string
  password: string
}) {
  const { data } = await axios.post(process.env.API_URL + '/register', {
    id,
    password,
  })
  return data
}
