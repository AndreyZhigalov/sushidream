import { Route, Routes } from 'react-router-dom';

import { Menu } from './pages/Menu';
import { Restaurants } from './pages/Restaurants';
import { Loyalty } from './pages/Loyalty';
import { ServiceCourse } from './pages/ServiceCourse';
import { Franchise } from './pages/Franchise';
import { Cart } from './pages/Cart';
import { Profile } from './pages/Profile';

import { NotFound } from './pages/NotFound';
import MainLayout from './layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="sushidream" element={<MainLayout />}>
        <Route path="" element={<Menu />} />
        <Route path="restaurants" element={<Restaurants />} />
        <Route path="loyalty" element={<Loyalty />} />
        <Route path="course" element={<ServiceCourse />} />
        <Route path="franchise" element={<Franchise />} />
        <Route path="cart" element={<Cart />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
