require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const port = process.env.PORT

const app = express()

app.use(express.json())
app.use(cors())
app.use('/', express.static(path.join(__dirname, './frontend')))


const { seed, getTattoos, rateTattoo, getOneTattoo, submitAppt } = require('./controller')

app.post('/seed', seed)
app.get('/api/tattoos', getTattoos)
app.post('/api/tattoos', rateTattoo)
app.get('/api/tattoos/:id', getOneTattoo)







app.listen(port, () => console.log(`Server running on ${port}`))