const db = require('./config/connection');

db().then(() => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});