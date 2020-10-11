import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123123", 10),
    isAdmin: true,
  },
  {
    name: "Josh",
    email: "josh@example.com",
    password: bcrypt.hashSync("123123", 10),
  },
  {
    name: "Test",
    email: "test@example.com",
    password: bcrypt.hashSync("123123", 10),
  },
];

export default users;
