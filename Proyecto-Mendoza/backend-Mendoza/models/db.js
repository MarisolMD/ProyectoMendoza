const mariadb =require("mysql");

const connection = mariadb.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((error) => {
  if(error) throw error;
  console.log("conectado a la BD");
});

module.exports = connection;
