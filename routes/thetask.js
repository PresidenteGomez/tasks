//requires
var router = require('express').Router();
var pool = require('../modules/pool');

//required routes
router.get('/', function (req, res) {
    console.log('in GET thetask route');
    console.log('in GET thetask.js route');
  
    pool.connect(function(connectionError, client, done){
        if(connectionError){
            console.log(connectionError);
            res.sendStatus(500);
        } else{
            //ask the client to run our query
            //params 1. query itself, 2. is callback
            client.query('SELECT * FROM tasktable;', function (queryError, resultObj){
                done();
                //var resultObj
                //queryError any error that happens in executing the query
                //resultObj response object from db via pg contains the result set
                if(queryError){
                    console.log(connectionError);
                    res.sendStatus(500);
                } else{
                    //resultObj.rows contains the result set as an array of objects
                    console.log('resultObj.rows ->', resultObj.rows);
                    res.status(200).send(resultObj.rows);
                }
            });
        }
    });

});

router.post('/', function(req, res){
    var clientTask = req.body.task;
    console.log('in POST thetask route. New task-->', clientTask);

   pool.connect(function(connectionError, client, done) {
       if(connectionError){
           console.log(connectionError);
           res.sendStatus(500);
       } else {
           //query string
           //values to insert into the query string
           //callback func that will run with query is complete

           //parameterized queries
           // sources ---> https://node-postgres.com/features/queries 
           var queryString = 'INSERT INTO tasktable (task) VALUES ($1);';//(task) and (complete) are our values of DB --> AND tasktable (complete) VALUES ($2) ???
           var values = [clientTask];
           client.query( queryString, values, function(queryError, resultObj){
               done();
               if(queryError){
                   console.log(connectionError);
                   res.sendStatus(500);
               } else{
                   res.send(resultObj);
               }
           });
       }
    });
       
});

//route params
router.delete('/:id', function(req, res){
    console.log('in delete task route');
    console.log('req.params.id ->', req.params.id);
    var dbId = req.params.id;
    console.log('error???');

    //pool.connect
    pool.connect(function (connectionError, client, done){
        if (connectionError){
            console.log('connection error', connectionError);
            res.sendStatus(500);
        } else {
            client.query('DELETE FROM tasktable WHERE id=$1;', [dbId], function(queryError, result) {
                done();
                if (queryError){
                    console.log(queryError);
                    res.sendStatus(500);
                }//end if
                else{
                    res.sendStatus(202);
                }//end else
            });
        }
    });
});


router.put('/:id', function(req, res){
    console.log('in complete task route');
    console.log('req.params.id ->', req.params.id);
    var dbId = req.params.id;
    console.log('error??');

    //pool.connect
    pool.connect(function (connectionError, client, done){
        if(connectionError){
            console.log('theres been a connection error', connectionError);
            res.sendStatus(500);
        } else {
            client.query('UPDATE tasktable SET complete = true WHERE id=$1;', [dbId], function(queryError, result){
                done();
                if (queryError){
                    console.log(queryError);
                    res.sendStatus(500);
                }//end if
                else {
                    res.sendStatus(202);
                }//end else
            });
        }//end else
    });

});

//exporting the router as a module???
module.exports = router;