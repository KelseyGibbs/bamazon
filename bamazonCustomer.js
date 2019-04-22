var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Batman60101062",
    database: "bamazon_db"
});

connection.connect(function(err) {
    if (err) throw err;
    availableProducts();
});

function availableProducts() {
    console.log("\nBamazon Merch: \n");
    connection.query("SELECT item_id, product_name, price FROM products", function(err, data) {
        if (err) throw err;
        console.log(data);
    });
};
