var mysql = require("mysql");
var inquirer = require("inquirer");
var inputString = process.argv;

LB = "\n-------------------------------------------------------------------------------------------------\n"

var con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Batman60101062",
    database: "bamazon_db"
});

con.connect(function (err) {
    if (err) throw err;
    availableProducts();
});

function availableProducts() {
    console.log(LB + "Welcome to Bamazon! What is the item_ID of the product you would like to purchase?" + LB)
    con.query("SELECT * FROM products", function (err, res) {
        
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "buyStuff",
                    type: "input",
                    message: 
                    function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push("\n" + res[i].product_name + " Price: " + res[i].price + " item_ID " + res[i].item_ID);
                        }
                        return choiceArray;
                    },
                    validate: validateInput,
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many would you like to buy",
                    validate: validateInput 
                }
            ])
            
            .then(function (answer) {
                var chosenItem = [];
                for (var i = 0; i < res.length; i++) {
                    if (res[i].item_ID == answer.buyStuff) {
                        chosenItem = res[i];
                    }
                }
                if (chosenItem.stock_quantity > answer.amount) {
                    var newSQ = parseInt(chosenItem.stock_quantity) - parseInt(answer.amount);
                    // console.log(newSQ + "newSQ");
                    con.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                                stock_quantity: newSQ
                            },
                            {
                                item_ID: chosenItem.item_ID
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log("Your shopping cart has been updated! What eles would you like to buy?");
                            availableProducts();
                        }
                    );
                }
                    else {
                        console.log("The stock is not sufficent to place this order. Is there anything else you would like to buy?")
                        availableProducts();
                    }
            });
    })
};

let validateInput = (value) => {
    var integer = Number.isInteger(parseFloat(value))

    if (integer) {
        return true;
    } else {
        return "Please only input numbers"
    }
}