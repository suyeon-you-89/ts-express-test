const menus = [
  { code: 'home', name: 'dashboard', type: 'page', path: '/' },
  { code: 'task', name: 'task', type: 'menu', path: '/task' },
  { code: 'request', name: 'request', type: 'page', path: '/request' }
];

const users = [
  {
    userId: 'suyeon',
    username: 'suyeon',
    password: 'you',
    email: 'suyeon@gmail.com'
  },
  {
    userId: 'jiu',
    username: 'jiu',
    password: 'lee',
    email: 'jiulee@gmail.com'
  },
  {
    userId: 'dong',
    username: 'dong',
    password: 'han',
    email: 'handong@gmail.com'
  },
  {
    userId: 'you',
    username: 'you',
    password: 'lee',
    email: 'leeyou@gmail.com'
  }
];

export const dummyData = { menus, users };
