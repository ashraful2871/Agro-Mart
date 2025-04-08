require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
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
    // Send a ping to confirm a successful connection
    const usersCollection = client.db("AgroMart").collection("users");
    const productCollection = client.db("AgroMart").collection("products");
    const cartCollection = client.db("AgroMart").collection("carts");

    //generate jwt token
    app.post("/jwt", async (req, res) => {
      const { email } = req.body;
      if (!email) {
        res.status(400).send({ message: "email is required" });
      }
      const token = jwt.sign({ email }, process.env.TOKEN_SECRET_KEY, {
        expiresIn: "365d",
      });
      res.send({ token });
    });

    // verifyToken
    const verifyToken = (req, res, next) => {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).send({ message: "Unauthorized access" });
      }

      jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
        if (err) {
          return res.status(403).send({ message: "Forbidden access" });
        }
        req.user = decoded;
        next();
      });
    };

    //users related apis
    ///save user inn db
    app.post("/users", async (req, res) => {
      const user = req.body;
      // console.log(user);

      const query = { email: user?.email };
      const existingUser = await usersCollection.findOne(query);
      if (existingUser) {
        return res.send({
          message: "user already in db",
          insertedId: null,
        });
      }
      const result = usersCollection.insertOne(user);
      res.send(result);
    });

    //get all user
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
        image,
        addedBy,
      } = req.body;

      const productData = {
        name,
        category,
        price,
        description,
        stockQuantity,
        image,
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
    app.get("/products", async (req, res) => {
      let filter = {};
      let sortByPrice = {};
      if (req.query.sort && req.query.sort !== "default") {
        sortByPrice = { price: parseInt(req.query.sort) };
        console.log(sortByPrice);
      }
      if (req.query.searchQuery) {
        filter.name = {
          $regex: req.query.searchQuery,
          $options: "i", // Case-insensitive search
        };
      }
      if (req.query.selectedCategory) {
        filter.category = {
          $regex: req.query.selectedCategory,
          $options: "i",
        };
      }
      const result = await productCollection
        .find(filter)
        .sort(sortByPrice)
        .toArray();
      res.send(result);
    });

    // Update a product by ID
    app.get("/dashboard/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });

    // Update a product by ID
    app.patch("/dashboard/product-update/:id", async (req, res) => {
      const id = req.params.id;
      const { updatedProduct } = req.body;
      const query = { _id: new ObjectId(id) };
      const updateDoc = {
        $set: updatedProduct,
      };
      const result = await productCollection.updateOne(query, updateDoc);
      res.send(result);
    });

    // Delete product using id
    app.delete("/product/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    //add cart products
    app.post("/add-cart", verifyToken, async (req, res) => {
      const { cardData } = req.body;
      const result = await cartCollection.insertOne(cardData);
      res.send(result);
    });

    app.get("/all-cart-items", verifyToken, async (req, res) => {
      const result = await cartCollection.find().toArray();
      res.send(result);
    });

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
