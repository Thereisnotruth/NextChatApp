'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useFormState } from 'react-dom'

import { register } from '@/actions/user.action'

export default function Home() {
  const [state, formAction] = useFormState(register, {
    success: false,
  })
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
