import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import clientRoutes from './routes/clientRoutes.mjs'
import billRoutes from './routes/billRoutes.mjs'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors(
  {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  }
))
app.use(bodyParser.json())

app.use('/clients', clientRoutes)
app.use('/bills', billRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
