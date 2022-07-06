const pool = require('../config/db').pool

const getAllDoctors = (request, response) => {
  pool.query('SELECT doctors.name FROM doctors', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getDoctorsAppointmentsByDate = (request, response) => {
  const id = parseInt(request.params.id)
  const { dateandtime } = request.body

  pool.query('SELECT * FROM appointments INNER JOIN doctors ON doctors.id = $1 WHERE date(appointments.dateandtime) = $2', [id, dateandtime], (error, results) => {
    if (error) {
      throw error
    }
    if (!results.rows.length) {
      return response.status(500).json(`Appointment not found.`)
     }
    return response.status(200).json(results.rows)
  })
}

const createAppointment = (request, response) => {
  const { doctorid, patientid, patientname, dateandtime, kind } = request.body
  let datetime = new Date(dateandtime)
  let timestamp = datetime.getTime()
  let minutes = datetime.getMinutes()

  if (minutes % 15 !== 0)  {
    return response.status(500).json(`Appointments can only be made in increments of 15 minutes.`)
  }
  pool.query('SELECT * FROM appointments INNER JOIN doctors ON doctors.id = $1 WHERE EXTRACT(EPOCH FROM TIMESTAMP appointments.dateandtime) * 1000 = $2', [doctorid, timestamp], (error, results) => {
    if (results.rows.length >= 3) {
      return response.status(500).json(`Doctor cannot have more than 3 appointments at the same time.`)
    } else {
      pool.query('INSERT INTO appointments (doctorid, patientid, patientname, dateandtime, kind) VALUES ($1, $2, $3, $4, $5) RETURNING *', [doctorid, patientid, patientname, dateandtime, kind], (error, results) => {
        if (error) {
          throw error
        }
        response.status(201).send(`Appointment for ${[patientname]} on ${[dateandtime]} added successfully!`)
      })
    }
  })
}


const deleteAppointment = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM appointments WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    if (!results.rows.length) {
      return response.status(500).json(`Appointment not found.`)
     }
    response.status(200).send(`Appointment deleted!}`)
  })
}

const handleBadRoute = (request, response) => {
  return response.status(404).send('404 - Page not found.');
}

module.exports = {
  getAllDoctors,
  getDoctorsAppointmentsByDate,
  createAppointment,
  deleteAppointment,
  handleBadRoute
}