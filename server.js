const express = require('express'); // Import Express
const Joi = require('joi'); // Import Joi
const app = express(); // Create express application on the app variable

app.use(express.json()); // used the json file


// Give data to the server
const customers = [
    {id: 1, title: 'Jay'},
    {id: 2, title: 'Swagger'},
    {id: 3, title: 'Alice'},
    {id: 4, title: 'Corner'},
    {id: 5, title: 'Smith'},
]


// Read request handlers
// Display the message when the URL consist of '/'
app.get('/', (req, res) => {

    res.send('Welcome to Node Js REST API!');
});


// Display the list of customer when URL consists of api customers
app.get('/api/customers', (req, res) => {

    res.send(customers);
});


// Display the information of specific customer when you mention the id
app.get('/api/customers/:id', (req, res) => {

    const customer = customers.find(c => c.id === parseInt(req.params.id));
    // If there is no valid customer ID, then display an error with the following massage
    if (!customer) res.status(404).send("Ooops... Can't find what you are looking for!!");
    res.send(customer);
});


// Create request handler
// Create new customer information 
app.post('/api/customers', (req, res) => {

    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    // Increment the customer ID
    const customer = {
        id: customers.length + 1,
        title: req.body.title
    };
    customers.push(customer);
    res.send(customer);
});


// Update request handler
// Update existing customer information 
app.put('/api/customers/:id', (req, res) => {

    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('Not Found!!');

    const { error } = validateCustomer(req.body);
    if (error) {
        res.status(400).send(error.details[0].message);
        return;
    }
    customer.title = req.body.title;
    res.send(customer);
});


// Delete request handler
// Delete customer details 
app.delete('/api/customers/:id', (req, res) => {

    const customer = customers.find(c => c.id === parseInt(req.params.id));
    if (!customer) res.status(404).send('Not Found!!');

    const index = customers.indexOf(customer);
    customers.splice(index, 1);

    res.send(customer);
});


// Validate information
function validateCustomer(customer){

    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(customer, schema);
}


// Port environment variable
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}..`));