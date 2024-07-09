const menus = [
  {
    type: 'section',
    text: '회원관리',
    code: 'account',
    url: '/management',
    ancestors: [],
    parent: null
  },
  {
    type: 'menu',
    text: '기관관리',
    code: 'agency',
    url: '/agency',
    ancestors: ['account'],
    parent: 'account'
  },
  {
    type: 'menu',
    text: '사용자관리',
    code: 'user',
    url: '/user',
    ancestors: ['account'],
    parent: 'account'
  },
  {
    type: 'section',
    text: 'service',
    code: 'service-management',
    url: '/management',
    ancestors: [],
    parent: null
  },
  {
    type: 'menu',
    text: '약관관리',
    code: 'agreement',
    url: '/agreement',
    ancestors: ['service-management'],
    parent: 'service-management'
  },
  {
    type: 'section',
    text: 'board',
    url: '/board',
    code: 'board',
    ancestors: [],
    parent: null
  },
  {
    type: 'menu',
    text: '공지사항',
    code: 'notice',
    url: '/notice',
    ancestors: ['board'],
    parent: 'board'
  },
  {
    type: 'menu',
    text: '규정/지침',
    url: '/rules',
    code: 'rules',
    ancestors: ['board'],
    parent: 'board'
  },
  {
    type: 'menu',
    text: 'FAQ',
    url: '/faqs',
    code: 'faqs',
    ancestors: ['board'],
    parent: 'board'
  }
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
