import './App.css';
import { Navbar } from './components/navbar/navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { ShopHome } from './pages/ShopHome';
import { Product } from './pages/Product';
import { Cart } from './pages/Cart';
import { LoginSignup } from './pages/LoginSignup';
import ShopCategory from './pages/ShopCategory';
import { Footer } from './components/footer/footer';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<ShopHome/>}/>
        <Route path='/mens' element={<ShopCategory category='men'/>}/>
        <Route path='/womens' element={<ShopCategory category='women'/>}/>
        <Route path='/kids' element={<ShopCategory category='kid'/>}/>
        <Route path='/product'element={<Product/>}>
          <Route path=':productId' element={<Product/>}/>
        </Route> 
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer />
      </BrowserRouter>
      
    </div>
  );
}

export default App;
