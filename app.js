const express = require('express');
const app = express();
const history = require('connect-history-api-fallback');
const voceRouter  = require("./routes/voce");
const path = require('path');

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET", "PUT", "POST", "DELETE", "OPTIONS");

    next();
});

app.use("/api", voceRouter);


const staticMiddleware = express.static(path.join(__dirname, 'dist'));
app.use(staticMiddleware);

app.use(history);
app.use(staticMiddleware);


app.listen(8080, () => {
    console.log("Server listen on port: ", 8080);
});



