const {neon} =  require("@neondatabase/serverless");
require("dotenv").config()

exports.sql = neon(process.env.DATABASE_URL);

exports.initDB = async function () {
    const sql = neon(process.env.DATABASE_URL);
    try
    {
        await sql`CREATE TABLE IF NOT EXISTS transactions
                  (
                      id SERIAL PRIMARY KEY,
                      user_id VARCHAR(255) NOT NULL,
                      title VARCHAR(255) NOT NULL,
                      amount DECIMAL NOT NULL,
                    category VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
                  )`

        console.log("DB Initialized")
    }
    catch (e)
    {
        console.log(e);
        process.exit(1);
    }
}