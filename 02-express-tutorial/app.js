const express = require('express');
const app = express();
const products = require('./data');
const peopleRouter = require('./routes/people');
const cookieParser = require('cookie-parser');
const port = 3000;


app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
    res.json({message: "It worked!"});
});

//Define logger
const logger = ('/', (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().toLocaleDateString();
    console.log(`${[time]} ${method} ${url}`);
    next();
});

//alternate way to define logger
// app.use(["/path1", "/path2"], logger);



//Gets all products, uses logger
// app.get('/api/v1/products', logger, (req, res) => {
//     const allProducts = products.map((product) => {
//         const {id, name, price} = product;
//         return {id, name, price}
//     });
//     res.json(allProducts);
// });

//Gets all products
app.get('/api/v1/products', (req, res) => {
    const allProducts = products.map((product) => {
        const {id, name, price} = product;
        return {id, name, price}
    });
    res.json(allProducts);
});

//uses logger on all paths
app.use(logger);



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



/**
 * Gets all people from data.js
 */

// app.get('/api/v1/people', (req, res) => {
//     const allPersons = people.map((person) =>{
//         const { id, name } = person;
//         return { id, name };
//     });
//     res.json(allPersons);
// });


/**
 * Middleware that parse the body into a Javascript object
 * Returns the result as a hash in requesting body
 */


/**
 * Post people.
 */
// app.post('api/v1/people', (req, res) => {
//     if(!req.body.name){
//         res.status(400).json({ success: false, message: "Please provide a name" });
//     }
//     people.push({id: people.length + 1, name: req.body.name });
//     res.status(201).json({ success: true, name: req.body.name });
// });

//parse for form
app.use(express.urlencoded({ extended: false }));
//parse for json
app.use(express.json());
app.use(cookieParser());

app.use('/api/v1/people', peopleRouter);


//Creates auth
const auth = (req, res, next) => {
    const cookie_name = req.cookies.name;
    if (cookie_name) {
        req.user = cookie_name;
        next();
    }
    else {
        return res.status(401).json({ message: "unauthorized" });
    }
    
}

/**
 * Auth logon
 * returns: hello message if name is found, else returns a message telling a name is required.
 * method: post
 * route: localhost:3000/logon
 */
app.post('/logon', (req, res) => {
    const { name } = req.body;

    if (name) {
        res.cookie("name", name);
        return res.status(201).json({ message: `Hello ${name}` });
    }
    else {
        return res.status(400).json({ message: "A name is required." });
    }
});

/**
 * Auth logoff
 * Clears the cookie with requested name
 * method: delete
 * route: localhost:3000/logoff
 */
app.delete('/logoff', (req, res) => {
    res.clearCookie("name");
    return res.status(200).json({ message: "User is logged off." });  
});

/**
 * Auth test
 * Clears the cookie with requested 
 * method: get
 * route: localhost:3000/test
 * returns: welcome message or unauthorized message
 */
app.get('/test', auth, (req, res) => {
    return res.status(200).json({ message: `Welcome ${req.user}`});
});

//Catch all, should go after evething else: get, post, etc.
app.all('*', (req, res) => {
    res.status(404).send('<h1>Page Not Found</h1>');
});

app.listen(port, () => {
    console.log('server listening on port 3000...');
});