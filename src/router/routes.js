const routes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {path: '', redirect: 'login'},
      {path: 'login', component: () => import('pages/public/Login.vue')},
    ]
  },
  {
    path: '/worker',
    component: () => import('layouts/PrivateLayout.vue'),
    children: [
      {path: '', redirect: 'dashboard'},
      {path: 'dashboard', component: () => import('pages/private/worker/index.vue')},
    ],
    beforeEnter: (from, to, next) => {
      /*
      * We just 'control'
      * that the user is loged in
      * */
      const token = localStorage.getItem('access_token');
      if (!token) {
        next('/');
      } else {
        next();
      }
    }
  },
  {
    path: '/admin',
    component: () => import('layouts/PrivateLayout.vue'),
    children: [
      {path: '', redirect: 'dashboard'},
      {path: 'dashboard', component: () => import('pages/private/admin/index.vue')},
    ],
    beforeEnter: (from, to, next) => {
      /*
      * We 'control'
      * that the user is loged in
      * and has role admin
      * */
      const token = localStorage.getItem('access_token');
      const role = JSON.parse(localStorage.getItem("roles"));

      if (!token || role.indexOf("admin") == -1) {
        next('/');
      } else {
        next();
      }
    }
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {

}

export default routes
