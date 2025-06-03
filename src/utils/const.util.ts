export const SCHEMA = {
  swagger: {
    routePrefix: '/doc',
  },
  desc: {
    user: {
      id: 'ユーザID',
      name: 'ユーザ名',
      email: 'メールアドレス',
      birthday: '誕生日',
      address: '住所',
    },
  },
  tags: {
    user: {
      name: 'user',
      description: 'ユーザAPI',
    },
  },
} as const;
