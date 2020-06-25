const Item = require('../models/Item');

module.exports.add = (req, res) => {
    res.render('add');
};

module.exports.addAction = async (req, res) => {
    if (!req.body.title || !req.body.body || !req.body.tags) {
        req.flash('error', 'Please, fill all fields.');
        return res.redirect('/items/add');
    }

    req.body.time = new Date().toISOString().split('T')[0];

    const item = new Item(req.body);
    await item.save();
    req.flash('success', 'Item sucesfully saved!');
    return res.redirect('/');
};

module.exports.item = async (req, res) => {
    const item = await Item.findOne({ slug: req.params.slug });
    res.render('item', item);
};

module.exports.edit = async (req, res) => {
    const item = await Item.findOne({ slug: req.params.slug });
    res.render('edit', item);
};

module.exports.editAction = async (req, res) => {
    if (!req.body.title || !req.body.body || !req.body.tags) {
        req.flash('error', 'Please, fill all fields.');
        return res.redirect(`/items/edit/${req.params.slug}`);
    }

    req.body.slug = require('slug')(req.body.title, { lower: true });
    await Item.findOneAndUpdate({ slug: req.params.slug }, req.body, {
        new: true,
        runValidators: true
    });

    req.flash('success', 'Item sucesfully updated!');
    res.redirect('/');
};

module.exports.deleteAction = async (req, res) => {
    const item = await Item.findOneAndDelete({ slug: req.params.slug });
    req.flash(item ? 'success' : 'error', item ? 'Item sucesfully deleted!' : 'Item was not deleted :(');
    return item ? res.status(200).send() : res.status(400).send();
};
