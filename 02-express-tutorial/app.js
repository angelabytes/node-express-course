const express = require('express');
const app = express();
const { products } = require("./data");
const port = 3000;


app.use(express.static("./public"));

app.get('/api/v1/test', (req, res) => {
    res.json({message: "It worked!"});
});


//Gets all products
app.get('/api/v1/products/', (req, res) => {
    const allProducts = products.map((product) => {
        const {id, name, price} = product;
        return {id, name, price}
    });
    res.json(products);
});

/**
 * Gets the product by id where ID is a numerical value
 * route = http://localhost:3000/api/v1/prodcuts/id
 */

//
app.get('/api/v1/products/:productID', (req, res) => {
  
    const idToFind = parseInt(req.params.productID);
    const oneProduct = products.find((product) => product.id === idToFind);
  

    if(!Number.isInteger(idToFind)) {
        res.status(400).json({message: "Product ID must be a whole number."});
    }


    if(!oneProduct){
        res.status(404).json({message: "Could not find an product with that ID."});
    }
 
    console.log(oneProduct);
    res.json(oneProduct);
});

/**
 * Query: by search(characters) and limit(number of results)
 * route = http://localhost:3000/api/v1/query?search=charcter&limit=num
 * character(s): the characters you want to search for 
 * num: the number of results as a nunber
 */
app.get('/api/v1/query', (req, res) => {
    const { search, limit } = req.query;
    let sortedProducts = [...products];
    if(search) {
        sortedProducts = sortedProducts.filter((product) => {
            return product.name.startsWith(search);
        });
    }
    if(limit) {
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }
    if(sortedProducts.length < 1) {
        return res.status(200).json({success: true, data: [] });
    }
    res.status(200).json(sortedProducts);
});

/**
 *  Sorted: Used to sort all the products. 
 *  route: http://localhost:3000/api/v1/sorted?order=orderPreference
 *  orderPreference: use asc or desc 
 */
app.get('/api/v1/sorted', (req, res) => {
    const { order } = req.query;
    let sortedProducts = [...products];

    try{
        if(order === 'desc') {
           sortedProducts.sort((a, b) => b.price - a.price);
        } else if(order === 'asc') {
            sortedProducts.sort((a,b) => a.price - b.price);
        } else {
            return res.status(400).json({message: "Invalid option for order parameter. Choose from 'asc' or 'desc'."});
        }
        res.status(200).json(sortedProducts);
    } catch(error) {
        console.error("Sorting error: ", error);
        res.status(500).json({error: "There was an error with the sort."});
    }
   
    res.status(200).json(sortedProducts);
});


app.all('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(port, () => {
    console.log('server listening on port 3000...');
});