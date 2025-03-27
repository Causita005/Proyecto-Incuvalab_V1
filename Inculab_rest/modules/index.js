import express from 'express';
import user from './user/index.js';
import group from './group/index.js';
import permission from './permission/index.js';
import authGoogle from './authGoogle/index.js';
import files from './storageGoogle/index.js';
import categoria from './categoria/index.js';
import casos from './casos/index.js';
import autor from './autor/index.js';
import proyectos from './proyectos/index.js';
import matches from './matches/index.js';
import mensajes from './mensajes/index.js';
//imports

const routes = express.Router();

routes.use('/user', user);
routes.use('/authGoogle', authGoogle);
routes.use('/group', group);
routes.use('/permission', permission);
routes.use("/files", files);
routes.use('/categoria', categoria);
routes.use('/casos', casos);
routes.use('/autor', autor);
routes.use('/proyectos', proyectos);
routes.use('/matches', matches);
routes.use('/mensajes', mensajes);
//functions

export default routes;