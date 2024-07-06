// Setup server, session and middleware here.

/*
You will have the following middleware functions:

1. This middleware will apply to the root route / (note, a middleware applying to the root route is the same as a middleware that fires for every request) and will do one of the following: 

A. This middleware will log to your console for every request made to the server, with the following information:

Current Timestamp: new Date().toUTCString()
Request Method: req.method
Request Route: req.originalUrl
Some string/boolean stating if a user is authenticated
There is no precise format you must follow for this. The only requirement is that it logs the data stated above.

An example would be:

[Sun, 14 Apr 2019 23:56:06 GMT]: GET / (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:14 GMT]: POST /login (Non-Authenticated User)
[Sun, 14 Apr 2019 23:56:19 GMT]: GET /user (Authenticated User)
[Sun, 14 Apr 2019 23:56:44 GMT]: GET / (Authenticated User)
B. After you log the request info in step A,  if the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will redirect them to the GET /login route. 

2. This middleware will only be used for the GET /login route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will allow them to get through to the GET /login route. A logged in user should never be able to access the login form.

 3. This middleware will only be used for the GET /register route and will do one of the following: If the user is authenticated AND they have a role of admin, the middleware function will redirect them to the /admin route, if the user is authenticated AND they have a role of user, you will redirect them to the /user route. If the user is NOT authenticated, you will allow them to get through to the GET /register route. A logged in user should never be able to access the registration form.

4. This middleware will only be used for the GET /user route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If the user is logged in, the middleware will "fall through" to the next route calling the next() callback.
Users with both roles admin or user should be able to access the /user route, so you simply need to make sure they are authenticated in this middleware.
5. This middleware will only be used for the GET /admin route and will do one of the following:

If a user is not logged in, you will redirect to the GET /login route.
If a user is logged in, but they are not an admin user, you will redirect to /error and render a HTML error page saying that the user does not have permission to view the page, and the page must issue an HTTP status code of 403.
If the user is logged in AND the user has a role of admin, the middleware will "fall through" to the next route calling the next() callback.
ONLY USERS WITH A ROLE of admin SHOULD BE ABLE TO ACCESS THE /admin ROUTE!
6. This middleware will only be used for the GET /logout route and will do one of the following:

1. If a user is not logged in, you will redirect to the GET /login route.

2. if the user is logged in, the middleware will "fall through" to the next route calling the next() callback.

*/

import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import configRoutes from './routes/index.js';
import exphbs from 'express-handlebars';
import session from 'express-session';
import  redirect  from 'statuses';
import { request } from 'https';
const staticDir = express.static('public');


app.use(cookieParser());

app.use(express.json());
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};
// app.use('/login', (req, res, next) => {
//   if (req.session.user) {
//     return res.redirect('/private');
//   } else {
//     //here I',m just manually setting the req.method to post since it's usually coming from a form
//     req.method = 'POST';
//     next();
//   }
// });



// Middlewares:

/* 
req is the request object, just like how we have access to the request in our routes
 res is the response object, just like how we have access to the response in our routes
 next is a callback that will call the next middleware registered, or proceed to routes if none exist.
 If we do not call next(), we need to make sure we send a response of some sort or it will poll forever!
*/

// 1. One which will count the number of requests made to your website
let totalRequests = 0;

// app.use(async (req, res, next) => {
//   totalRequests++;
//   console.log(`There have been ${totalRequests} requests made to the server`);
//   next();
// });

// 2. One which will count the number of requests that have been made to the current path
// const pathsAccessed = {};

// app.use(async (req, res, next) => {
//   if (!pathsAccessed[req.path]) pathsAccessed[req.path] = 0;

//   pathsAccessed[req.path]++;

//   console.log(
//     `There have now been ${pathsAccessed[req.path]} requests made to ${
//       req.path
//     }`
//   );
//   next();
// });

// 3.  We will check if the request is an odd or even request number we will then add a field to the req object
// app.use(async (req, res, next) => {
//   if (totalRequests % 2 === 0) {
//     req.isEven = true;
//   } else {
//     req.isOdd = true;
//   }

//   next();
// });

//4. We will read if the request is odd or even and set the pun field on the req depending on which it is
// app.use(async (req, res, next) => {
//   if (req.isEven) {
//     req.pun = 'Someone is looking to get even.  ';
//   }

//   if (req.isOdd) {
//     req.pun = "This is an odd request that doesn't make me feel comfortable  ";
//   }
//   next();
// });

// 5. Log the pun that was made
// app.use(async (req, res, next) => {
//   console.log(req.pun);
//   next();
// });

// 6. One which will deny all users access to the /admin path.
// app.use('/admin', async (req, res, next) => {
//   console.log("I'm in the admin middleware");
//   return res.status(403).json({error: '403: Forbidden'});
//   //next();
// });

// 7.  One which will change the request method for a route before it hits the route or next middleware
// app.use('/posts', async (req, res, next) => {
//   console.log(req);

