import express from 'express'
import cors from 'cors'
export const app = express()
import {dbConnect} from "./db/db.js"
import { router as userRoutes } from './routes/user.route.js'
dbConnect();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.send("Hello World")
})

app.use('/users', userRoutes)


