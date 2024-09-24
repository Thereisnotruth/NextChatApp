import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-800 text-white flex justify-center items-center">
      <Card className="w-[480px]">
        <CardHeader>
          <CardTitle>Next Chat App</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="id">ID</Label>
                <Input id="id" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input id="password" />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Register</Button>
          <Button>Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
