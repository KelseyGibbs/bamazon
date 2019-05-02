var mysql = require("mysql");
var inquirer = require("inquirer");

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Batman60101062",
    database: "bamazon_db"
});

con.connect(function(err) {
    if (err) throw err;
    availableProducts();
});

function availableProducts() {
    console.log("\nBamazon Merch: \n");
    con.query("SELECT item_id, product_name, price FROM products", function(err, data) {
        if (err) throw err;
        for (i = 0; i < data.length; i++) { 
            console.log(data[i]);
          }
    });
};
