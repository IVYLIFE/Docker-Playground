import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();


const app = express();
const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use('/feedback', express.static('feedback'));

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'feedback.html');
  res.sendFile(filePath);
});

app.get('/exists', (req, res) => {
  const filePath = path.join(__dirname, 'pages', 'exists.html');
  res.sendFile(filePath);
});

app.post('/create', async (req, res) => {
  const { title, text: content } = req.body;
  const adjTitle = title.toLowerCase();

  const tempDir = path.join(__dirname, 'temp');
  const feedbackDir = path.join(__dirname, 'feedback');
  const tempFilePath = path.join(tempDir, `${adjTitle}.txt`);
  const finalFilePath = path.join(feedbackDir, `${adjTitle}.txt`);

  console.log('\n\n================================================')
  console.log('Title : ', title)
  console.log('Content : ', content)
  console.log(tempDir)
  console.log(feedbackDir)
  console.log(tempFilePath)
  console.log(finalFilePath)
  console.log('================================================\n\n')

  try {
    await fs.mkdir(tempDir, { recursive: true });
    await fs.mkdir(feedbackDir, { recursive: true });
    await fs.writeFile(tempFilePath, content);

    try {
      await fs.access(finalFilePath);
      res.redirect('/exists');
    } catch {
      await fs.copyFile(tempFilePath, finalFilePath);
      await fs.unlink(tempFilePath);
      res.redirect('/');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

