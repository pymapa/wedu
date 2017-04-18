'use strict';
var fs = require('fs');
fs.createReadStream('.dev_vars-env')
  .pipe(fs.createWriteStream('.env'));