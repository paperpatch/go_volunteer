const db = require('./connection');
const { User, Category, Event, Comment, EventLike } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  await Comment.deleteMany();
  await Event.deleteMany();
  await EventLike.deleteMany();
  await User.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Children & Youth' },
    { name: 'Community' },
    { name: 'Environment' },
    { name: 'Health & Medicine' },
    { name: 'Sports & Recreation' }
  ]);

  console.log('categories seeded');

  const events = await Event.insertMany([
    {
      host: 'Test',
      title: 'Volunteer at Special Olympics!',
      description:
        'Help students by coaching and assisting in their game play. All available sports are listed in our website.',
      category: categories[0]._id,
      location: 'Your local special olympics committee',
      date: 'March 2, 2022',
      startTime: 'April 1, 2022',
      endTime: 'June 26, 2022',
      url: 'https://www.specialolympics.org/',
      image: 'Special_Olympics_logo.svg',
    },
  ]);

  console.log('events seeded');

  await User.create({
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.com',
    password: 'test',
  });

  console.log('users seeded');

  process.exit();
});
