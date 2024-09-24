import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server')
})

app.post('/login', (req: Request, res: Response) => {
  console.log('Login Succcess')
  res.json(req.body)
})

app.post('/register', (req: Request, res: Response) => {
  console.log('Register Succcess')
  res.json(req.body)
})

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