//   if (req.method == 'GET') {
//     req.method = 'PUT';
//   }
//   next();
// });

// 8. One which will log the last time the user has made a request, and store it in a cookie using the cookie-parser.
// app.use(async (req, res, next) => {
//   console.log('The request has all the following cookies:');
//   console.log(req.cookies);
//   if (req.cookies.lastAccessed) {
//     console.log(
//       'This user last accessed the site at ' + req.cookies.lastAccessed
//     );
//   } else {
//     console.log('This user has never accessed the site before');
//   }

//   // THIS SECTION WILL EXPIRE THE COOKIE EVERY 5th request
//   if (totalRequests % 5 === 0) {
//     console.log('now clearing the cookie');

//     const anHourAgo = new Date();
//     anHourAgo.setHours(anHourAgo.getHours() - 1);

//     // invalidate, then clear so that lastAccessed no longer shows up on the
//     // cookie object
//     res.cookie('lastAccessed', '', {expires: anHourAgo});
//     res.clearCookie('lastAccessed');

//     next();
//     return;
//   }

//   const now = new Date();
//   const expiresAt = new Date();
//   expiresAt.setHours(expiresAt.getHours() + 1);

//   // Providing a third parameter is optional, but allows you to set options for the cookies.
//   // see: http://expressjs.com/en/api.html#res.cookie
//   // for details on what you can do!
//   res.cookie('lastAccessed', now.toString(), {expires: expiresAt});
//   res.cookie('patrick', 'hill');
//   next();
// });
// app.use(session({
//   secret: 'your-secret-key',
//   resave: false,
//   saveUninitialized: true
// }));
app.use(session({
  name: 'AuthenticationState',
  secret: 'some secret string!',
  resave: false,
  saveUninitialized: false
}))
const middleware1 = (req, res, next) => {

  const current_timestamp = new Date().toUTCString();
  const request_method = req.method;
  const request_route = req.originalUrl;
  let isAuthenticated;
  if(req.session.user){
    isAuthenticated = "Authenticated User";
  }else{
    isAuthenticated = "Non-Authenticated User";
  }
  console.log(`${current_timestamp} :${request_method} / ${request_route} ${isAuthenticated}`)

  if(request_route =="/"){
    if(isAuthenticated === "Authenticated User"){
      if(req.session.user.role === "admin"){
        return res.redirect("/admin")
      }else if(req.session.user.role === "user"){
        return res.redirect("/user")
      }
    }
    else{
      return res.redirect('/login');
    }
  }
  
    next();
    
};

const middleware2 = (req, res, next) => {
  let isAuthenticated;
  if(req.session.user){
    isAuthenticated = "Authenticated User";
  }else{
    isAuthenticated = "Non-Authenticated User";
  }
  const request_route = req.originalUrl
  if(request_route === "/login"){
    if(isAuthenticated === "Authenticated User"){
      if(req.session.user.role =="user"){
        res.redirect("/user")
      }else if(req.session.user.role =="admin"){
        res.redirect("/admin")
      }
    }
    else{
      return next();
    }
  }else{
    return next();
  }  

}

const middleware3 = (req, res, next) => {
  let isAuthenticated;
  if(req.session.user){
    isAuthenticated = "Authenticated User";
  }else{
    isAuthenticated = "Non-Authenticated User";
  }
    if(isAuthenticated === "Authenticated User"){
      if(req.session.user.role ==="user"){
        res.redirect("/user")
      }else if(req.session.user.role ==="admin"){
        res.redirect("/admin")
      }
    }
    else{
       return next();
    }
   

}
const middleware4 = (req, res, next) => {
  let isAuthenticated;
  if(req.session.user){
    isAuthenticated = "Authenticated User";
  }else{
    isAuthenticated = "Non-Authenticated User";
  }
    if(isAuthenticated === "Non-Authenticated User"){
        res.redirect("/login")
      }
      else{
        return next();
      
    }

}
const middleware5 = (req, res, next) => {
  let isAuthenticated;
  if(req.session.user){
    isAuthenticated = "Authenticated User";
  }else{
    isAuthenticated = "Non-Authenticated User";
  }
    if(isAuthenticated === "Non-Authenticated User"){
     
        res.redirect("/login")
    }else{
      if(req.session.user.role === "user"){
        res.status(403).render("error",{title:'Error Page'})
      }else{
        return next();
      }
    }
  
}

const middleware6 = (req, res, next) => {
  let isAuthenticated;
  if(req.session.user){
    isAuthenticated = "Authenticated User";
  }else{
    isAuthenticated = "Non-Authenticated User";
  }
    if(isAuthenticated === "Non-Authenticated User"){
     
        res.redirect("/login")
    }else{
      return next();
    }

}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(rewriteUnsupportedBrowserMethods);
app.use('/public', staticDir);

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/', middleware1);
app.use('/login', middleware2);
app.use('/register', middleware3);
app.use('/user', middleware4);
app.use('/admin', middleware5);
app.use('/logout', middleware6);





configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});