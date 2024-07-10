import jwt from "jsonwebtoken";
import { adminSecretKey } from "../app.js";
import { TryCatch } from "../middlewares/error.js";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";
import { cookieOptions } from "../utils/features.js";
import { ErrorHandler } from "../utils/utility.js";

const adminLogin = TryCatch(async (req, res, next) => {
  const { secretKey } = req.body;

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched) return next(new ErrorHandler("Invalid Admin Key", 401));

  const token = jwt.sign(secretKey, process.env.JWT_SECRET);

  return res
    .status(200)
    .cookie("chatly-admin-token", token, {
      ...cookieOptions,
      maxAge: 1000 * 60 * 15,
    })
    .json({
      success: true,
      message: "Authenticated Successfully, Welcome BOSS!",
    });
});

const adminLogout = TryCatch(async (req, res, next) => {
  return res
    .status(200)
    .cookie("chatly-admin-token", "", {
      ...cookieOptions,
      maxAge: 0,
    })
    .json({
      success: true,
      message: "Logged Out Successfully",
    });
});

const getAdminData = TryCatch(async (req, res, next) => {
  return res.status(200).json({
    admin: true,
  });
});

const getAllUsers = TryCatch(async (req, res) => {
  const users = await User.find();

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [friends, groups] = await Promise.all([
        Chat.countDocuments({ groupChat: false, members: _id }),
        Chat.countDocuments({ groupChat: true, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        friends,
        groups,
      };
    })
  );

  return res.status(200).json({
    success: true,
    users: transformedUsers,
  });
});

const getAllChats = TryCatch(async (req, res) => {
  const chats = await Chat.find()
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });

      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
        members: members.map(({ _id, name, avatar }) => ({
          _id,
          name,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "None",
          avatar: creator?.avatar.url || "",
        },
        totalMembers: members.length,
        totalMessages,
      };
    })
  );

  return res.status(200).json({
    success: true,
    chats: transformedChats,
  });
});

const getAllMessages = TryCatch(async (req, res) => {
  const messages = await Message.find()
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages.map(
    ({ sender, chat, content, createdAt, _id, attachments }) => ({
      _id,
      attachments,
      content,
      createdAt,
      chat: chat._id,
      groupChat: chat.groupChat,
      sender: {
        _id: sender._id,
        name: sender.name,
        avatar: sender.avatar.url,
      },
    })
  );

  return res.status(200).json({
    success: true,
    messages: transformedMessages,
  });
});

const getStats = TryCatch(async (req, res) => {
  const [groupsCount, usersCount, msgCount, totalChatsCount] =
    await Promise.all([
      Chat.countDocuments({ groupChat: true }),
      User.countDocuments(),
      Message.countDocuments(),
      Chat.countDocuments(),
    ]);

  const today = new Date();
  const last7Days = new Date();
  last7Days.setDate(last7Days.getDate() - 7);

  const last7DaysMessages = await Message.find({
    createdAt: {
      $gte: last7Days,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);
  const dayInMiliSeconds = 1000 * 60 * 60 * 24;

  last7DaysMessages.forEach((message) => {
    const indexApprox =
      (today.getTime() - message.createdAt.getTime()) / dayInMiliSeconds;

    const index = Math.ceil(indexApprox);

    messages[6 - index]++;
  });

  const stats = {
    groupsCount,
    usersCount,
    msgCount,
    totalChatsCount,
    messagesChart: messages,
  };

  return res.status(200).json({
    success: true,
    stats,
  });
});

export {
  adminLogin,
  adminLogout,
  getAllChats,
  getAllMessages,
  getAllUsers,
  getStats,
  getAdminData,
};
