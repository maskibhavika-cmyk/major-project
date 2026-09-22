require("dotenv").config();

const app = require("./app");
const connectDB = require("./Config/db");

connectDB();

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});