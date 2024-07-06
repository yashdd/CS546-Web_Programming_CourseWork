//Here you will import route files and export them as used in previous labs
// This file will import both route files and export the constructor method as shown in the lecture code

/*
    - When the route is /products use the routes defined in the products.js routing file
    - When the route is /reviews use the routes defined in reviews.js routing file
    - All other enpoints should respond with a 404 as shown in the lecture code
*/
import movieRoutes from './movies.js';
import {static as staticDir} from 'express';

const constructorMethod = (app) => {
  app.use('/', movieRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({error: 'Route Not found'});
  });
  app.use('/public', staticDir('public'));

};

export default constructorMethod;