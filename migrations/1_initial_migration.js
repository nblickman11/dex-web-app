
const Migrations = artifacts.require("Migrations");

/* 
  - Below, we assign an anonymous function to the
   module.exports object. This allows us to enter another file/module
   and say: const 1_initial_migrations.js = require('./1_initial_migrations');
   and then: 1_initial_migrations.myFunction();  
*/ 
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};
