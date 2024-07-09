import { dummyData } from './app.data.dummy';
db = db.getSiblingDB('admin');
db.createUser({
  user: 'admin',
  pwd: 'admin1234!',
  roles: [{ role: 'userAdminAnyDatabase', db: 'admin' }]
});

db.auth('admin', 'admin1234!');
// log as root admin if you decided to authenticate in your docker-compose file...
db = db.getSiblingDB('test');
// create and move to your new database
db.createUser({
  user: 'root',
  pwd: 'root1234!',
  roles: [
    {
      role: 'dbOwner',
      db: 'test'
    }
  ]
});

db.auth('root', 'root1234!');
// user created
db.createCollection('menus');
// add new collection

db.menus.insert(dummyData.menus);

db.createCollection('users');
db.users.insert(dummyData.users);
