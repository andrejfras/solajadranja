// server.js
// Full-stack sailing school webpage using Node.js + Express and MongoDB Atlas

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

function requireAdmin(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    res.set('WWW-Authenticate', 'Basic');
    return res.status(401).send('Authentication required');
  }

  const [user, pass] = Buffer
    .from(auth.split(' ')[1], 'base64')
    .toString()
    .split(':');

  if (
    user === process.env.ADMIN_USER &&
    pass === process.env.ADMIN_PASS
  ) {
    next();
  } else {
    res.status(403).send('Access denied');
  }
}


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Signup model
const Signup = mongoose.model(
  'Signup',
  new mongoose.Schema({
    course: String,

    fullName: { type: String, required: true },
    address: String,
    postalCode: String,
    city: String,

    phone: { type: String, required: true },
    email: { type: String, required: true },

    participants: { type: Number, required: true },
    notes: String,

    date: { type: Date, default: Date.now }
  })
);

const Content = mongoose.model(
  'Content',
  new mongoose.Schema({
    key: { type: String, unique: true },
    data: mongoose.Schema.Types.Mixed,
    updatedAt: { type: Date, default: Date.now }
  })
);

const COURSE_DEFINITIONS = {
  beginner: "Začetni tečaj jadranja",
  "course-intermediate": "Nadaljevalni tečaj jadranja",
  "course-docking": "Tečaj pristajanja",
  "course-regatta": "Regatno jadranje",
  "course-rib": "Tečaj gumenjaka"
};




// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/admin/dashboard', requireAdmin, (req, res) => {
  res.sendFile(path.resolve('views/admin.html'));
});


// Serve homepage
import path from 'path';

app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});


// Admin view of signups
app.get('/admin', async (req, res) => {
  try {
    const signups = await Signup.find().sort({ date: -1 });
    const list = signups.map(s => `<li>${s.name} – ${s.email} – ${s.course} – ${s.date.toLocaleString()}</li>`).join('');
    res.send(`<h1>All Signups</h1><ul>${list}</ul><a href='/'>Back to home</a>`);
  } catch (err) {
    console.error('Error fetching signups:', err);
    res.status(500).send('Error fetching signups');
  }
});



// ROUTES (HTML pages)
app.use(express.static('public'));
app.use('/partials', express.static('views/partials'));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

// SIGNUP
app.post('/signup', async (req, res) => {
  try {
    const {
      course,
      fullName,
      address,
      postalCode,
      city,
      phone,
      email,
      participants,
      notes
    } = req.body;

    if (!fullName || !phone || !email || !participants) {
      return res.status(400).send('Manjkajo obvezna polja');
    }

    await Signup.create({
      course,
      fullName,
      address,
      postalCode,
      city,
      phone,
      email,
      participants,
      notes
    });

    res.send('<h1>Prijava uspešna</h1><a href="/">Nazaj</a>');
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).send('Napaka pri shranjevanju');
  }
});




app.post('/admin/save-courses', requireAdmin, async (req, res) => {
  const { id, date, spots } = req.body;

  // id, date, spots are ARRAYS
  const coursesMap = {};

  id.forEach((courseId, index) => {
    if (!coursesMap[courseId]) {
      coursesMap[courseId] = {
        id: courseId,
        name: courseId,
        dates: []
      };
    }

    coursesMap[courseId].dates.push({
      id: Date.now().toString() + index,
      label: date[index],
      spots: Number(spots[index]),
      enabled: true
    });
  });

  const courses = Object.values(coursesMap);

  await Content.findOneAndUpdate(
    { key: 'availableCourses' },
    { data: courses },
    { upsert: true }
  );

  res.redirect('/admin/dashboard');
});


app.post('/admin/add-course-date', requireAdmin, async (req, res) => {
  const { courseId, label, spots } = req.body;

  const doc = await Content.findOne({ key: 'availableCourses' });
  const courses = doc?.data || [];

  let course = courses.find(c => c.id === courseId);

  if (!course) {
    course = {
      id: courseId,
      name: COURSE_DEFINITIONS[courseId] || courseId,
      dates: []
    };
    courses.push(course);
  } else {
    // 🔒 enforce correct name even on existing courses
    course.name = COURSE_DEFINITIONS[courseId] || course.name;
  }

  course.dates.push({
    id: Date.now().toString(),
    label,
    capacity: Number(spots),
    spots: Number(spots),
    enabled: true
  });

  await Content.findOneAndUpdate(
    { key: 'availableCourses' },
    { data: courses },
    { upsert: true }
  );

  res.redirect('/admin/dashboard');
});

  

app.post('/admin/update-course-date', requireAdmin, async (req, res) => {
  const { courseId, dateId, label, capacity, spots } = req.body;

  const doc = await Content.findOne({ key: 'availableCourses' });
  const courses = doc?.data || [];

  const course = courses.find(c => c.id === courseId);
  if (!course) return res.redirect('/admin/dashboard');

  const date = course.dates.find(d => d.id === dateId);
  if (!date) return res.redirect('/admin/dashboard');

  date.label = label;
  date.capacity = Number(capacity);
  date.spots = Math.min(Number(spots), date.capacity);

  await Content.findOneAndUpdate(
    { key: 'availableCourses' },
    { data: courses },
    { upsert: true }
  );

  res.redirect('/admin/dashboard');
});


app.post('/admin/delete-course-date', requireAdmin, async (req, res) => {
  try {
    const { courseId, dateId } = req.body;

    const doc = await Content.findOne({ key: 'availableCourses' });
    const courses = doc?.data || [];

    const course = courses.find(c => c.id === courseId);
    if (!course) return res.redirect('/admin/dashboard');

    course.dates = course.dates.filter(d => d.id !== dateId);

    await Content.findOneAndUpdate(
      { key: 'availableCourses' },
      { data: courses },
      { upsert: true }
    );

    res.redirect('/admin/dashboard');
  } catch (err) {
    console.error('Delete course date error:', err);
    res.status(500).send('Napaka pri brisanju termina');
  }
});



app.get('/api/content/available-courses', async (req, res) => {
  const doc = await Content.findOne({ key: 'availableCourses' });
  res.json(doc?.data || []);
});


// SPA fallback (Express 5 compatible)
app.get(/^(?!\/api|\/admin).*/, (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});



app.listen(port, () =>
  console.log(`Running at http://localhost:${port}`)
);

