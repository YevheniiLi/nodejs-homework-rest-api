const mongoose = require("mongoose");

const connectMongo = async () => {
   mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "db-contacts",
  });
};

module.exports = {
  connectMongo,
};
