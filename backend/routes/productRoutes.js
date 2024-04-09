// productRoutes.js
const express = require('express');
const router = express.Router();     // express routers
const multer = require('multer');   // upload photo

let Products = require("../models/products.model");

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
    condition: req.body.condition,
    productDescription: req.body.productDescription,
    ownerId: req.body.ownerId,
    ownerDisName: req.body.ownerDisName,
    ownerEmail: req.body.ownerEmail,
    productPhoto: req.file.originalname,
  });

  // validation
  newProduct.save()        // save the new user to DB
     .then(() => res.json("Product uploaded!"))        // return "User added" if add success
     .catch(err => res.status(400).json("Error: " + err));   // return error if failed
});

router.get("/:id",(req, res) => {        
  // id object was created by mongo automatically since object created , get request, return that product photo by that id
  Products.findById(req.params.id)          // findByID
    .then((product) => res.json(product))       // return as json
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/update/:id", upload.single("productName"),(req, res) => {    //update data of the object by id
  Products.findById(req.params.id)
  .then((product) => {
      /* start of the update from the post request, received from route('/update/:id') */
      product.productName = req.body.productName;
      product.price = Number(req.body.price);
      product.condition = req.body.condition;
      product.productDescription = req.body.productDescription;
      // product.productPhoto = req.file.originalname;
      /* end */

    product.save()
      .then(() => res.json("Product Updated!"))
      .catch(err => res.status(400).json("Error: " + err));
  })
  .catch(err => res.status(400).json("Error: " + err));
});

router.delete("/:id",(req, res) => {     //pass in object id, delete request, delete that object by id
  Products.findByIdAndDelete(req.params.id)       //findByIdAndDelete
    .then(() => res.json("Product deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
