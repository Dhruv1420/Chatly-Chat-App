export const sampleChats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Dhruv",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Alok",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const sampleUsers = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Dhruv",
    _id: "1",
  },
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Alok",
    _id: "2",
  },
];

export const sampleNotifications = [
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv",
    },
    _id: "1",
  },
  {
    sender: {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Alok",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [],
    content: "Or bhai aaj mausam mast h",
    _id: "dasdaas",
    sender: {
      _id: "userId",
      name: "Alok",
    },
    chat: "chatId",
    createdAt: "2024-07-02T13:17:51.602Z",
  },
  {
    attachments: [
      {
        public_id: "assa2",
        url: "https://www.w3schools.com/howto/img.avatar.png",
      },
    ],
    content: "",
    _id: "dasdaas2",
    sender: {
      _id: "wasa",
      name: "Alok",
    },
    chat: "chatId",
    createdAt: "2024-07-02T13:17:51.602Z",
  },
];

export const dashboardData = {
  users: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv",
      _id: "1",
      username: "dhruv20",
      friends: 5,
      groups: 4,
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Alok",
      _id: "2",
      username: "alok14",
      friends: 20,
      groups: 2,
    },
  ],

  chats: [
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Dhruv",
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 4,
      totalMessages: 5,
      creator: {
        name: "Dhruv",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "Alok",
      _id: "2",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 50,
      creator: {
        name: "Alok",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: "Or bhai aaj mausam mast h",
      _id: "dasdaas",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Alok",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-07-02T13:17:51.602Z",
    },
    {
      attachments: [
        {
          public_id: "assa2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "dasdaas2",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Alok",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-07-02T13:17:51.602Z",
    },
  ],
};
