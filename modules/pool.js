//one pool per project
// pg is the node module we need for the 'Pool' create functionality
var Pool = require('pg').Pool;

//in the live solve, Millies didn't type in everything other than the database, all others are default.
var config = {
    host: 'localhost', //where the database server lives
    port: 5432, //where its listening to. 5432 is default
    database: 'tasks', //name of database
    max: 20 //number of clients
}

//ourPool is an instance of a pool that knows our configuration
var ourPool = new Pool(config);

module.exports = ourPool;