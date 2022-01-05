module.exports = {
  /*
  ** Headers of the page
  */
 
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ticketing Project with Java' }
    ],
    link: [
      {
        rel: 'stylesheet prefetch',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap.min.css'
      }
      , {
        rel: 'stylesheet prefetch',
        href: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/css/bootstrap-theme.min.css'
      }
    ]
  }
}


export default {
  /*
   ** Runtime Config
   */

  publicRuntimeConfig: {
    axios: {
      baseURL: 'localhost:8080'
    }
  },

  /*
   ** Modules - https://nuxtjs.org/docs/2.x/directory-structure/modules
   */
   modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  }
}

