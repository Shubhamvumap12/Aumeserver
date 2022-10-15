const app = require("./index");
const AuthRoutes = require("./Routes/AuthRoutes")
const ProductRoutes = require("./Routes/ProductRoutes")
require("dotenv").config();


const PORT = process.env.PORT || 8001;
const mongoose = require("mongoose");
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://vinay_applore_mongo:password1234@cluster0.fmnxsiz.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


// app.listen(port, async () => {
//   try {
//     // await connect();
//     client.connect(err => {
//       // const collection = client.db("test").collection("devices");
//       console.log
//       client.close();
//     });
//     console.log(`Listening to port ${port}`);
//   } catch (e) {
//     console.log(e);
//   }
// });

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(PORT, () => {
      console.log("Application Started in Port " + PORT);
      // console.log("whazzzapp")
    });
  })
  .catch((err) => console.log(err));

  

app.use("/api/auth", AuthRoutes);
app.use("/api/product", ProductRoutes);

