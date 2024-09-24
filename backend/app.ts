import express, { Express, Request, Response } from 'express'
import bodyParser from 'body-parser'
import { Client, Query } from 'pg'

const app: Express = express()
const port = process.env.PORT || 5000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const client = new Client({
  user: 'NEXTCHATAPP',
  host: 'localhost',
  database: 'next-chat-app',
  password: '8053',
  port: 5432,
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

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
