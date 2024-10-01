const router = require('express').Router();
const upload = require("../config/multer");
const productsRouter = require('./controller')

router.get('/products',productsRouter.index)
router.get('/products/:id',productsRouter.view)
router.post('/products',upload.single('image_url'),productsRouter.store)
router.put('/products/:id',upload.single('image_url'),productsRouter.update)
router.delete('/products/:id', productsRouter.destroy)

module.exports = router


