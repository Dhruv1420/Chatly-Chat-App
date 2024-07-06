import express from "express";
import {
  adminLogin,
  adminLogout,
  getAdminData,
  getAllChats,
  getAllMessages,
  getAllUsers,
  getStats,
} from "../controllers/admin.js";
import { adminLoginValidator, validateHandler } from "../lib/validators.js";
import { adminOnly } from "../middlewares/auth.js";

const app = express.Router();

app.post("/verify", adminLoginValidator(), validateHandler, adminLogin);
app.get("/logout", adminLogout);

// only admin can access these routes
app.use(adminOnly);

app.get("/", getAdminData);

app.get("/users", getAllUsers);
app.get("/chats", getAllChats);
app.get("/messages", getAllMessages);
app.get("/stats", getStats);

export default app;
