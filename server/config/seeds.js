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

  console.log('users seeded');

  await Event.deleteMany();

  const events = await Event.insertMany([
    {
      host: '[redacted] High School',
      category: categories[0]._id,
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
    {
      host: 'Exchange Center',
      category: categories[0]._id,
      title: 'Become a Host Family to a High School Exchange Student!',
      location: 'Your house',
      description:
        'Ready to enjoy some cultural sharing? Invite an international high school student into your home for a few weeks, a semester or even a full school year. Make an impact by hosting an exchange student. Enrich your family and bring the world a bit closer together.',
      date: 'September 1, 2022',
      createdAt: '3/6/2022',
      startTime: '12 PM',
      endTime: '12 PM',
      url: 'https://www.icesusa.org/',
      image: 'icesusa_logo.png',
    },
    {
      host: '[redacted] Daycare',
      category: categories[0]._id,
      title: 'Child Care Volunteer',
      location: 'Your local Daycare center',
      description:
        'Child care provider will supervise and paly with children while their parents attend classes. Previous experience working with children is a plus but not required. A background check will be completed before volunteering can begin.',
      date: 'June 28, 2022',
      createdAt: '3/7/2022',
      startTime: '9 AM',
      endTime: '5 PM',
      url: 'https://en.wikipedia.org/wiki/Child_care',
      image: 'daycare_logo.jpg',
    },
    {
      host: '[Town]',
      category: categories[1]._id,
      title: '[Town] Celebration!',
      location: 'At your local town',
      description:
        'Need volunteer help in managing help and water stations in our [town] celebration weekend event.',
      date: 'July 23, 2022',
      createdAt: '3/7/2022',
      startTime: '8 AM',
      endTime: '7 PM',
      url: 'https://en.wikipedia.org/wiki/Volunteering',
      image: 'volunteer_hand.jpg',
    },
    {
      host: 'Helping Hands',
      category: categories[1]._id,
      title: 'Furniture for the Homeless',
      location: 'This original place',
      description:
        'This [program] have volunteers go out to collect and distribute furniture and household goods to individuals, families, veterans, and youth moving out of homelessness.',
      date: 'April 2, 2022',
      createdAt: '3/7/2022',
      startTime: '9 AM',
      endTime: '5 PM',
      url: 'https://en.wikipedia.org/wiki/Child_care',
      image: 'help_homeless.jpg',
    },
    {
      host: 'Earth Day Center',
      category: categories[2]._id,
      title: 'Earth Day Clean Up',
      location: 'Your local community center',
      description:
        'Join a cleanup community to take the first step in protecting our planet. Contribute to a cleaner and healthier community by tackling out-of-control waste.',
      date: 'April 22, 2022',
      createdAt: '3/7/2022',
      startTime: '8 AM',
      endTime: '10 PM',
      url: 'https://www.earthday.org/actions/green-up-with-a-cleanup-volunteer-for-a-cleanup-in-your-community/',
      image: 'earth_day.jpg',
    },
    {
      host: 'Team Trees',
      category: categories[2]._id,
      title: 'Join Team Trees',
      location: 'Global',
      description:
        'Join the Arbor Foundation or donate to help plant a tree all over the world. Our trees take care of our habitat. Learn more at teamtrees.org.',
      date: 'June 1, 2022',
      createdAt: '3/7/2022',
      startTime: '9 AM',
      endTime: '5 PM',
      url: 'https://teamtrees.org/',
      image: 'team_trees.png',
    },
    {
      host: '[Local] Climate Center',
      category: categories[2]._id,
      title: 'Climate Environment Advocate',
      location: 'Somewhere in here',
      description:
        `As a colunteer, you'll be a member of the fastest growing and most effective climate advocacy group. Work with concerned [State] citizens to slow the effects of climate change. You will meet with congressional leaders, write letters to editors and meet with local media. Join our meeting at [redacted].`,
      date: 'April 26, 2022',
      createdAt: '3/7/2022',
      startTime: '2 PM',
      endTime: '4 PM',
      url: 'https://en.wikipedia.org/wiki/Climate_change',
      image: 'climate_change.jpg',
    },
    {
      host: '[redacted] Health Center',
      category: categories[3]._id,
      title: 'Community Health Center Volunteer',
      location: 'Multiple locations',
      description:
        '[Redacted] seeks to recruit volunteers to prepare materials for community events and provide various support roles for those events. Activities include assisting with food drives, homeless outreach, and HIV prep outreach.',
      date: 'April 1, 2022',
      createdAt: '2/9/2022',
      startTime: '9 AM',
      endTime: '5 PM',
      url: 'https://en.wikipedia.org/wiki/Community_health_center',
      image: 'health_care.jpg',
    },
    {
      host: 'Healthy Body Fight',
      category: categories[3]._id,
      title: 'Fight Against Pancreatic Cancer',
      location: 'Virtual Meetings',
      description:
        'Interested in making a difference? Our volunteers raise funds and awareness throughout the year to support research and clinical initiatives, patient services, advocacy, and more.',
      date: 'June 15, 2022',
      createdAt: '3/7/2022',
      startTime: '7 PM',
      endTime: '9 PM',
      url: 'https://en.wikipedia.org/wiki/Pancreatic_cancer',
      image: 'pancreatic_cancer.jpg',
    },
    {
      host: '[High School] Special Olympics',
      category: categories[4]._id,
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
      host: '[Town]',
      category: categories[4]._id,
      title: 'Volunteers Needed for Annual Half Marathon',
      location: '[Redacted] Park',
      description:
        'Looking for volunteers to come approximately 2 hours ahead of race kick-off time, as well as those who can stay after to help clean up. Looking for help in setting up water stations, putting up signs along course, and directing runners along the course.',
      date: 'April 23, 2022',
      createdAt: '3/7/2022',
      startTime: '8 AM',
      endTime: '12 PM',
      url: 'https://en.wikipedia.org/wiki/Half_marathon',
      image: 'running_logo.png',
    },
    {
      host: 'Adapted Sports',
      category: categories[4]._id,
      title: 'Adapted Sports - Track and Field training',
      location: 'Your local senior care center',
      description:
        'Our sports program serves youth and adults living with physical disabilities. Looking for volunteer who has experience in fitness or knows their way around a training gym. Help guide and develop sport-specific skill training using Paralympic model.',
      date: 'April 22, 2022',
      createdAt: '3/9/2022',
      startTime: '6 PM',
      endTime: '8 PM',
      url: 'https://en.wikipedia.org/wiki/Paralympic_Games',
      image: 'paralympic_logo.png',
    },
  ]);

  console.log('events seeded');

  process.exit();
});
