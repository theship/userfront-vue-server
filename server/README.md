# Vue+Node+Express+Userfront Get Data from Backend Service

This repo is based on the repo for Part 1: Vue.js authentication and access example:

https://github.com/theship/userfront-vue

This, Part 2, is to get user data from your backend service after you've added Userfront to your project.

## Install Node and Express

From main project file:

> mkdir server
> cd server
> npm init -y

> npm install express dotenv jsonwebtoken cors

## Install Userfront on the client side

If you haven't already done so, in the `client` directory, install Userfront.

> npm install @userfront/toolkit --save

## Create a server app and middleware

* Create a [server/app.js](server/app.js) file and include the code.
* Create a [server/authMiddleware.js](server/authMiddleware.js) file and include the code.

## In the client

### Update Vite Config to point to backend

Add the server info, so that your client/vite.config.js file now looks like:

```
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Consolidate all custom tags into one array and check if the tag belongs to this array
          isCustomElement: (tag) => ['login-form', 'signup-form', 'password-reset-form'].includes(tag)
        }
      }
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/admin-endpoint': 'http://localhost:3000'
    }
  }

})
```

### Create a view

* Create a [client/src/views/AdminView.vue](client/src/views/AdminView.vue) file and include the code.

### Creoate a route

In the [client/src/router/index.js](client/src/router/index.js) file, add the view:

```
import AdminView from '../views/AdminView.vue'
```

Add the admin to the routes:

```
    ,
    {
      path: '/admin', // Define the path for the admin page
      name: 'admin',
      component: AdminView,
      meta: { requiresAdmin: true } // Use meta field to mark this route as requiring admin access
    }
```
Update the navigation guard to include checking for the "admin" role in the user data:

```
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!Userfront.tokens.accessToken;
  const isAdmin = Userfront.user.roles && Userfront.user.roles.includes('admin'); // Check if user has 'admin' role

  // Redirect to login if trying to access a restricted admin route without proper credentials
  if (to.matched.some(record => record.meta.requiresAdmin) && (!isLoggedIn || !isAdmin)) {
    return next({ path: '/login' });
  }

  // Redirect to login if not logged in and trying to access the dashboard
  if (to.name === 'dashboard' && !isLoggedIn) {
    return next({ path: '/login' });
  }

  next();
});
```

### Add to nav

Update the [client/src/App.vue](client/src/App.vue) file to include the conditional nav to the Admin Panel.

```
         <RouterLink v-if="isAdmin" to="/admin">Admin Panel</RouterLink>
```

## Update your role in the Userfront dashboard

In Part 1, you signed up and logged in as a new user. Now that the Admin Panel has been implemented, go to the Userfront dashboard for this project. In the list of users, select the "Access Control" plus button for yourself. In Access Control dropdown, select Admin.

## Visit your local running Vue app

