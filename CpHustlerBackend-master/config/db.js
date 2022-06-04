const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(mongoose.connection.readyState);
    console.log("connection is successful");
  })
  .catch((error) => {
    console.log("connection not found");
    console.log(error, "mongodb connection error");
  });
