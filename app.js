//Host a server with express
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json());
const port = 8080

app.get('/', (req, res) => {
    res.send('ok')
});

app.post('/mirror',async (req, res) => {
    try {
        const { url, method, headers, data } = req.body;
        console.log({ url, method, headers, data });
        const response = await axios({
            url,
            method,
            headers,
            data
        })

        console.log(response);
        res.send(response.data)
    } catch (err) {
        console.log(err);
        res.send({
            err: err.status,
            msg: err.data,
            raw: JSON.stringify(err)
        })
    }
})

app.listen(port, () => {
    console.log(`ok on port ${port}`);
});