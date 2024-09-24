'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { loginAction } from '@/actions/user.action'
import { useFormState } from 'react-dom'
import { revalidatePath } from 'next/cache'
import { useUserStore } from '@/providers/user-store-provider'
import { redirect } from 'next/navigation'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { id, setUser, unsetUser } = useUserStore()()

  useEffect(() => unsetUser(), [])

  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const router = useRouter()

  return (
    <div className="min-h-screen bg-slate-800 text-white flex justify-center items-center">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle>Next Chat App</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              const res = await loginAction({
                id: userId,
                password: userPassword,
              })
              if (res.id !== null) {
                setUser({ id: res.id })
                router.push('/chat')
              }
            }}
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">ID</Label>
                <Input
                  id="id"
                  name="id"
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
              <div className="flex justify-between">
                <Button type="submit" variant="outline" asChild>
                  <Link href="/register">Register</Link>
                </Button>
                <Button>Login</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
