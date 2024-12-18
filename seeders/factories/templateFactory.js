const { faker } = require('@faker-js/faker');

const generateTemplates = async (userIds, count = 1) => {
  const templates = []
  for (let i = 0; i < count; i++) {
    templates.push({
      author_id: faker.helpers.arrayElement(userIds),
      template_name: faker.lorem.words({ min: 1, max: 3 }),
      template_description: faker.lorem.paragraph(),
      image_url: faker.image.url(),
      topic_id: faker.number.int({ max: 10 })
    });
  }
  return templates
};

module.exports = generateTemplates