const express = require('express');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

async function start() {
    try {
        app.get('/', (req, res) => {
            res.render('index');
        })
        app.listen('5000', () => {
            console.log("Server is running on port 5000");
        })

    } catch (error) {
        console.log(error);
    }
}
start();
