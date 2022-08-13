const mongoose = require("mongoose");

mongoose.connect(process.env.DATABASE_URL, () => {
  console.log("DB is connected");
});
