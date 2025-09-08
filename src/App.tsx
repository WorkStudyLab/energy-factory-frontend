import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import SignupPage from './pages/auth/SignupPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to={ROUTES.HOME}>홈</Link></li>
            <li><Link to={ROUTES.PRODUCTS}>상품</Link></li>
            <li><Link to={ROUTES.CART}>장바구니</Link></li>
            <li><Link to={ROUTES.LOGIN}>로그인</Link></li>
            <li><Link to={ROUTES.SIGNUP}>회원가입</Link></li>
          </ul>
        </nav>
        
        <main>
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
