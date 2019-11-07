const mongoose = require('mongoose');
const ENV      = require('./enviroVarible.json');

mongoose.set('useNewUrlParser',true);
mongoose.set('useUnifiedTopology',true);
mongoose.set('useCreateIndex', true);

module.exports = mongoose.connect(ENV.dbUrl).then(()=>console.log('Connection to Db Success'))
.catch(err=>console.error('Connection  to Db Faild',err))
