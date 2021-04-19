module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Posts", [
      {
      id: "c375c640-81ff-405a-89a8-460ea2f71755",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      post: "The Manager is a nice man, and a friendly person ",
      likes: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "a430e505-937b-4908-9422-7aa57044e85a",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6ddbb",
      post: "I like it here, it is a very quiet place",
      likes: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id: "7cc6de97-2ed6-4422-9ce2-9ff22cc5e97a",
      userId: "fc1f4e85-8e83-4a38-ab1e-8e4da2c6dd25",
      post: "Bakare is not a good President, he should resign",
      likes: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      id: "6cbaa746-6e42-453e-91f4-c0de15fb4b9f",
      userId: "57af7c29-efb2-434e-9fce-b87c77447aaa",
      post: "Arsenal can win the Europa league this year",
      likes: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ,], 
    {});
  },

  down: async (queryInterface, Sequelize) => {

  },
};
