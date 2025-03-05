import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send(`
    <h1>Hello from inside the very basic Node app!</h1>
  `);
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});