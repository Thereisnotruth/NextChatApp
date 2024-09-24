import express, { Express, Request, Response } from 'express'

const app: Express = express()
const port = process.env.PORT || 5000

app.get('/', (req: Request, res: Response) => {
  res.send('Typescript + Node.js + Express Server')
})

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`[server]: Server is running at https://localhost:${port}`)
})
