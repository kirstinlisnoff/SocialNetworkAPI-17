const db = require('./config/connection');
const express = require('express');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

db().then(() => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
}).catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});