require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
});

module.exports = pool;
