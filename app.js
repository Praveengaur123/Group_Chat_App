const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'login.html'));
});
app.post('/login', (req, res) => {
    res.redirect('/');
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'message.html'));
});

app.post('/chat', (req, res) => {
    const { username, message } = req.body;
    console.log(username);
    console.log(message);

    const chatMessage = `${username}: ${message}`;
    fs.appendFile('chat.txt', chatMessage, (err) => {
        if (err) {
            console.error( err);
            return res.status(500).send('Failed to save message');
        }
        res.redirect('/');
    });
});

app.get('/chat/history', (req, res) => {
    fs.readFile('chat.txt', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading chat history');
        }
        res.send(data);
    });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
