'use client'
import { useUserStore } from '@/providers/user-store-provider'

export default function Chat() {
  const { id, setUser } = useUserStore()()
  return <div>{id}</div>
}
