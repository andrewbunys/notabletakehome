const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./controllers/queries')
const port = 3000

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.get('/', (request, response) => {
  response.send('Root directory')
})

app.get('/doctors', db.getAllDoctors)
app.get('/doctors/appointments/:id', db.getDoctorsAppointmentsByDate)
app.get('/doctors/appointments/delete/:id', db.deleteAppointment)
app.post('/doctors/appointments/create', db.createAppointment)
app.get('*', db.handleBadRoute);

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})