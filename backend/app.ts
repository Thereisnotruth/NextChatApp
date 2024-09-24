import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Client } from 'pg'
import cors from 'cors'
import http from 'http'
import { Server, Socket } from 'socket.io'

const app: Express = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const client = new Client({
  user: process.env.PGUSER || 'NEXTCHATAPP',
  host: process.env.PGHOST || 'localhost',
  database: process.env.POSTGRES_DB || 'next-chat-app',
  password: process.env.POSTGRES_PASSWORD || '8053',
  port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
})

client.connect((error) => {
  if (error) console.error('connection error')
  else console.log('success')
})

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server')
})

app.post('/login', (req: Request, res: Response) => {
  const query = {
    text: 'SELECT password FROM "user" WHERE id = $1',
    values: [req.body.id],
  }

  client
    .query(query)
    .then((data) => {
      if (data.rows.length > 0) {
        const foundPassword = data.rows[0].password.trim()

        if (req.body.password === foundPassword) {
          console.log('Login Succcess')
          return res.json({
            status: 200,
            data: req.body,
          })
        }
        return res.json({
          status: 401,
          data: 'invalid password',
        })
      }
      return res.json({
        status: 401,
        data: 'not found',
      })
    })
    .catch((err) => {
      console.log(err)
    })
})

app.post('/register', (req: Request, res: Response) => {
  const query = {
    text: 'INSERT INTO "user" VALUES ($1, $2)',
    values: [req.body.id, req.body.password],
  }
  console.log(req.body)

  client
    .query(query)
    .then(() => {
      console.log('Register Succcess')
      return res.json(req.body)
    })
    .catch((err) => {
      console.log(err)
    })
})

const server = http.createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

let chatMessages: Array<{
  id: string
  message: string
}> = []

let participants: Array<string> = []
io.on('connection', (socket: Socket) => {
  socket.on('message', (data: { id: string; message: string }) => {
    console.log(data)
    chatMessages.push(data)
    io.emit('message', data)
  })
  socket.on('join', (data: { id: string }) => {
    console.log('Join: ' + data.id)
    participants.push(data.id)
    io.emit('join', participants)
  })
})

server.listen(Number(port), '0.0.0.0', () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
