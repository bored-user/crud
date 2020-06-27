const multer = require('multer'),
    jimp = require('jimp'),
    uuid = require('uuid');

module.exports.upload = multer({
    storage: multer.memoryStorage(),
    fileFilter: (req, file, next) => {
        if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
            next(null, true);
        } else {
            next({ message: 'File not supported!' }, false);
        };
    }
}).single('photo');

module.exports.rename = (req, res, next) => {
    if (!req.file) return next();

    req.body.photo = `${uuid.v4()}.${req.file.mimetype.split('/')[1]}`;
    next();
}

module.exports.resize = async (req, res, next) => {
    const photo = await jimp.read(req.file.buffer);
    await photo.resize(800, jimp.AUTO);
    await photo.write(`./public/media/${req.body.photo}`);
    next();
}
