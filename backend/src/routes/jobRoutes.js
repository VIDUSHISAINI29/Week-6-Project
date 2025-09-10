import {Router} from 'express';

import { postJob, getJobs, applyForJob, deleteJob, getAllApplicantsForJob, getJobsAppliedByUser } from '../controllers/jobController.js';

const router = Router();

router.post('/add-job', postJob);
router.get('/all-jobs', getJobs);   
router.put('/add-applicant-to-job/:jobId', applyForJob);
router.delete('/delete-job/:jobId', deleteJob);
router.get('/get-applicants/:jobId', getAllApplicantsForJob)
router.get('/applied-jobs/:userId', getJobsAppliedByUser)

export default router;