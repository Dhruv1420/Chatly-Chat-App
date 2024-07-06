import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";

const createSingleChats = async (cnt) => {
  try {
    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < users.length; i++) {
      for (let j = i + 1; j < users.length; j++) {
        chatsPromise.push(
          Chat.create({
            name: faker.lorem.words(2),
            members: [users[i], users[j]],
          })
        );
      }
    }

    await Promise.all(chatsPromise);

    console.log(`Chats created Successfully`);
    process.exit(1);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createGroupChats = async (cnt) => {
  try {
    const users = await User.find().select("_id");

    const chatsPromise = [];

    for (let i = 0; i < cnt; i++) {
      const numMembers = simpleFaker.number.int({ min: 3, max: users.length });
      const members = [];

      for (let j = 0; j < numMembers; j++) {
        const randomIndex = Math.floor(Math.random() * users.length);
        const randomUser = users[randomIndex];

        // ensure same user is not added twice
        if (!members.includes(randomUser)) members.push(randomUser);
      }

      const chat = Chat.create({
        name: faker.lorem.words(1),
        members,
        groupChat: true,
        creator: members[0],
      });
    }

    await Promise.all(chatsPromise);

    console.log(`Chats created Successfully`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessages = async (cnt) => {
  try {
    const users = await User.find().select("_id");
    const chats = await Chat.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < cnt; i++) {
      const randUser = users[Math.floor(Math.random() * users.length)];
      const randChat = chats[Math.floor(Math.random() * chats.length)];
      messagesPromise.push(
        Message.create({
          content: faker.lorem.sentence(),
          sender: randUser,
          chat: randChat,
        })
      );
    }

    await Promise.all(messagesPromise);
    console.log(`Messages created Successfully`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const createMessagesInChat = async (chatId, numMessages) => {
  try {
    const users = await User.find().select("_id");

    const messagesPromise = [];

    for (let i = 0; i < numMessages; i++) {
      const randUser = users[Math.floor(Math.random() * users.length)];
      messagesPromise.push(
        Message.create({
          content: faker.lorem.sentence(),
          sender: randUser,
          chat: chatId,
        })
      );
    }

    await Promise.all(messagesPromise);

    console.log(`Messages created Successfully`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export {
  createGroupChats,
  createMessages,
  createMessagesInChat,
  createSingleChats
};

