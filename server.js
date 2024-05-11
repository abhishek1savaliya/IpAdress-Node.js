const express = require('express');
const app = express();

app.get('/api', (req, res) => {
    const ipAddress = req.socket.remoteAddress;
    res.send(`Your IP address is: ${ipAddress}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
