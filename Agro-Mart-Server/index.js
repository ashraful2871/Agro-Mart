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

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sotib.mongodb.net/?appName=Cluster0`;
console.log(uri)

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
    await client.connect();

    const database = client.db("AgroMart")
    const productCollection = database.collection("products")

    // Product management
  app.post('/products', async (req, res) => {
      const { name, category, price, description, stockQuantity, imageURL, addedBy } = req.body;
  
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

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
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
