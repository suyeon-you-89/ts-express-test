const menus = [
  { code: 'home', name: 'dashboard', type: 'page', path: '/' },
  { code: 'task', name: 'task', type: 'menu', path: '/task' },
  { code: 'request', name: 'request', type: 'page', path: '/request' }
];

const users = [
  {
    userId: 'admin',
    email: 'admin@gmail.com',
    username: 'suyeon.you',
    password: '1234!',
    birth: '19890622',
    phone: '01043140622',
    employeeId: null
  }
];

export const dummyData = { menus, users };
