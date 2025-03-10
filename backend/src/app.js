import express from 'express'
import cors from 'cors'
export const app = express()
import {dbConnect} from "./db/db.js"
dbConnect();
app.use(cors())

app.get('/', (req, res) => {
    res.send("Hello World")
})


