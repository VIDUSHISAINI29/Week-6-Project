import {Router} from 'express';

import { postJob, getJobs, applyForJob, deleteJob, getAllApplicantsForJob } from '../controllers/jobController.js';

const router = Router();

router.post('/add-job', postJob);
router.get('/all-jobs', getJobs);   
router.put('/add-applicant-to-job/:jobId', applyForJob);
router.delete('/delete-job/:jobId', deleteJob);
router.get('/get-applicants/:jobId', getAllApplicantsForJob)

export default router;