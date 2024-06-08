"use strict";
import bcrypt from "bcrypt";
export default {
  up: async (queryInterface, Sequelize) => {
    const users = [
      {
        id: 3000,
        name: "U1",
        age: 21,
        password: "123123",
        email: "u1@kitra.abc",
      },
      {
        id: 3001,
        name: "U2",
        age: 51,
        email: "u2@kitra.abc",
        password: "234234",
      },
      {
        id: 3002,
        name: "U3",
        age: 31,
        password: "345345",
        email: "u3@kitra.abc",
      },
      {
        id: 3003,
        name: "U4",
        age: 18,
        password: "456456",
        email: "u4@kitra.abc",
      },
      {
        id: 3004,
        name: "U5",
        age: 21,
        password: "567567",
        email: "u5@kitra.abc",
      },
      {
        id: 3005,
        name: "U6",
        age: 35,
        password: "678678",
        email: "u6@kitra.abc",
      },
    ];
    const hashedUsers = await Promise.all(
      users.map(async (user) => {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );
    await queryInterface.bulkInsert("Users", hashedUsers, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
