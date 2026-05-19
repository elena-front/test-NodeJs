'use strict'

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "Daenerys",
          surname: "Targaryen",
          middlename: "Queen",
          birthDate: new Date("1990-01-01"),
          email: "test1@mail.com",
          password: await bcrypt.hash("tesjkdfst1", 10),
          role: "admin",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Ned",
          surname: "Stark",
          middlename: "North",
          birthDate: new Date("1968-12-14"),
          email: "example@mail.com",
          password: await bcrypt.hash("esfdxa25mp#$le", 10),
          role: "user",
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cersei",
          surname: "Lannister",
          middlename: "South",
          birthDate: new Date("1975-03-24"),
          email: "user1@mail.com",
          password: await bcrypt.hash("tuseGJ123r", 10),
          role: "admin",
          status: "inactive",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Users", {});
  },
};
