import Vue from 'vue'
import axios from 'axios'


const API = axios.create({
  baseURL: process.env.API_URL
});


export default async ({Vue, router}) => {

  API.interceptors.request.use(config => {
    config.withCredentials = true;
    const token = localStorage.getItem('access_token');
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  }, function (error) {

    return Promise.reject(error);
  });

  API.interceptors.response.use(function (response) {
    return response;
  }, async function (error) {

    const originalRequest = error.config;

    if (error.response.status === 401 && router.history.current.path !== '/login') {
      // UNAUTORIZED, token no valido o token caducado.

      /*
      * Step 1- Intentar renovar token
      * */
      let response = await API.post('/auth/login/refresh', {
        refresh_token: localStorage.getItem("refresh_token")
      });

      /*
      * Guardar token
      * */

      /*
      * OK - token renovado
      * */

      if (response.status === 200) {

        const token = response.data.access_token;
        const refresh = response.data.refresh_token;
        localStorage.setItem("access_token", token);
        localStorage.setItem("refresh_token", refresh);


        return API(originalRequest);
      } else {
        router.push("/login")
      }

    }

    if (error.response.status === 403) {
      // FORBIDEN - NO tienes permisos, loggeate con usuario que si tenga permisos
      router.push('/login')
    }

    return error.response;
  });
}

Vue.prototype.$API = API;
