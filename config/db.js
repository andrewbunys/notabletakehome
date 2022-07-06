const Pool = require('pg').Pool
const pool = new Pool({
  user: 'abunys',
  host: 'localhost',
  database: 'doctorsappointments',
  password: 'password',
  port: 5432,
})

pool.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to PostgresQL');
  }
});

module.exports = {
  pool
}

