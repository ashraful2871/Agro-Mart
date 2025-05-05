require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 5000;
const { Parser } = require("json2csv");
const SSLCommerzPayment = require("sslcommerz-lts");
const { v4: uuidv4 } = require("uuid");
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = process.env.IS_LIVE === "true";

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const tempCartStorage = new Map();
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection
    const usersCollection = client.db("AgroMart").collection("users");
    const productCollection = client.db("AgroMart").collection("products");
    const cartCollection = client.db("AgroMart").collection("carts");
    const wishCollection = client.db("AgroMart").collection("wishes");
    const paymentCollection = client.db("AgroMart").collection("payments");
    const reviewCollection = client.db("AgroMart").collection("reviews");

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

    //get users by limit and filter wise
    app.get("/users", async (req, res) => {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const search = req.query.search || "";
      const skip = (page - 1) * limit;

      const query = search
        ? {
            $or: [
              { name: { $regex: search, $options: "i" } },
              { email: { $regex: search, $options: "i" } },
              { phone: { $regex: search, $options: "i" } },
            ],
          }
        : {};

      const users = await usersCollection
        .find(query)
        .skip(skip)
        .limit(limit)
        .toArray();
      const total = await usersCollection.countDocuments(query);

      res.send({ total, users });
    });

    app.get("/users/:uid", verifyToken, (req, res) => {
      const result = usersCollection.findOne();
      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email };
      const result = await usersCollection.findOne(query);
      res.send(result);
    });

    app.patch("/users/update-coupon-enabled", async (req, res) => {
      const { couponEnabled } = req.body;

      try {
        // Ensure couponEnabled is a boolean
        if (typeof couponEnabled !== "boolean") {
          throw new Error("Invalid couponEnabled value");
        }

        // Update the collection
        const result = await usersCollection.updateMany(
          {},
          { $set: { couponEnabled } }
        );

        if (result.modifiedCount > 0) {
          res.send({
            message: "Coupon enabled status updated successfully!",
            modifiedCount: result.modifiedCount,
          });
        } else {
          res.status(404).send({ message: "No users were updated." });
        }
      } catch (error) {
        console.error("Error updating couponEnabled:", error);
        res.status(500).send({
          message: "Error updating couponEnabled",
          error: error.message,
        });
      }
    });

    // Update user
    app.patch("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updatedData = req.body;
      const query = { _id: new ObjectId(id) };

      const updateDoc = {
        $set: updatedData,
      };

      try {
        const result = await usersCollection.updateOne(query, updateDoc);
        if (result.modifiedCount > 0) {
          res
            .status(200)
            .json({ message: "User updated successfully!", result });
        } else {
          res
            .status(404)
            .json({ message: "User not found or no change made." });
        }
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ message: "Server error", error });
      }
    });

    // Update user role
    app.put("/user/role/:email", async (req, res) => {
      const { email } = req.params;
      const { role } = req.body;

      try {
        const result = await usersCollection.updateOne(
          { email },
          { $set: { role } }
        );

        if (result.modifiedCount > 0) {
          res.send({ message: "Role updated", role });
        } else {
          res.status(400).send({ message: "No changes made" });
        }
      } catch (err) {
        res.status(500).send({ message: "Update failed", error: err.message });
      }
    });

    // Delete user
    app.delete("/user/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    });

    //user review
    app.post("/reviews", async (req, res) => {
      const { reviews } = req.body;
      const result = await reviewCollection.insertOne(reviews);
      res.send(result);
    });

    app.get("/reviews", async (req, res) => {
      const result = await reviewCollection.find().toArray();
      res.send(result);
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
      // Pagination setup
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 6;
      const skip = (page - 1) * limit;

      if (req.query.sort && req.query.sort !== "default") {
        sortByPrice = { price: parseInt(req.query.sort) };
        // console.log(sortByPrice);
      }
      if (req.query.searchQuery) {
        filter.name = {
          $regex: req.query.searchQuery,
          $options: "i",
        };
      }
      if (req.query.selectedCategory) {
        filter.category = {
          $regex: req.query.selectedCategory,
          $options: "i",
        };
      }
      try {
        const total = await productCollection.countDocuments(filter);
        const products = await productCollection
          .find(filter)
          .sort(sortByPrice)
          .skip(skip)
          .limit(limit)
          .toArray();

        res.send({
          totalItems: total,
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          products,
        });
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    // Update a product by ID
    app.get("/dashboard/product/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const product = await productCollection.findOne(query);
      res.send(product);
    });

    // Update a product by ID
    app.patch(
      "/dashboard/product-update/:id",
      verifyToken,
      async (req, res) => {
        const id = req.params.id;
        const { updatedProduct } = req.body;
        const query = { _id: new ObjectId(id) };
        const updateDoc = {
          $set: updatedProduct,
        };
        const result = await productCollection.updateOne(query, updateDoc);
        res.send(result);
      }
    );

    // Delete product using id
    app.delete("/product/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await productCollection.deleteOne(query);
      res.send(result);
    });

    //add cart products
    app.post("/add-cart", verifyToken, async (req, res) => {
      const { cartData } = req.body;
      // console.log(cartData);
      // return;
      const { productId } = cartData;
      const query = {
        productId: productId,
        "userInfo.email": cartData.userInfo.email,
      };
      const isExist = await cartCollection.findOne(query);
      if (isExist) {
        return res
          .status(409)
          .send({ message: "This Product Already in Cart" });
      }
      const result = await cartCollection.insertOne(cartData);
      res.send(result);
    });

    // Update cart item quantity with stock validation
    app.patch("/update-cart-item/:id", verifyToken, async (req, res) => {
      try {
        const cartItemId = req.params.id;
        const { quantity } = req.body;

        // 1. Find the cart item
        const cartItem = await cartCollection.findOne({
          _id: new ObjectId(cartItemId),
        });

        if (!cartItem) {
          return res.status(404).json({ error: "Cart item not found" });
        }

        // 2. Find the corresponding product to check stock
        const product = await productCollection.findOne({
          _id: new ObjectId(cartItem.productId),
        });

        if (!product) {
          return res.status(404).json({ error: "Product not found" });
        }

        // 3. Calculate the quantity difference
        const oldQuantity = cartItem.quantity || 1;
        const quantityDifference = quantity - oldQuantity;

        // 4. Validate if enough stock is available
        if (
          quantityDifference > 0 &&
          quantityDifference > product.stockQuantity
        ) {
          return res.status(400).json({
            error: `Only ${product.stockQuantity} items available in stock`,
          });
        }

        // 5. Update the cart item quantity
        const updateCartResult = await cartCollection.updateOne(
          { _id: new ObjectId(cartItemId) },
          { $set: { quantity: quantity } } // Update the quantity field, not stockQuantity
        );

        if (updateCartResult.modifiedCount === 0) {
          return res
            .status(400)
            .json({ error: "Failed to update cart quantity" });
        }

        // 6. Update the product stock quantity if needed
        if (quantityDifference !== 0) {
          const newStockQuantity = product.stockQuantity - quantityDifference;
          await productCollection.updateOne(
            { _id: new ObjectId(cartItem.productId) },
            { $set: { stockQuantity: newStockQuantity } }
          );
        }

        // 7. Return success response
        res.status(200).json({
          message: "Quantity updated successfully",
          updatedQuantity: quantity,
          productId: cartItem.productId,
        });
      } catch (error) {
        console.error("Error updating cart item:", error);
        res.status(500).json({ error: "Internal server error" });
      }
    });

    app.get("/all-cart-items/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { "userInfo.email": email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });

    // Delete a cart item
    app.delete("/delete-cart-item/:id", verifyToken, async (req, res) => {
      const { id } = req.params;
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    //add wish products
    app.post("/add-wish", verifyToken, async (req, res) => {
      const { wishData } = req.body;
      const { productId, userInfo } = wishData;
      const exists = await wishCollection.findOne({
        productId: productId,
        "userInfo.email": userInfo.email,
      });
      if (exists) {
        return res.status(409).send({ message: "Already in wishlist" });
      }
      const result = await wishCollection.insertOne(wishData);
      res.send(result);
    });

    // get wishlist item by email
    app.get("/wishlist/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { "userInfo.email": email };
      const result = await wishCollection.find(query).toArray();
      res.send(result);
    });

    // Delete Wishlist Item
    app.delete("/wishlist/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await wishCollection.deleteOne(query);
      res.send(result);
    });

    // Payment
    // Payment Intent
    app.post("/create-payment-intent", verifyToken, async (req, res) => {
      const { totalAmount } = req.body;

      if (!totalAmount || totalAmount <= 0) {
        return res.status(400).send({ error: "Invalid amount provided." });
      }

      try {
        const amount = parseInt(totalAmount * 100);
        const paymentIntent = await stripe.paymentIntents.create({
          amount,
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.send({
          clientSecret: paymentIntent.client_secret,
        });
      } catch (err) {
        console.error("Error creating payment intent:", err);
        res.status(500).send({ error: err.message });
      }
    });

    app.post("/payments", verifyToken, async (req, res) => {
      try {
        const paymentInfo = req.body;

        // 1. First check stock availability for all items
        const products = await productCollection
          .find({
            _id: {
              $in: paymentInfo.cartItems.map(
                (item) => new ObjectId(item.productId)
              ),
            },
          })
          .toArray();

        const stockErrors = [];
        paymentInfo.cartItems.forEach((item) => {
          const product = products.find(
            (p) => p._id.toString() === item.productId
          );
          if (!product) {
            stockErrors.push(`Product ${item.name} not found`);
          } else if (product.stockQuantity < item.orderedQuantity) {
            stockErrors.push(
              `Not enough stock for ${item.name}. Available: ${product.stockQuantity}, Ordered: ${item.orderedQuantity}`
            );
          }
        });

        if (stockErrors.length > 0) {
          return res.status(400).json({
            success: false,
            errors: stockErrors,
          });
        }

        // 2. Update product quantities
        const bulkUpdateOps = paymentInfo.cartItems.map((item) => ({
          updateOne: {
            filter: { _id: new ObjectId(item.productId) },
            update: {
              $inc: { stockQuantity: -item.orderedQuantity },
              $set: { updatedAt: new Date() },
            },
          },
        }));

        await productCollection.bulkWrite(bulkUpdateOps);

        // 3. Save payment information
        const result = await paymentCollection.insertOne({
          ...paymentInfo,
          createdAt: new Date(),
        });

        // 4. Clear the user's cart
        const deletedResult = await cartCollection.deleteMany({
          _id: { $in: paymentInfo.cartIds.map((id) => new ObjectId(id)) },
        });

        res.status(200).json({
          success: true,
          result,
          deletedResult,
        });
      } catch (err) {
        console.error("Error processing payment:", err);
        res.status(500).json({
          success: false,
          error: "Failed to process payment",
          details: err.message,
        });
      }
    });

    // Update payment status
    app.patch("/orders/:id", async (req, res) => {
      const { id } = req.params;
      const { status } = req.body;

      const result = await paymentCollection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { status: status } }
      );

      res.send(result);
    });

    // Pagination for orders
    app.get("/orders", async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const query = {};

        // Optional Filters
        if (req.query.email) {
          query.email = { $regex: req.query.email, $options: "i" };
        }

        if (req.query.status) {
          query.status = req.query.status;
        }

        if (req.query.method) {
          query.method = req.query.method;
        }

        if (req.query.orderLimit) {
          const daysAgo = new Date();
          daysAgo.setDate(daysAgo.getDate() - parseInt(req.query.orderLimit));
          query.date = { $gte: daysAgo.toISOString().split("T")[0] };
        }

        if (req.query.startDate && req.query.endDate) {
          query.date = {
            $gte: req.query.startDate,
            $lte: req.query.endDate,
          };
        }

        // Total Orders count (without pagination, for frontend)
        const totalOrders = await paymentCollection.countDocuments(query);

        // Paginated Orders
        const orders = await paymentCollection
          .find(query)
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit)
          .toArray();

        const totalPages = Math.ceil(totalOrders / limit);

        res.json({
          orders,
          totalOrders,
          totalPages,
        });
      } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ message: "Failed to fetch orders" });
      }
    });

    app.get("/orders/:email", async (req, res) => {
      const email = req.params.email;
      // console.log("Received email:", email);
      try {
        const query = { email: email };
        const result = await paymentCollection.find(query).toArray();
        // console.log("Fetched orders:", result);
        res.send(result);
      } catch (error) {
        res.status(500).send({ message: "Server Error", error });
      }
    });

    // Download orders as CSV
    app.get("/orders/download", async (req, res) => {
      try {
        const orders = await paymentCollection.find().toArray();

        if (!orders.length) {
          return res.status(404).send({ message: "No orders found" });
        }

        const flattenedOrders = orders?.map((order) => ({
          id: order?._id.toString(),
          name: order?.name || "",
          email: order?.email || "",
          status: order?.status || "",
          totalAmount: order?.totalAmount || "",
          method: order?.method || "",
          transactionId: order?.transactionId || "",
          date: order?.date ? new Date(order.date).toLocaleDateString() : "",
          invoiceNo: order?.invoiceNo || "",
        }));

        const json2csv = new Parser();
        const csv = json2csv.parse(flattenedOrders);

        // Add BOM for proper CSV rendering
        res.header("Content-Type", "text/csv; charset=utf-8");
        res.attachment("orders.csv");
        res.send("\uFEFF" + csv); // Adding BOM here before sending the CSV data
      } catch (err) {
        console.error("Error generating CSV:", err);
        res.status(500).json({ message: "Failed to download orders" });
      }
    });

    // Specific order details as CSV
    app.get("/orders/:id/download", async (req, res) => {
      const id = req.params.id;
      try {
        const order = await paymentCollection.findOne({
          _id: new ObjectId(id),
        });
        if (!order) {
          return res.status(404).json({ message: "Order not found" });
        }

        const orderData = [
          {
            id: order?._id.toString(),
            name: order?.name || "",
            email: order?.email || "",
            status: order?.status || "",
            totalAmount: order.totalAmount || "",
            method: order?.method || "",
            transactionId: order?.transactionId || "",
            date: order?.date ? new Date(order.date).toLocaleDateString() : "",
            invoiceNo: order?.invoiceNo || "",
          },
        ];

        const json2csv = new Parser();
        const csv = json2csv.parse(orderData);

        res.header("Content-Type", "text/csv; charset=utf-8");
        res.attachment(`order_${order.invoiceNo}.csv`);
        res.send("\uFEFF" + csv);
      } catch (error) {
        console.error("Error generating CSV:", error);
        res.status(500).json({ message: "Failed to download order" });
      }
    });

    //user role management
    app.get("/user/role/:email", verifyToken, async (req, res) => {
      const email = req.params.email;
      const query = { email: email };
      const result = await usersCollection.findOne(query);
      res.send({ role: result?.role });
    });

    app.get("/admin-stats", async (req, res) => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const yesterday = new Date(Date.now() - 86400000)
          .toISOString()
          .split("T")[0];
        const thisMonth = new Date().getMonth() + 1;
        const thisYear = new Date().getFullYear();

        // Today Orders
        const todayStats = await paymentCollection
          .aggregate([
            { $match: { date: today } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
              },
            },
          ])
          .toArray();

        // console.log("Today stats raw:", todayStats);

        // Yesterday Orders
        const yesterdayStats = await paymentCollection
          .aggregate([
            { $match: { date: yesterday } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
              },
            },
          ])
          .toArray();

        // This Month Orders
        const monthStats = await paymentCollection
          .aggregate([
            {
              $addFields: {
                month: { $toInt: { $substr: ["$date", 5, 2] } },
                year: { $toInt: { $substr: ["$date", 0, 4] } },
              },
            },
            { $match: { month: thisMonth, year: thisYear } },
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
              },
            },
          ])
          .toArray();

        // All Time Orders
        const allStats = await paymentCollection
          .aggregate([
            {
              $group: {
                _id: null,
                totalRevenue: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
              },
            },
          ])
          .toArray();

        res.send({
          today: {
            revenue: todayStats[0]?.totalRevenue || 0,
            orders: todayStats[0]?.totalOrders || 0,
          },
          yesterday: {
            revenue: yesterdayStats[0]?.totalRevenue || 0,
            orders: yesterdayStats[0]?.totalOrders || 0,
          },
          thisMonth: {
            revenue: monthStats[0]?.totalRevenue || 0,
            orders: monthStats[0]?.totalOrders || 0,
          },
          allTime: {
            revenue: allStats[0]?.totalRevenue || 0,
            orders: allStats[0]?.totalOrders || 0,
          },
        });
      } catch (error) {
        console.error("Error fetching admin stats:", error);
        res.status(500).send({ message: "Error fetching admin stats", error });
      }
    });

    app.get("/order-stats", async (req, res) => {
      try {
        const stats = await paymentCollection
          .aggregate([
            {
              $group: {
                _id: "$status",
                totalAmount: { $sum: "$totalAmount" },
                totalOrders: { $sum: 1 },
              },
            },
          ])
          .toArray();

        const totalOrders = await paymentCollection.countDocuments();

        res.send({
          totalOrders,
          stats,
        });
      } catch (error) {
        console.error("Error fetching order stats:", error);
        res.status(500).send({ message: "Error fetching order stats", error });
      }
    });

    app.get("/weekly-sales", async (req, res) => {
      try {
        const result = await paymentCollection
          .aggregate([
            {
              $group: {
                _id: "$date",
                sales: { $sum: "$totalAmount" },
                orders: { $sum: 1 },
              },
            },
            { $sort: { _id: 1 } },
          ])
          .toArray();

        // Format the data for frontend
        const formattedData = result.map((item) => ({
          date: item._id,
          sales: item.sales,
          orders: item.orders,
        }));

        res.json(formattedData);
      } catch (error) {
        console.error("Error fetching sales data:", error);
        res.status(500).json({ message: "Failed to fetch sales data" });
      }
    });

    app.get("/best-selling-products", async (req, res) => {
      try {
        const bestSellingProducts = await paymentCollection
          .aggregate([
            { $unwind: "$productId" },
            {
              $group: {
                _id: "$productId",
                totalOrderCount: { $sum: 1 },
              },
            },
            {
              $addFields: {
                _id: { $toObjectId: "$_id" },
              },
            },
            {
              $lookup: {
                from: "products",
                localField: "_id",
                foreignField: "_id",
                as: "productDetails",
              },
            },
            { $unwind: "$productDetails" },
            {
              $project: {
                name: "$productDetails.name",
                totalOrderCount: 1,
              },
            },
            { $sort: { totalOrderCount: -1 } },
          ])
          .toArray();

        res.json(bestSellingProducts);
      } catch (error) {
        console.error("Error fetching best-selling products:", error);
        res.status(500).json({ message: "Server error" });
      }
    });

    //sslcommarze
    app.post("/init-payment", async (req, res) => {
      const { totalAmount, cartItems, cartIds, userInfo } = req.body;
      // console.log(totalAmount, cartItems, cartIds);
      const tran_id = uuidv4();

      tempCartStorage.set(tran_id, {
        cartItems,
        cartIds,
        email: userInfo.email,
      });
      const data = {
        total_amount: totalAmount,
        currency: "BDT", // Change to your currency
        tran_id: tran_id,
        success_url: "https://agro-mart-server.vercel.app/payment/success",
        fail_url: "https://agro-mart-server.vercel.app/payment/fail",
        cancel_url: "https://agro-mart-server.vercel.app/payment/cancel",
        ipn_url: "https://agro-mart-server.vercel.app/payment/ipn",
        shipping_method: "NO",
        product_name: cartItems.map((item) => item.name).join(", "),
        product_category: "general",
        product_profile: "general",
        cus_name: userInfo?.name || "Customer Name",
        cus_email: userInfo?.email,
        cus_add1: "Dhaka",
        cus_city: "Dhaka",
        cus_country: "Bangladesh",
        cus_phone: "01711111111",
        ship_name: "Customer Name",
        ship_add1: "Dhaka",
        ship_city: "Dhaka",
        ship_country: "Bangladesh",
        ship_postcode: "1000",
      };

      try {
        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
        const apiResponse = await sslcz.init(data);
        res.json({ GatewayPageURL: apiResponse.GatewayPageURL, tran_id });
      } catch (error) {
        console.error("Error initializing payment:", error);
        res.status(500).json({ error: "Failed to initialize payment" });
      }
    });

    // Handle success callback
    app.post("/payment/success", async (req, res) => {
      const paymentIntent = req.body;

      if (paymentIntent.status !== "VALID") {
        return res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
      }

      try {
        // Retrieve cart data from temporary storage
        const { cartItems, cartIds, email } = tempCartStorage.get(
          paymentIntent.tran_id
        ) || {
          cartItems: [],
          cartIds: [],
          email: null,
        };

        // console.log("Retrieved cartItems:", cartItems);
        // console.log("Retrieved cartIds:", cartIds);
        // console.log("User email:", email);

        if (!email) {
          console.error("Email not found in temporary storage");
          return res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
        }

        // Fetch user data
        const user = await usersCollection.findOne({ email: email });
        if (!user) {
          console.error("User not found for email:", email);
          return res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
        }

        // Validate cart items
        if (!cartItems.length || !cartIds.length) {
          console.error("No cart items or cart IDs found in temporary storage");
          return res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
        }

        // Validate product IDs
        const productIds = cartItems
          .map((item) => {
            try {
              return new ObjectId(item.productId);
            } catch (err) {
              console.error(`Invalid productId: ${item.productId}`);
              return null;
            }
          })
          .filter((id) => id !== null);

        if (productIds.length !== cartItems.length) {
          console.error("Some productIds are invalid");
          return res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
        }

        // Fetch product data
        const products = await productCollection
          .find({
            _id: { $in: productIds },
          })
          .toArray();

        // console.log("Found products:", products);

        // Check stock availability
        const stockErrors = [];
        cartItems.forEach((item) => {
          const product = products.find(
            (p) => p._id.toString() === item.productId
          );
          if (!product) {
            stockErrors.push(`Product not found (ID: ${item.productId})`);
          } else if (parseFloat(product.stockQuantity) < (item.quantity || 1)) {
            stockErrors.push(
              `Not enough stock for ${item.name}. Available: ${
                product.stockQuantity
              }, Ordered: ${item.quantity || 1}`
            );
          }
        });

        if (stockErrors.length > 0) {
          console.error("Stock validation failed. Errors:", stockErrors);
          return res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
        }

        // Prepare payment information
        const paymentInfo = {
          email: user.email,
          name: user.name || "Unknown",
          totalAmount: parseFloat(paymentIntent.amount),
          status: paymentIntent.status,
          method: paymentIntent.card_type || "Unknown",
          transactionId: paymentIntent.tran_id,
          cartIds: cartIds,
          cartItems: cartItems.map((item) => ({
            productId: item.productId,
            orderedQuantity: item.quantity || 1,
            price: parseFloat(item.price),
            name: item.name,
          })),
          date: new Date().toISOString(),
          invoiceNo: Math.floor(100000 + Math.random() * 900000).toString(),
          createdAt: new Date(),
        };

        // Update product stock quantities
        const bulkUpdateOps = cartItems.map((item) => ({
          updateOne: {
            filter: { _id: new ObjectId(item.productId) },
            update: {
              $inc: { stockQuantity: -(item.quantity || 1) },
              $set: { updatedAt: new Date() },
            },
          },
        }));

        await productCollection.bulkWrite(bulkUpdateOps);

        // Save payment information
        await paymentCollection.insertOne(paymentInfo);

        // Clear the user's cart
        await cartCollection.deleteMany({
          _id: { $in: cartIds.map((id) => new ObjectId(id)) },
        });

        // Clean up temporary storage
        tempCartStorage.delete(paymentIntent.tran_id);

        // console.log("Payment saved to database:", paymentInfo);

        res.redirect("https://agro-mart-e2cb4.web.app/payment/success");
      } catch (error) {
        console.error("Error processing payment:", error);
        res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
      }
    });

    // Handle failure callback
    app.post("/payment/fail", (req, res) => {
      res.redirect("https://agro-mart-e2cb4.web.app/payment/fail");
    });

    // Handle cancel callback
    app.post("/payment/cancel", (req, res) => {
      res.redirect("https://agro-mart-e2cb4.web.app/payment/cancel");
    });

    // Handle IPN (Instant Payment Notification)
    app.post("/payment/ipn", (req, res) => {
      // console.log("IPN received:", req.body);
      // Update database based on IPN data
      res.status(200).send("IPN received");
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
