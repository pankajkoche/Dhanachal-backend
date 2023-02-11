const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE
router.post("/",verifyTokenAndAdmin, async(req,res) => {
    const newProduct =new Product(req.body)

    try{
        const savedProduct = await newProduct.save()
        res.status(200).json(savedProduct)

    }catch(err){
        res.status(500).json(err)
    }
})



//UPDATE
router.put("/:id",verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET Product
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
  
  
});

//GET ALL Products
router.get("/",  async (req, res) => {
  const query = req.query.new;
  try {
    const products = query
      ? await Product.find().sort({ _id: -1 })
      : await Product.find();
    res.status(200).json(products);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});




module.exports = router;