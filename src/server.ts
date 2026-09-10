import express from 'express';

const port = 3000;

const app = express();

app.get('/movies', (req, res) => {
    res.send('Listagem de filmes');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
