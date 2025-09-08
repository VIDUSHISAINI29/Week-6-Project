import {Router} from "express";

import { sendMessage, deleteMessage, getAllMessages, getMessages, updateMessage } from "../controllers/messageController.js";

const router = Router();

router.post('/send-message/:receiverId', sendMessage);
router.delete('/delete-message/:messageId', deleteMessage);
router.get('/all-messages', getAllMessages);
router.get('/messages/:receiverId', getMessages);
router.put('/edit-message/:messageId', updateMessage);

export default router;