import { LoginPage } from '../pages/login/LoginPage';
import { MainPage } from '../pages/main/MainPage';
import { SignUpPage } from '../pages/signup/SignUpPage';
import { NotFoundPage } from '../pages/404/NotFoundPage';
import { CatalogPage } from '../pages/catalog/CatalogPage';
import { UserProfilePage } from '../pages/UserProfilePage/UserProfilePage';
import { ProductPage } from '../pages/product/ProductPage';
import { CartPage } from '../pages/cart/CartPage';
import { AboutUsPage } from '../pages/about/AboutUsPage';
import { ContactsPage } from '../pages/contacts/ContactsPage';


export const routes = [
  { path : '/', name: 'Home', element: MainPage },
  { path: '*', name: 'Not Found', element: NotFoundPage },
  { path : '/login', name: 'Login', element: LoginPage },
  { path : '/signup', name: 'Signup', element: SignUpPage },
  { path : '/profile/:user', name: 'Profile', element: UserProfilePage },
  { path: 'catalog', name: 'Catalog', element: CatalogPage },
  { path: 'catalog/:id', name: 'Product', element: ProductPage},
  { path : '/cart', name: 'Cart', element: CartPage },
  { path: '/about', name: 'About Us', element: AboutUsPage },
  { path: '/contacts', name: 'Contacts', element: ContactsPage },
];