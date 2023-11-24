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

        const instance = {
            RESPONSE: {
                status: response.status,
                data: response.data
            }
        }

        console.log(instance);
        res.send(response)
    } catch (err) {
        console.log(err);
        const instance = {
            ERROR: {
                status: err.response.status,
                data: JSON.stringify(err.response.data)
            }
        }

        console.log(instance);
        res.send(instance)
    }
})

app.listen(port, () => {
    console.log(`ok on port ${port}`);
});