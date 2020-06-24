require('./models/Item');
require('dotenv').config();

const app = require('./app'),
    mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

app.set('port', process.env.PORT || 7777);
app.listen(app.get('port'), () => console.log(`Listening on port ${app.get('port')}`));
