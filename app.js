const express = require('express');
const app = express();

PORT = 3000;

app.get('/', (req, res) => {
    const blog = { id: 1, title: 'Blog title', description: 'Blog description' };

    res.status(200).json(blog);
});

app.listen(PORT, () => {
    console.log(`Listining port ${PORT}`)
});
