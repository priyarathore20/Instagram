import Homepage from '../Pages/Home';
import ProfilePage from '../Pages/Profile';
import EditPage from '../Pages/EditProfile';
import ExplorePage from '../Pages/ExplorePage';
import LoginPage from '../Pages/Login';
import Signup from '../Pages/Signup';
import NotFound from '../Pages/404';
import SearchPage from '../Pages/SearchPage';

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
    isProtected: false,
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
    isProtected: false,
  },{
    name: 'Explore',
    path: '/explore',
    component: ExplorePage,
    isProtected: true,
  },{
    name: 'Search',
    path: '/search',
    component: SearchPage,
    isProtected: true,
  },{
    name: 'signup',
    path: '/signup',
    component: Signup,
    isProtected: false,
  },
]