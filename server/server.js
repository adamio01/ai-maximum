import express from 'express';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

app.post('/api/lead', (req, res) => {
  console.log('New lead:', req.body);
  res.json({ status: 'success', message: 'Заявка получена' });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
