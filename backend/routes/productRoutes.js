// productRoutes.js
const express = require('express');
const router = express.Router();     // express routers
const multer = require('multer');   // upload photo
const mongoose = require('mongoose');
const path = require('path');
let Products = require("../models/product");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  }
});

/* storge image */
const upload = multer({storage: storage});
 
router.get('/search', async (req, res) => {
  const keyword = req.query.keyword;
  try {
      const searchedProducts = await Products.find({
        $or: [
          { productDescription: { $regex: keyword, $options: 'i' } }, // Case-insensitive search in productDescription
          { productName: { $regex: keyword, $options: 'i' } } // Case-insensitive search in productName
        ]
      })
      .then(products => {
        console.log('Matching products:', products);
        res.json(products);
      })
      .catch(error => {console.error('Error finding products:', error);});

      // const formattedProducts = searchedProducts.map((item) => ({
      //     name: item.productName,
      //     price: item.productPrice,
      //     description: item.productDescription,
      // }));

      //res.json(searchedProducts);
  } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/searchByID", async (req, res) => {
  const id = req.query.id;
  try {
      const product = await Products.findById(productID);
      if (product) {
          res.json(product);
      } else {
          res.status(404).json({ message: 'Product not found' });
      }
  } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/detail", async (req, res) => {
  const id = req.query.id;
  try {
      const product = await Product.findById(productID);
      if (product) {
          res.json(product);
      } else {
          res.status(404).json({ message: 'Product not found' });
      }
  } catch (error) {
      console.error('Error searching products:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

router.get("/", (req, res) => {
  const keyword = req.query.keyword;
  Products.find()       //get list of Product in mongodb atlas
  .then(product => res.json(product))     //after find, return users in json format (from DB)
      .catch(err => res.status(400).json("Error fetching product: " + err));       // return status 400 if error 
});

router.post("/add", upload.single("productPhoto"), (req, res) => {   // post request
  const newProduct = new Products({
    productName: req.body.productName,
    price: Number(req.body.price),
    productDescription: req.body.productDescription,
    productPhoto: req.file.originalname,
  });

  // validation
  newProduct.save()        // save the new user to DB
     .then(() => res.json("Product uploaded!"))        // return "User added" if add success
     .catch(err => res.status(400).json("Error: " + err));   // return error if failed
});

router.delete("/:id",(req, res) => {     //pass in object id, delete request, delete that object by id
  Products.findByIdAndDelete(req.params.id)       //findByIdAndDelete
    .then(() => res.json("Product deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.get("/random", async (req, res) => {       //  get request: 'localhost:3000/product/' case
  try {
      const randomProducts = await Products.aggregate([
          { $sample: { size: 5 } } // Adjust the sample size as needed
      ]);

      res.json(randomProducts);
  } catch (error) {
      console.error('Error fetching random products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


// Route: "api/products/getdetails"
// Method: GET
// Parameter: productID
// Function: Return the entire Object
router.get('/getdetails/:productID', async (req, res) => {
  try {
    const { productID } = req.params;
    const Product = await Products.findOne({ productID });
    if (!Product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(Product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: "api/products/changeqty"
// Method: PUT
// Parameters: productID, quantity (Body)
// Function: Set the product quantity to the input Quantity
router.put('/changeqty', async (req, res) => {
  try {
    const { productID, quantity } = req.body;
    const Product = await Products.findOne({ productID });
    if (!Product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    Product.productStorage = quantity;
    await Product.save();
    res.json({ message: 'Product quantity updated successfully' });
  } catch (error) {
    console.error('Error updating product quantity:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: "prod/image"
// Method: Get
// Parameters: productID
// Function: get the productImage (it is a path) using the productID, then, return the image stored in the path acquired
router.get('/image/:productID', async (req, res) => {
  try {
    const { productID } = req.params;
    const product = await Products.findOne({ productID });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    const imagePath = product.productImage;
    console.log('Fetching product image:', imagePath);
    const absolutePath = path.join(__dirname,"backend", '..', imagePath);
    console.log('Fetching product image:', absolutePath);
    res.sendFile(absolutePath);
  } catch (error) {
    console.error('Error fetching product image:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
