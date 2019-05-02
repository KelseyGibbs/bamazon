DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products
(
    item_ID INT NOT NULL
    AUTO_INCREMENT, product_name VARCHAR
    (100)NOT NULL, department_name VARCHAR
    (100)NOT NULL, price DECIMAL
    (10,2)NOT NULL, stock_quantity INT NOT NULL, PRIMARY KEY
    (item_ID));

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("nerf gun",
    "toys",
    88.99,
    22
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("barbie",
    "toys",
    14.99,
    152
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("monopoly",
    "board games",
    22.95,
    67
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("clue",
    "board game",
    26.96,
    43
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("tokaido",
    "board games",
    28.95,
    19
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("kite",
    "toys",
    12.99,
    27
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("phone case",
    "accessories",
    65.00,
    404
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("purse",
    "accessories",
    248.99,
    99
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("fancy candle",
    "home goods",
    15.99,
    49
    );

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUE
    ("cosmic rug",
    "home goods",
    288.99,
    7
    );

USE bamazon_db;
SELECT * FROM products,
    (SELECT product_name 
        FROM products
        WHERE products.item_id = product_name.item_id
        FOR JSON PATH) AS product_name
FROM products
ORDER BY product_name
FOR JSON PATH;