//requires
var router = require('express').Router();
var path = require('path');

//require routes
router.get('/', function (get, res) {
    var indexPath = path.join(__dirname, '../public/views/index.html');
    console.log(indexPath);
    res.sendFile(indexPath);
    
})
//exporting the router as a module???
module.exports = router;