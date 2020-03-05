import Manage from '../views/Manage'
import Tasks from '../views/Manage/Tasks'
import Projects from '../views/Manage/Projects'
import DailyWorkPlan from '../views/Manage/DailyWorkPlan'
import Archive from '../views/Manage/Archive'
import EnterpriseReport from '../views/Manage/Reports/Enterprise'

const dashboardRoutes = [
  {
    path: '/manage/dailyworkplan',
    auth: true,
    name: 'DailyWorkPlan',
    component: DailyWorkPlan,
  },
  {
    path: '/manage/tasks',
    auth: true,
    name: 'Tasks',
    component: Tasks,
  },
  {
    path: '/manage/projects',
    auth: true,
    name: 'Projects',
    component: Projects,
  },
  {
    path: '/manage/archive',
    auth: true,
    name: 'Archive',
    component: Archive,
  },
  {
    path: '/manage/report/enterprise',
    auth: true,
    name: 'EnterpriseReport',
    component: EnterpriseReport,
  },
  {
    path: '/manage/report/group',
    auth: true,
    name: 'GroupReport',
    component: EnterpriseReport,
  },
  {
    path: '/manage/report/company',
    auth: true,
    name: 'CompanyReport',
    component: EnterpriseReport,
  },
  {
    path: '/manage/report/department',
    auth: true,
    name: 'DepartmentReport',
    component: EnterpriseReport,
  },
  {
    path: '/manage/report/team',
    auth: true,
    name: 'TeamReport',
    component: EnterpriseReport,
  },
  {
    path: '/manage/report/individual',
    auth: true,
    name: 'IndividualReport',
    component: EnterpriseReport,
  },
  {
    redirect: true,
    path: '/manage',
    to: '/manage/tasks',
    name: 'Projects',
  },
]

export default dashboardRoutes
