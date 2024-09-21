const router = require("express").Router();
const upload = require("../config/multer");
const Product = require("../products/products");

router.post("/product", upload.single('image_url') ,async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;

  if (!image) {
    try {
      const result = Product.create({
        user_id,
        name,
        price,
        stock,
        status,
      });
      if(!result) throw{code:404, message:'POST_FAILED'}
      res.send({
        status: "Success",
        data: result,
      });
    } catch (error) {
      res.send({
        status: "Failed",
        message: error.message,
      });
    }
  } else {
    try {
      const result = Product.create({
        user_id,
        name,
        price,
        stock,
        status,
        image_url: `/${image.path}`,
      })
      if(!result) throw{code:404, message:'POST_FAILED'}
      res.send({
        status: "Success",
        data: result,
        image: image,
      });
    } catch (error) {
      res.send({
        status: "Failed",
        message: error.message,
      });
    }
  }
});

router.get('/product', async (req,res)=>{
  try {
    const result = await Product.find()
    res.send({
      status: 'Success',
      data: result
    })
  } catch (error) {
    res.send({
      status: 'Failed',
      message: error.message
    })
  }
})

router.get('/product/:id', async (req,res)=>{
  try {
    const result = await Product.findById(req.params.id)
    if(!result) throw {code: 404, message:'file not found'}
    res.send({
      status: 'Success',
      data: result
    })
  } catch (error) {
    res.send({
      status: 'Failed',
      message: error.message
    })
  }
})

router.put('/product/:id', upload.single('image_url') ,async (req,res)=>{
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;

  if (!image) {
    try {
      const result = await Product.findByIdAndUpdate({_id: req.params.id},req.body, {new: true})
      if(!result) throw({code: 404, message:'update failed'})
      res.send({
        status: "Success",
        data: result,
      });
    } catch (error) {
      res.send({
        status: "Failed",
        message: error.message,
      });
    }
  } else {
    try {
      const result = await Product.findByIdAndUpdate({_id: req.params.id},{user_id,name,price,stock,status,image_url:`/${image.path}`},{new: true})
      if(!result) throw({code: 404, message:'update failed'})
      res.send({
        status: "Success",
        data: result,
        image: image,
      });
    } catch (error) {
      res.send({
        status: "Failed",
        message: error.message,
      });
    }
  }
})

router.delete('/product/:id', async (req,res)=>{
  try {
    if(!req.params.id) throw{code:404, message: 'INVALID_ID'}
    const result = await Product.findOneAndDelete({_id: req.params.id})
    if(!result) throw{code:404, message: 'FAILED_DELETE_DATA'}
    res.send({
      status: 'Success',
      message: 'data was deleted'
    })
  } catch (error) {
    res.send({
      status: 'Failed',
      message: error.message
    })
  }
})

module.exports = router;
