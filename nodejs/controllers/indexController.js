const mongoose = require('mongoose'),
    Item = mongoose.model('Item');

module.exports = async (req, res) => {
    const items = await Item.find();
    res.render('index', { items });
};
