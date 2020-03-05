import Develop from '../views/Develop';
import Archive from '../views/Develop/Archive';
import Learn from '../views/Develop/Learn';
import Career from '../views/Develop/Career';
import Library from '../views/Develop/Library';
import Reports from '../views/Develop/Reports';
import Search from '../views/Develop/Search';

const dashboardRoutes = [
  {
    path: '/develop/archive',
    auth: true,
    name: 'Archive',
    component: Archive,
  },
  {
    path: '/develop/learn',
    auth: true,
    name: 'Learn',
    component: Learn,
  },
  {
    path: '/develop/career',
    auth: true,
    name: 'Career',
    component: Career,
  },
  {
    path: '/develop/library',
    auth: true,
    name: 'Library',
    component: Library,
  },
  {
    path: '/develop/reports',
    auth: true,
    name: 'Reports',
    component: Reports,
  },
  {
    path: '/develop/search',
    auth: true,
    name: 'Search',
    component: Search,
  },
  {
    redirect: true,
    path: '/develop',
    to: '/develop/learn',
    name: 'Develop',
  }
];

export default dashboardRoutes;
