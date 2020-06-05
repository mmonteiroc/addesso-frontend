const routes = [
  {
    path: '/',
    component: () => import('layouts/EmptyLayout.vue'),
    children: [
      {path: '', redirect: 'login'},
      {path: 'login', component: () => import('pages/public/Login.vue')},

    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {

}

export default routes
