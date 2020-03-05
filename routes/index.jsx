import Login from '../layouts/Login';
import Dashboard from '../layouts/Dashboard';

const indexRoutes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/', name: 'Home', component: Dashboard },
];

export default indexRoutes;
