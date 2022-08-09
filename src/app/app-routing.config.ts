export const AppRoutes = {
  DEFAULT: '',
  HOME: 'home',
  REGISTER: 'register/:userType',
  LOGIN: 'login',
  APPOINTMENT: 'appointment/:userType',
  REQUEST: 'request',
  EDIT: 'edit',
  FOUROHFOUR: '**'
};

export const AppRouterLinks = {
  DEFAULT: [AppRoutes.DEFAULT],
  HOME: [AppRoutes.HOME],
  REGISTER: [AppRoutes.REGISTER],
  LOGIN: [AppRoutes.LOGIN],
  REQUEST: [AppRoutes.REQUEST],
  EDIT: [AppRoutes.EDIT],
  FOUROHFOUR: [AppRoutes.FOUROHFOUR]
};

export const AppRouterUrls = {
  DEFAULT: `/${AppRoutes.DEFAULT}`,
  HOME: `/${AppRoutes.HOME}`,
  REGISTER: `/${AppRoutes.REGISTER}`,
  APPOINTMENT: "/" + AppRoutes.APPOINTMENT,
  LOGIN: `/${AppRoutes.LOGIN}`,
  REQUEST: `/${AppRoutes.REQUEST}`,
  EDIT: `/${AppRoutes.EDIT}`,
  FOUROHFOUR: `/${AppRoutes.FOUROHFOUR}`
};
