const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();


    //  db collection
    const usersCollection = client.db("AgroMart").collection("users");
    const productsCollection = client.db("AgroMart").collection("products");

    //users related apis

    ///save user inn db
    app.post("/users", async (req, res) => {
      const user = req.body;
      // console.log(user);

      const query = { email: user?.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return response.send({
          message: "user already in db",
          insertedId: null,
        });
      }
      const result = usersCollection.insertOne(user);
      res.send(result);
    });

    //get all user
    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });
    app.get("/user/:uid", (req, res) => {
      const query = { uid: req.params.uid }
      const result = usersCollection.findOne(query);
      res.send(result);
    });

    // products related apis crud

    // products create
    app.post("/products", async (req, res) => {
      console.log(productData)
      const {
        name,
        category,
        price,
        description,
        stockQuantity,
        imageURL,
        addedBy,
      } = req.body;

      const productData = {
        name,
        category,
        price,
        description,
        stockQuantity,
        imageURL,
        addedBy,
      };

      try {
        const result = await productsCollection.insertOne(productData);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error inserting the product." });
        console.error(error);
      }
    });

    // products get
    app.get("/products", async (req, res) => {
      const result = await productsCollection.find().toArray();
      res.send(result);
    });
    // products get by _id
    app.get("/product/:id", (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = productsCollection.findOne(query);
      res.send(result);
    });

    // products delete by _id
    app.delete('/product/:id', async (req, res) => {
      const query = { _id: new ObjectId(req.params.id) }
      const result = await productsCollection.deleteOne(query)
      res.send(result)
    })


    app.get("/", async (req, res) => {
      res.send("Agro is running");
    });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
