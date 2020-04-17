const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const models = db.models;
const fileUpload = require('express-fileupload');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.json());

app.use((req, res, next) => {
  console.log(
    'method',
    req.method,
    ' URL: ',
    req.url,
    ' body: ',
    req.body,
    'user',
    req.user
  );
  next();
});

const isLoggedIn = (req, res, next) => {
  //console.log(req.user, 'req.user in isLoggedin');
  if (!req.user) {
    const error = Error('not authorized');
    error.status = 401;
    return next(error);
  }
  next();
};

const isAdmin = (req, res, next) => {
  //console.log(req.user.role, 'req.user.role');
  if (req.user.role !== 'ADMIN') {
    return next(Error('not authorized'));
  }
  next();
};

app.use((req, res, next) => {
  const token = req.headers.authorization;
  //console.log(token, 'token');
  if (!token) {
    return next();
  }
  db.findUserFromToken(token)
    .then((auth) => {
      req.user = auth;
      next();
    })
    .catch((ex) => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});

app.get('/', (req, res, next) =>
  res.sendFile(path.join(__dirname, 'index.html'))
);

app.post('/api/auth', (req, res, next) => {
  //console.log(req.body, 'in auth at the top');
  db.authenticate(req.body)
    .then((token) => res.send({ token }))
    .catch(() => {
      const error = Error('not authorized');
      error.status = 401;
      next(error);
    });
});

app.get('/api/auth', isLoggedIn, (req, res, next) => {
  res.send(req.user);
});

//============PHOTO UPLOAD=================//
app.use(fileUpload());

//Upload endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
  });
});
//============PHOTO UPLOAD END=================//

app.post('/api/createProfile', (req, res, next) => {
  models.profiles
    .createProfile(req.body)
    .then((profile) => res.send(profile))
    .catch(next);
});

app.post('/api/search/perfect_match', (req, res, next) => {
  models.searches
    .searchPerfectMatch(req.body)
    .then((usernames) => res.send(usernames))
    .catch(next);
});

app.post('/api/search/zipcode', (req, res, next) => {
  models.searches
    .searchZipCode(req.body)
    .then((usernames) => res.send(usernames))
    .catch(next);
});

app.get('/api/findUserId', (req, res, next) => {
  db.findUserId(req.user.id)
    .then((userid) => res.send(userid))
    .catch(next);
});

app.get('/api/getUserIdFromEmail', (req, res, next) => {
  db.getUserIdFromEmail(req.body)
    .then((userid) => res.send(userid))
    .catch(next);
});

app.get('/api/findCareerId', (req, res, next) => {
  db.findCareerId(req.user.id)
    .then((careerid) => res.send(careerid))
    .catch(next);
});
app.get('/api/careers', (req, res, next) => {
  db.readCareers()
    .then((careers) => res.send(careers))
    .catch(next);
});
app.get('/api/genders', (req, res, next) => {
  db.readGenders()
    .then((genders) => res.send(genders))
    .catch(next);
});
app.get('/api/religions', (req, res, next) => {
  db.readReligions()
    .then((religions) => res.send(religions))
    .catch(next);
});
app.get('/api/pets', (req, res, next) => {
  db.readPets()
    .then((pets) => res.send(pets))
    .catch(next);
});
app.get('/api/employment_status', (req, res, next) => {
  db.readEmploymentStatus()
    .then((employ) => res.send(employ))
    .catch(next);
});
app.get('/api/political_parties', (req, res, next) => {
  db.readPoliticalParties()
    .then((party) => res.send(party))
    .catch(next);
});

app.get('/api/hobbies', (req, res, next) => {
  db.readHobbies()
    .then((hobbies) => {
      res.send(hobbies);
    })
    .catch(next);
});
app.get('/api/profiles', (req, res, next) => {
  db.readProfiles()
    .then((profiles) => {
      res.send(profiles);
    })
    .catch(next);
});
app.get('/api/education', (req, res, next) => {
  db.readEducation()
    .then((school) => {
      res.send(school);
    })
    .catch(next);
});
app.get('/api/users', (req, res, next) => {
  models.users
    .read()
    .then((user) => {
      res.send(user);
    })
    .catch(next);
});
app.post('/api/user_hobbies', (req, res, next) => {
  db.createUserHobbies(req.body)
    .then((hobbies) => {
      res.send(hobbies);
    })
    .catch(next);
});
app.post('/api/createUserHobbies', (req, res, next) => {
  models.hobbies
    .createUserHobbies(req.body)
    .then((hobbies) => res.send(hobbies))
    .catch(next);
});

//validating password change
app.post('/api/auth/validate', (req, res, next) => {
  db.authenticate(req.body)
    .then((token) => {
      res.send({ token });
    })
    .catch(() => {
      const error = Error('Incorrect current password');
      error.status = 401;
      next(error);
    });
});

//change password
app.put('/api/user/password/:id', (req, res, next) => {
  db.changePassword(req.body)
    .then((response) => res.send(response))
    .catch(next);
});

Object.keys(models).forEach((key) => {
  //console.log(models);
  app.get(`/api/${key}`, isLoggedIn, (req, res, next) => {
    models[key]
      .read({ user: req.user })
      .then((items) => res.send(items))
      .catch(next);
  });
  app.post(`/api/${key}`, (req, res, next) => {
    //console.log(req.body, 'user post');
    models[key]
      .create(req.body)
      .then((items) => res.send(items))
      .catch(next);
  });
  app.put(`/api/${key}/:id`, (req, res, next) => {
    //console.log(req.body, 'user put');
    models[key]
      .update(req.body, req.params.id)
      .then((items) => res.send(items))
      .catch(next);
  });
  app.delete(`/api/${key}/:id`, (req, res, next) => {
    //console.log(req.params.id, 'user delet');
    models[key]
      .delete(req.params.id)
      .then(() => res.sendStatus(204))
      .catch(next);
  });
});

//will make sure the get requests work with the router
app.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.use((req, res, next) => {
  const error = {
    message: `page not found ${req.url} for ${req.method}`,
    status: 404,
  };
  next(error);
});

app.use((err, req, res, next) => {
  console.log(err.status);
  res.status(err.status || 500).send({ message: err.message });
});

module.exports = app;
