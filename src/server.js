const connect = require("./configs/db");
const app = require("./index");
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  try {
    await connect();
    console.log(`Listening to port ${port}`);
  } catch (e) {
    console.log(e);
  }
});
