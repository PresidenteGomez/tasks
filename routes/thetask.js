//requires
var router = require('express').Router();
//var path = require('path');//WHY DONT WE NEED A PATH??

//required routes
router.get('/', function (req, res) {
    //console.log('in GET thetask route');
    //var thetaskPath = path.join(__dirname, '../public/views/index.html');
    console.log('in GET thetask.js route');//add to thetaskPath into log??maybe not.
    //res.sendFile(thetaskPath);

    res.sendStatus(200);

});

router.post('/', function(req, res){
    var clientTask = req.body.task;
    console.log('in POST thetask route. New task-->', clientTask);
    //res.sendStatus(200);
});

//route params
router.delete('/:id', function(req, res){
    console.log('in delete task route');
    console.log('req.params.id ->', req.params.id);
    var dbId = req.params.id;

    //pool.connect
    res.sendStatus(200);
});

//exporting the router as a module???
module.exports = router;