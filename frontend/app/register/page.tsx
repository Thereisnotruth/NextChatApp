'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { registerAction } from '@/actions/user.action'

export default function Home() {
  const [userId, setUserId] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const router = useRouter()
  return (
    <div className="min-h-screen bg-slate-800 text-white flex justify-center items-center">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            Next Chat App
            <Button variant="outline" asChild>
              <Link href="/">back</Link>
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={async (event) => {
              event.preventDefault()
              await registerAction({ id: userId, password: userPassword })
              router.push('/')
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

              <Button type="submit" className="w-full">
                Register
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
