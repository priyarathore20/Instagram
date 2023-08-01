import Homepage from '../Pages/Home';
import ProfilePage from '../Pages/Profile';
import EditPage from '../Pages/EditProfile';
import SearchPage from '../Pages/SearchPage';
import LoginPage from '../Pages/Login';
import Signup from '../Pages/Signup';
import NotFound from '../Pages/404';

export const routes = [
  {
    name: '404',
    path: '*',
    component: NotFound,
    isProtected: false,
  },
  {
    name: 'landing page',
    path: '/',
    component: LoginPage,
    isProtected: false,
  },
  {
    name: 'Edit Profile',
    path: '/edit-profile',
    component: EditPage,
    isProtected: true,
  },
  {
    name: 'home',
    path: '/home',
    component: Homepage,
    isProtected: true,
  },{
    name: 'Profile',
    path: '/profile',
    component: ProfilePage,
    isProtected: true,
  },{
    name: 'Explore',
    path: '/explore',
    component: SearchPage,
    isProtected: true,
  },{
    name: 'signup',
    path: '/signup',
    component: Signup,
    isProtected: false,
  },
]