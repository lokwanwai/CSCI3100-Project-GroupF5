// productRoutes.js
const express = require('express');
const router = express.Router();     // express routers
const multer = require('multer');   // upload photo
const mongoose = require('mongoose');

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
      const product = await Products.findById(id);
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
      const product = await Product.findById(id);
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

module.exports = router;
