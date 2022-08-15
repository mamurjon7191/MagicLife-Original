const dotenv = require("dotenv").config();
const app = require("./middlewares/app");
require("./config/database");

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${process.env.PORT}`);
});
