//Here you will import route files and export the constructor method as shown in lecture code and worked in previous labs.
import auth_routeRoutes from './auth_routes.js';

const constructorMethod = (app) => {
  app.use('/', auth_routeRoutes);

  app.use('*', (req, res) => {
    res.sendStatus(404);
  });
};

export default constructorMethod;