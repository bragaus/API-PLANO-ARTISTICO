const bcrypt = require('bcrypt'); 
const cryptPwd = bcrypt.hashSync('...', 10);
console.log(cryptPwd);