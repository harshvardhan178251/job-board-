import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const seedJobs = [
  { title: 'Senior Frontend Engineer', company: 'Northstar Labs', location: 'Remote', salary: '$140k-$180k', experience: '5+ years', remote: true, match: 94, stage: 'Review' },
  { title: 'Product Designer', company: 'Astra Cloud', location: 'Austin, TX', salary: '$110k-$145k', experience: '3+ years', remote: false, match: 88, stage: 'Screening' },
  { title: 'Data Analyst', company: 'Finora', location: 'New York, NY', salary: '$95k-$125k', experience: '2+ years', remote: true, match: 81, stage: 'Interview' },
  { title: 'Senior Product Manager', company: 'Helio Finance', location: 'Chicago, IL', salary: '$150k-$190k', experience: '6+ years', remote: false, match: 91, stage: 'Review' },
  { title: 'Machine Learning Engineer', company: 'Lumen AI', location: 'Remote', salary: '$130k-$170k', experience: '4+ years', remote: true, match: 87, stage: 'Screening' }
];

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/jobboard', { autoIndex: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error.message);
  });

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  location: String,
  salary: String,
  experience: String,
  remote: Boolean,
  match: Number,
  stage: String
});

const Job = mongoose.model('Job', jobSchema);

const router = express.Router();
router.get('/health', (_req, res) => res.json({ ok: true }));
router.get('/jobs', async (_req, res) => {
  try {
    const jobs = await Promise.race([
      Job.find().lean(),
      new Promise((resolve) => setTimeout(() => resolve([]), 1500))
    ]);
    if (jobs.length) return res.json({ jobs });
    return res.json({ jobs: seedJobs });
  } catch (error) {
    console.error('Jobs route error:', error.message);
    return res.json({ jobs: seedJobs });
  }
});

app.use('/api', router);

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
}

export const handler = serverless(app);
export default app;
