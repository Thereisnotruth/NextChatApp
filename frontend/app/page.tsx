'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { login } from './actions/user.action'
import { useFormState } from 'react-dom'

export default function Home() {
  const [state, formAction] = useFormState(login, { error: undefined })
  return (
    <div className="min-h-screen bg-slate-800 text-white flex justify-center items-center">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle>Next Chat App</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">ID</Label>
                <Input id="id" name="id" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" />
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
