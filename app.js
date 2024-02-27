const express = require('express')
const user = require("./routes/User")
const vehical = require("./routes/Vehical")

const app = express();
const port = 4000;

app.use(express.json())

app.use('/user',user)
app.use('/vehical',vehical)

app.listen(port, () => {
    console.log(`app starting on ${port}`);
})