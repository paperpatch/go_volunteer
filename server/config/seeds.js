const db = require('./connection');
const { User, Category, Event } = require('../models');

db.once('open', async () => {

  await Category.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Children & Youth' },
    { name: 'Community' },
    { name: 'Environment' },
    { name: 'Health & Medicine' },
    { name: 'Sports & Recreation' }
  ]);

  console.log('categories seeded');

  await User.deleteMany();

  await User.create({
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@test.com',
    password: 'test'
  });

  await User.create({
    firstName: 'Test2',
    lastName: 'Test2',
    email: 'test2@test2.com',
    password: 'test2'
  });

  console.log('users seeded');

  await Event.deleteMany();

  const events = await Event.insertMany([
    {
      category: categories[0]._id,
      title: 'Volunteer at Special Olympics!',
      location: 'Your local special olympics committee',
      description:
        'Help students by coaching and assisting in their game play. All available sports are listed in our website.',
      date: 'March 2, 2022',
      createdAt: '3/6/2022',
      startTime: '9 AM',
      endTime: '5 PM',
      url: 'https://www.specialolympics.org/',
      image: 'Special_Olympics_logo.png',
    },
    {
      category: categories[1]._id,
      title: 'High school tutoring',
      location: '[redacted] High School',
      description:
        'Looking for help in calculus I for [redacted] High School. Please contact me at [redacted] or email me at [redacted]. Thank you.',
      date: 'March 5, 2022',
      createdAt: '3/6/2022',
      startTime: '7 PM',
      endTime: '9 PM',
      url: 'https://en.wikipedia.org/wiki/Secondary_school',
      image: 'tutoring.jpg',
    },
  ]);

  console.log('events seeded');

  process.exit();
});
