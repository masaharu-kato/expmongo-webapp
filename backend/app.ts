import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import { router as auth_router } from './routes/auth'
import { router as main_router } from './routes/main'

const app = express()

const port = process.env.PORT || 3000

mongoose.connect('mongodb://localhost:27017/data')

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use('/auth', auth_router)
app.use('/api', main_router)

app.listen(port)

console.info('listen on port: ' + port)
