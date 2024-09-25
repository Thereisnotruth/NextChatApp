'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useUserStore } from '@/providers/user-store-provider'
import { io, Socket } from 'socket.io-client'

const chatSocket: Socket = io(process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:5000')

console.log(process.env.WS_URL)

type ChatMessage = {
  id: string
  message: string
}

export default function Chat() {
  const { id, setUser } = useUserStore()()

  const [chatLog, setChatLog] = useState<ChatMessage[]>([])

  const chatRef = useRef<HTMLInputElement>(null)
  const messageEndRef = useRef<HTMLDivElement>(null)

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (chatRef.current?.value) {
      chatSocket.emit('message', { id, message: chatRef.current.value })
      chatRef.current.value = ''
    }
  }

  function getMessagesSocketHandler(data: ChatMessage) {
    console.log(data)
    setChatLog((prev) => [...prev, data])
  }

  useEffect(() => {
    chatSocket.on('message', getMessagesSocketHandler)
    return () => {
      chatSocket.off('message', getMessagesSocketHandler)
    }
  }, [])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatLog])
  return (
    <div className="min-h-screen bg-slate-800 text-white flex justify-center items-center gap-4">
      <Card className="w-[800px] h-[600px] flex flex-col">
        <CardHeader>
          <CardTitle>Chats</CardTitle>
        </CardHeader>
        <CardContent className="border-[1px] bg-slate-400 border-gray-200 rounded mx-6">
          <ul className="w-full h-[400px] overflow-y-auto">
            {chatLog.map((message, index) => (
              <li
                className={
                  (message.id === id ? 'justify-end ' : '') +
                  'flex p-2 break-words whitespace-pre-line w-full rounded-xl'
                }
                key={index}
              >
                <div className="shadow-md p-4 bg-white rounded-md">
                  <div
                    className={
                      'font-bold ' + (message.id === id ? 'text-right' : '')
                    }
                  >
                    {message.id}
                  </div>
                  <div>{message.message}</div>
                </div>
              </li>
            ))}
            <div ref={messageEndRef} />
          </ul>
        </CardContent>
        <CardFooter className="mt-6">
          <form
            onSubmit={submitHandler}
            className="flex items-center w-full gap-2"
          >
            <Input ref={chatRef} className="w-full" placeholder="chat..." />
            <Button type="submit">submit</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}
