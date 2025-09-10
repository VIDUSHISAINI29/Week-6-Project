import {Router} from 'express';

import { getUserConnections, sendConnectionRequest, respondToConnectionRequest, getConnectionRequests, getSentRequests, deleteRequest } from '../controllers/connectionRequestController.js';

const router = Router();

router.get('/user-connections/:userId', getUserConnections);
router.post('/send-connection-request', sendConnectionRequest);
router.put('/respond-connection-request/:requestId', respondToConnectionRequest);
router.get('/connection-requests/:userId', getConnectionRequests);
router.get('/get-sent-requests/:userId', getSentRequests);
router.delete('/delete-request/:requestId', deleteRequest);

export default router;