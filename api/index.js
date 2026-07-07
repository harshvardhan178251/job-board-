import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import serverless from 'serverless-http';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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
  const jobs = await Job.find().lean();
  if (jobs.length) return res.json({ jobs });
  const seedJobs = [
    { title: 'Senior Frontend Engineer', company: 'Northstar Labs', location: 'Remote', salary: '$140k-$180k', experience: '5+ years', remote: true, match: 94, stage: 'Review' },
    { title: 'Product Designer', company: 'Astra Cloud', location: 'Austin, TX', salary: '$110k-$140k', experience: '3+ years', remote: false, match: 88, stage: 'Screening' },
    { title: 'Data Analyst', company: 'Finora', location: 'New York, NY', salary: '$90k-$120k', experience: '2+ years', remote: true, match: 81, stage: 'Interview' }
  ];
  return res.json({ jobs: seedJobs });
});

app.use('/api', router);

export default serverless(app);
