//Here you will require route files and export them as used in previous labs.
import textdecoderRoutes from './textdecoder.js';

const constructorMethod = (app) => {
  app.use('/', textdecoderRoutes);

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};

export default constructorMethod;