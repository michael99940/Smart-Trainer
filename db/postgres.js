const { Pool } = require('pg');
const crypto = require('crypto');

const client = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'smarttrainer',
  password: 'postgres',
  port: 5432
});

client.connect((err) => {
  if (err) {
    console.error(err.stack);
  } else {
    console.log('connected');
  }
})

const getUser = (username) => {
  return new Promise((resolve, reject) => {
    client.query(`SELECT * FROM athletes WHERE username='${username}'`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getSalt = (username) => {
  return new Promise((resolve, reject) => {
    client.query(`SELECT salt FROM athletes WHERE username='${username}'`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const updateUser = (column, input, username) => {
  return new Promise ((resolve, reject) => {
    client.query(`UPDATE athletes SET ${column}=${input} WHERE username='${username}'`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const getExercise = (column, input) => {
  return new Promise((resolve, reject) => {
    client.query(`SELECT * FROM exercises WHERE ${column}='${input}'`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

//private helpers above

const newUser = (username, pass, goal) => {
  getUser(username).then(results => {
    if (results.length) {
      return 'Username Taken';
    } else {
      return new Promise((resolve, reject) => {
        var hash = crypto.createHash('sha256');
        var salt = crypto.randomBytes(16).toString('hex');
        hash.update(pass + salt);
        client.query(`INSERT INTO athletes (
					goal, 
					username, 
					password, 
					salt
					) VALUES (
						'${goal}', 
						'${username}', 
						'${hash.digest()}', 
						'${salt}'
						)`, (err, res) => {
          if (err) {
            hash.end();
            reject(err);
          } else {
            hash.end();
            resolve(res);
          }
        });
      });
    }
  });
};

const userLogin = (username, pass) => {
  getSalt(username).then(results => {
    if (!results.length) {
      return 'no such user';
    } else { 
      var hash = crypto.createHash('sha256');
      hash.update(pass + results[0]);
      pass = hash.digest();
      hash.end();
      return new Promise((resolve, reject) => {
        client.query(`SELECT FROM athletes WHERE username='${username}' AND password='${pass}'`, (err, res) => {
          if (err) {
            reject(err);
          } else {
            resolve(res);
          }
        });
      });
    }
  })
    .catch(error => console.error(error));
};

const updateUserPass = (pass, username) => {
  getSalt(username).then(results => {
    var hash = crypto.createHash('sha256');
    console.log(results) //test output format
    hash.update(pass + results[0]);
    var newPass = hash.digest();
    hash.end();
    return updateUser('password', newPass, username);
  })
    .catch(error => {
      return console.error(error);
    });
};

const updateUserGoal = (goal, username) => {
  return updateUser('goal', goal, username);
};

const getMetrics = (id, dateStart, dateEnd) => {
  return new Promise ((resolve, reject) => {
    client.query(`SELECT * FROM metrics WHERE athleteid=${id} AND entryDate >= ${dateStart} AND entryDate <= ${dateEnd}`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const insertMetric = (id, weight, height, bodyFat, entryDate) => {
  return new Promise((resolve, reject) => {
    client.query(`INSERT INTO metrics (
			athleteid, 
			weight, 
			height, 
			bodyFat, 
			entryDate
			) VALUES (
				${id}, 
				${weight}, 
				${height}, 
				${bodyFat}, 
				${entryDate}
				)`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

const deleteMetric = (id, dateStart, dateEnd) => {
  return new Promise((resolve, reject) => {
    client.query(`DELETE FROM metrics WHERE athleteid=${id} AND entryDate >= ${dateStart} AND entryDate <= ${dateEnd}`, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    })
  })
}

const getExerciseByName = name => getExercise('exerciseName', name);
const getExerciseByTarget = target => getExercise('mainTarget', target);

module.exports = {
  getMetrics,
  insertMetric,
  deleteMetric,
  newUser,
  getExerciseByName,
  getExerciseByTarget,
  updateUserPass,
  updateUserGoal,
}