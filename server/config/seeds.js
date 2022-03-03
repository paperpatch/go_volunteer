const db = require('./connection');
const { User, Category, Event, Comment } = require('../models');

db.once('open', async () => {
  await Category.deleteMany();
  await User.deleteMany();
  await Comment.deleteMany();

  const categories = await Category.insertMany([
    { name: 'Children & Youth' },
    { name: 'Community' },
    { name: 'Environment' },
    { name: 'Health & Medicine' },
    { name: 'Sports & Recreations' }
  ]);

  console.log('categories seeded');

  await Event.deleteMany();

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
      image: 'Special_Olympics_logo.svg'
    },
    {
      host: 'Test',
      title: 'High school tutoring',
      description:
        'Looking for help in calculus I for [redacted] High School. Please contact me at [redacted] or email me at [redacted]. Thank you.',
      category: categories[0]._id,
      location: '[redacted] High School',
      date: 'March 5, 2022',
      startTime: 'April 1, 2022',
      endTime: 'June 26, 2022',
      url: '/',
      image: 'tutoring.jpg'
    },
  ]);

  console.log('events seeded');

  await User.create({
    firstName: 'Test',
    lastName: 'Test',
    email: 'test@testmail.com',
    password: 'test',
    event: [
      {
        events: [events[0]._id, events[1]._id]
      }
    ]
  });

  console.log('users seeded');

  process.exit();
});
