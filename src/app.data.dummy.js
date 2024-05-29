const menus = [
  { code: 'home', name: 'dashboard', type: 'page', path: '/' },
  { code: 'task', name: 'task', type: 'menu', path: '/task' },
  { code: 'request', name: 'request', type: 'page', path: '/request' }
];

const users = [
  {
    username: 'suyeon',
    password: 'you',
    email: 'suyeon@gmail.com'
  },
  {
    username: 'jiu',
    password: 'lee',
    email: 'jiulee@gmail.com'
  },
  {
    username: 'dong',
    password: 'han',
    email: 'handong@gmail.com'
  },
  {
    username: 'you',
    password: 'lee',
    email: 'leeyou@gmail.com'
  }
];

export const dummyData = { menus, users };
