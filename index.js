import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())
app.use('/posts', postRoutes)

const user = process.env.DB_USER
const pwd = process.env.DB_PASSWORD
const CONNECTION_URL = `mongodb://${user}:${pwd}@cluster0-shard-00-00.8nkmc.mongodb.net:27017,cluster0-shard-00-01.8nkmc.mongodb.net:27017,cluster0-shard-00-02.8nkmc.mongodb.net:27017/lexy_test?ssl=true&replicaSet=atlas-11s9wq-shard-0&authSource=admin&retryWrites=true&w=majority`
const PORT = process.env.PORT || 5000


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch(error => console.log(error) )
