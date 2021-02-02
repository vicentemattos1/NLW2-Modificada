import express from 'express'
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import SearchClassesController from './controllers/SearchClassesController';


const routes = express.Router();
const classesControllers = new ClassesController;
const connectionsController = new ConnectionsController;
const searchClassesController = new SearchClassesController;


routes.post('/classes', classesControllers.create );
routes.get('/classes', classesControllers.index );

routes.get('/search', searchClassesController.index );

routes.post('/connections', connectionsController.create );
routes.get('/connections', connectionsController.index );

export default routes;