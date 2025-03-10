import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";


const app = express();
dotenv.config();

let userGoal = 'Learn Docker!';

const PORT = process.env.PORT || 3001;
console.log(`Using PORT: ${process.env.PORT}`);

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <link rel="stylesheet" href="styles.css">
        <title>My Goal</title>
      </head>
      <body>
        <section>
          <h2>My Course Goals</h2>
          <h3>${userGoal}</h3>
        </section>
        <form action="/store-goal" method="POST">
          <div class="form-control">
            <label>Course Goal</label>
            <input type="text" name="goal" placeholder="Set a course goal" />
          </div>
          <button>Set Course Goal</button>
        </form>
      </body>
    </html>
  `);
});

app.post('/store-goal', (req, res) => {
  const { goal } = req.body;
  console.log(req.body);
  console.log(goal);
  userGoal = goal;
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
