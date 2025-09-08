import HomePage from '../pages/home/home-page';
import AboutPage from '../pages/about/about-page';
import ServicesPage from '../pages/services/services-page';
import PuskePage from '../pages/services/puskesmas/puske-page';
import IMTPage from '../pages/services/IMT/IMT-page';
import CaloriesPage from '../pages/services/calories/calories-page'; 

const routes = {
  '/': new HomePage(),
  '/about': new AboutPage(),
  '/services': new ServicesPage(),  
  '/puskesmas': new PuskePage(),
  '/imt': new IMTPage(),
  '/calories': new CaloriesPage(),



};

export default routes;
