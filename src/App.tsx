import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ROUTES } from './constants/routes';
import HomePage from './pages/home/HomePage';
import ProductsPage from './pages/products/ProductsPage';
import ProductDetailPage from './pages/products/ProductDetailPage';
import CartPage from './pages/cart/CartPage';
import LoginPage from './pages/auth/LoginPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import SignupPage from './pages/auth/SignupPage';
import NutritionPage from './pages/nutrition/NutritionPage';
import DietCoachPage from './pages/diet-coach/DietCoachPage';
import OrderHistoryPage from './pages/order-history/OrderHistoryPage';
import MyPage from './pages/mypage/MyPage';
import TestPage from './pages/test/TestPage';
import UiTestPage from './pages/test/UiTestPage';
import ShadcnTestPage from './pages/test/ShadcnTestPage';
import TailwindTestPage from './pages/test/TailwindTestPage';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header  />

        
        <main className="flex-1">
          <Routes>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.PRODUCTS} element={<ProductsPage />} />
            <Route path={ROUTES.PRODUCT_DETAIL} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.NUTRITION} element={<NutritionPage />} />
            <Route path={ROUTES.DIET_COACH} element={<DietCoachPage />} />
            <Route path={ROUTES.ORDER_HISTORY} element={<OrderHistoryPage />} />
            <Route path={ROUTES.MY_PAGE} element={<MyPage />} />
            <Route path={ROUTES.TEST} element={<TestPage />} />
            <Route path={ROUTES.UI_TEST} element={<UiTestPage />} />
            <Route path={ROUTES.SHADCN_TEST} element={<ShadcnTestPage />} />
            <Route path={ROUTES.TAILWIND_TEST} element={<TailwindTestPage />} />
          </Routes>
        </main>

        <Footer  />
      </div>
    </Router>
  );
}

export default App;
