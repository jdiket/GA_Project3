const express = require('express');

// CONFIG
const app = express();
const PORT = 3003;

// LISTENER
app.listen(PORT, () => {console.log('five by five on ', PORT)});