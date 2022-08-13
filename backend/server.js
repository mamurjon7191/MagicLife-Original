const app = require("./middleware/app");

const dotenv = require("dotenv").config();

app.listen(process.env.PORT, process.env.SERVER_URL, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

require("./config/db");
