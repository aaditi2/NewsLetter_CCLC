const express = require ('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/test', (req,res) => {
    const {username, password} = req.body;
    res.json('test ok');
});

app.listen(4000);