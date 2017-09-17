//one pool per project
// pg is node module we need the 'Pool' create functionality
var Pool = require('pg').Pool;

var config ={
    host: 'localhost', //where the database server lives
    port: 5432, //where its listening to. 5432 is default
    database: 'tasks', //name of database
    max:200 //number of clients
}

//ourPool is an instance of a pool that knows our configuration
var ourPool = new Pool(config);

module.exports = ourPool;