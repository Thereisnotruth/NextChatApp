import axios from 'axios'

export async function login({
  id,
  password,
}: {
  id: string
  password: string
}) {
  const { data } = await axios.post('http://localhost:5000/login', {
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
  const { data } = await axios.post('http://localhost:5000/register', {
    id,
    password,
  })
  return data
}
