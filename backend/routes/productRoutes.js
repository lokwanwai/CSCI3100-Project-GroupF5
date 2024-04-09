// productRoutes.js
const express = require('express');
const router = express.Router();     // express routers
const multer = require('multer');   // upload photo

let Products = require("../models/products");

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
 
router.get("/", (req, res) => {       //  get request: 'localhost:3000/product/' case
    Products.find()       //get list of Product in mongodb atlas
      .then(product => res.json(product))     //after find, return users in json format (from DB)
      .catch(err => res.status(400).json("Error: " + err));       // return status 400 if error 
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
