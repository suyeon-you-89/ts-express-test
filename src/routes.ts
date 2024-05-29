import { RouteConfig } from './Common/common.route.config';
import { UserRoutes } from './User/user.route.config';

const routes: Array<RouteConfig> = [];

routes.push(new UserRoutes(app));
