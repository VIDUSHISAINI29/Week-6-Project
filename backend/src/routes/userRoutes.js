import {Router} from 'express';

import { getUsers, updateUserProfile, getUserById, allLoggedInUsers, getPeopleToConnect } from '../controllers/userController.js';

const router = Router();

router.get('/users', getUsers);
router.get('/users-to-connect', allLoggedInUsers);
router.get('/people-to-connect/:loggedInUserId', getPeopleToConnect);
router.get('/user/:userId', getUserById);
router.put('/update-user-profile/:userId', updateUserProfile);


export default router;