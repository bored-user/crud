const router = require('express').Router();

// Importing controllers
const indexController = require('../controllers/indexController'),
    itemController = require('../controllers/itemController');

// Importing middlewares
const imageMiddleware = require('../middlewares/imageMiddleware');

router.get('/', indexController);

router.get('/items/add', itemController.add);
router.post('/items/add', imageMiddleware.upload, imageMiddleware.rename, imageMiddleware.resize, itemController.addAction);

router.get('/items/edit/:slug', itemController.edit);
router.post('/items/edit/:slug', imageMiddleware.upload, imageMiddleware.rename, imageMiddleware.resize,  itemController.editAction);

router.post('/items/delete/:slug', itemController.deleteAction);

router.get('/items/:slug', itemController.item);

module.exports = router;
