import Dashboard from '../views/Dashboard';
import Manage from '../views/Manage';
import Develop from '../views/Develop';

const dashboardRoutes = [
  {
    path: '/manage',
    name: 'Manage',
    component: Manage,
  },
  {
    path: '/develop',
    name: 'Develop',
    component: Develop,
  },
  {
    redirect: true,
    path: '/dashboard',
    to: '/develop',
    name: 'Dashboard',
  }
];

export default dashboardRoutes;
