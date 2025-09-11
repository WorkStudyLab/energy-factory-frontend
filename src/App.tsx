import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import SignupPage from './pages/auth/SignupPage';
import TestPage from './pages/test/TestPage';
import UiTestPage from './pages/test/UiTestPage';
import ShadcnTestPage from './pages/test/ShadcnTestPage';
import TailwindTestPage from './pages/test/TailwindTestPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-gray-50 px-4 py-4 border-b border-gray-200">
          <ul className="list-none flex gap-8 m-0 p-0 justify-center">
            <li><Link to={ROUTES.HOME} className="no-underline text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 hover:text-gray-900">홈</Link></li>
            <li><Link to={ROUTES.PRODUCTS} className="no-underline text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 hover:text-gray-900">상품</Link></li>
            <li><Link to={ROUTES.CART} className="no-underline text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 hover:text-gray-900">장바구니</Link></li>
            <li><Link to={ROUTES.LOGIN} className="no-underline text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 hover:text-gray-900">로그인</Link></li>
            <li><Link to={ROUTES.SIGNUP} className="no-underline text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 hover:text-gray-900">회원가입</Link></li>
            <li><Link to={ROUTES.TEST} className="no-underline text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 hover:text-gray-900">테스트</Link></li>
            <li><Link to={ROUTES.TAILWIND_TEST} className="no-underline text-gray-600 font-medium px-4 py-2 rounded transition-colors hover:bg-gray-200 hover:text-gray-900">Tailwind</Link></li>
          </ul>
        </nav>
        
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.TEST} element={<TestPage />} />
            <Route path={ROUTES.UI_TEST} element={<UiTestPage />} />
            <Route path={ROUTES.SHADCN_TEST} element={<ShadcnTestPage />} />
            <Route path={ROUTES.TAILWIND_TEST} element={<TailwindTestPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
