require("dotenv").config();
const { Client, Pool } = require("pg");

const dbName = process.env.PGDATABASE;
const superClient = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
  database: "postgres",
});

const wait = (ms) => new Promise((res) => setTimeout(res, ms));

const connectWithRetry = async (maxAttempts = 10, delayMs = 1000) => {
  let attempt = 1;

  while (attempt <= maxAttempts) {
    try {
      const pool = new Pool(); // uses .env (target DB)
      await pool.query("SELECT 1");
      console.log(`🔁 Connected to '${dbName}' on attempt ${attempt}`);
      return pool;
    } catch (err) {
      console.log(
        `⏳ Waiting for '${dbName}' to be ready... (attempt ${attempt})`
      );
      await wait(delayMs);
      attempt++;
    }
  }

  throw new Error(
    `❌ Could not connect to database '${dbName}' after ${maxAttempts} attempts.`
  );
};

const run = async () => {
  try {
    await superClient.connect();

    const check = await superClient.query(
      `SELECT 1 FROM pg_database WHERE LOWER(datname) = LOWER($1)`,
      [dbName]
    );

    if (check.rowCount === 0) {
      await superClient.query(`CREATE DATABASE ${dbName}`);
      console.log(`🎉 Database '${dbName}' created.`);
    } else {
      console.log(`✅ Database '${dbName}' already exists.`);
    }

    await superClient.end();

    const pool = await connectWithRetry();

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS listings (
        id SERIAL PRIMARY KEY,
        type TEXT NOT NULL,
        subtype TEXT,
        house_rooms TEXT,
        condo_type TEXT,
        occupancy TEXT,
        mode_of_payment TEXT[],
        location TEXT NOT NULL,
        city TEXT NOT NULL,
        size NUMERIC NOT NULL,
        tcp NUMERIC,
        downpayment_percent NUMERIC,
        payable_up_to_years INTEGER,
        lister TEXT NOT NULL,
        contact TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    await pool.query(createTableQuery);
    console.log("✅ Table `listings` created or already exists.");
    await pool.end();
  } catch (err) {
    console.error("❌ Initialization failed:", err);
    process.exit(1);
  }
};

run();
