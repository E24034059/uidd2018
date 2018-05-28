var mongoose = require('mongoose');
mongoose.Promise = global.Promise; 
mongoose.connect(url)
        .then(() => console.log('connection successful'))
        .catch((err) => console.error(err));
