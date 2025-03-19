require("dotenv").config();
const express = require("express");
const cors = require("cors");
const port = process.env.PORT || 5000;
const app = express();

//middleware
app.use(cors());
app.use(express.json());
//agro1234
//tkWMj4u0as7kNvYI

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
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });

    const usersCollection = client.db("AgroMart").collection("users");
    const productCollection = client.db("AgroMart").collection("products");

    //users related apis
    app.post("/users", (req, res) => {
      const result = usersCollection.insertOne(req.body);
      req.send(result);
    });
    app.get("/users", (req, res) => {
      const result = usersCollection.find().toArray();
      req.send(result);
    });
    app.get("/users/:uid", (req, res) => {
      const result = usersCollection.findOne();
      req.send(result);
    });

    // products related apis crud

    // products create
    app.post("/products", async (req, res) => {
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
        const result = await productCollection.insertOne(productData);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Error inserting the product." });
        console.error(error);
      }
    });

    // products get
    app.get("/products", (req, res) => {
      const result = productsCollection.find().toArray();
      req.send(result);
    });
    // products get by _id
    app.get("/products/:id", (req, res) => {
      const query = { _id: new ObjectId(req.params.id) };
      const result = productsCollection.findOne(query);
      req.send(result);
    });

    app.post("/products", (req, res) => {
      const result = productsCollection.insertOne(req.body);
      req.send(result);
    });
    app.get("/products", (req, res) => {
      const result = productsCollection.find().toArray();
      req.send(result);
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

app.get("/", async (req, res) => {
  res.send("Agro is running");
});
app.listen(port, () => {
  console.log(`server is running on port: ${port}`);
});
