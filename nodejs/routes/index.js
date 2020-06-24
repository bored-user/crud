const router = require('express').Router();

// Importing controllers
const indexController = require('../controllers/indexController'),
    itemController = require('../controllers/itemController');;

router.get('/', indexController);
router.get('/img/:file', itemController.image);

router.get('/items/add', itemController.add);
router.post('/items/add', itemController.addAction);

router.get('/items/edit/:slug', itemController.edit);
router.post('/items/edit/:slug', itemController.editAction);

router.post('/items/delete/:slug', itemController.deleteAction);

router.get('/items/:slug', itemController.item);

module.exports = router;
