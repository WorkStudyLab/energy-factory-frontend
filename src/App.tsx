import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/tanstack/queryClient";
import { ROUTES } from "./constants/routes";
import LandingPage from "./pages/landing/LandingPage";
import ProductsPage from "./pages/products/ProductsPage";
import ProductDetailPage from "./pages/products/ProductDetailPage";
import CartPage from "./pages/cart/CartPage";
import LoginPage from "./pages/auth/LoginPage";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import VerifyCodePage from "./pages/auth/VerifyCodePage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";
import ResetPasswordSuccessPage from "./pages/auth/ResetPasswordSuccessPage";
import SignupPage from "./pages/auth/SignupPage";
import SignupConnectPage from "./pages/auth/SignupConnectPage";
import NutritionPage from "./pages/nutrition/NutritionPage";
import DietCoachPage from "./pages/diet-coach/DietCoachPage";
import OrderHistoryPage from "./pages/order/OrderHistoryPage";
import OrderCompletePage from "./pages/order/OrderCompletePage";
import OrderFailPage from "./pages/order/OrderFailPage";
import MyPage from "./pages/mypage/MyPage";
import TestPage from "./pages/test/TestPage";
import UiTestPage from "./pages/test/UiTestPage";
import ShadcnTestPage from "./pages/test/ShadcnTestPage";
import TailwindTestPage from "./pages/test/TailwindTestPage";
import SignupTestPage from "./pages/test/SignupTestPage";
import LoginTestPage from "./pages/test/LoginTestPage";
import { DialogTestPage } from "./pages/test/DialogTestPage";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import { Toaster } from "./components/ui/toaster";
import { AppRoute } from "./components/route/AppRoute";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col">
          <Header />

          <main className="flex-1">
            <Routes>
              <Route
                path={ROUTES.HOME}
                element={<Navigate to={ROUTES.PRODUCTS} replace />}
              />
              <Route
                path={ROUTES.LANDING}
                element={
                  <AppRoute path={ROUTES.LANDING} element={<LandingPage />} />
                }
              />
              <Route
                path={ROUTES.PRODUCTS}
                element={
                  <AppRoute path={ROUTES.PRODUCTS} element={<ProductsPage />} />
                }
              />
              <Route
                path={ROUTES.PRODUCT_DETAIL}
                element={
                  <AppRoute
                    path={ROUTES.PRODUCT_DETAIL}
                    element={<ProductDetailPage />}
                  />
                }
              />
              <Route
                path={ROUTES.CART}
                element={<AppRoute path={ROUTES.CART} element={<CartPage />} />}
              />
              <Route
                path={ROUTES.LOGIN}
                element={
                  <AppRoute path={ROUTES.LOGIN} element={<LoginPage />} />
                }
              />
              <Route
                path={ROUTES.FORGOT_PASSWORD}
                element={
                  <AppRoute
                    path={ROUTES.FORGOT_PASSWORD}
                    element={<ForgotPasswordPage />}
                  />
                }
              />
              <Route
                path={ROUTES.VERIFY_CODE}
                element={
                  <AppRoute
                    path={ROUTES.VERIFY_CODE}
                    element={<VerifyCodePage />}
                  />
                }
              />
              <Route
                path={ROUTES.RESET_PASSWORD}
                element={
                  <AppRoute
                    path={ROUTES.RESET_PASSWORD}
                    element={<ResetPasswordPage />}
                  />
                }
              />
              <Route
                path={ROUTES.RESET_PASSWORD_SUCCESS}
                element={
                  <AppRoute
                    path={ROUTES.RESET_PASSWORD_SUCCESS}
                    element={<ResetPasswordSuccessPage />}
                  />
                }
              />
              <Route
                path={ROUTES.SIGNUP}
                element={
                  <AppRoute path={ROUTES.SIGNUP} element={<SignupPage />} />
                }
              />
              <Route
                path={ROUTES.SIGNUP_CONNECT}
                element={
                  <AppRoute
                    path={ROUTES.SIGNUP_CONNECT}
                    element={<SignupConnectPage />}
                  />
                }
              />
              <Route
                path={ROUTES.NUTRITION}
                element={
                  <AppRoute
                    path={ROUTES.NUTRITION}
                    element={<NutritionPage />}
                  />
                }
              />
              <Route
                path={ROUTES.DIET_COACH}
                element={
                  <AppRoute
                    path={ROUTES.DIET_COACH}
                    element={<DietCoachPage />}
                  />
                }
              />
              <Route
                path={ROUTES.ORDER_HISTORY}
                element={
                  <AppRoute
                    path={ROUTES.ORDER_HISTORY}
                    element={<OrderHistoryPage />}
                  />
                }
              />
              <Route
                path={ROUTES.ORDER_COMPLETE}
                element={
                  <AppRoute
                    path={ROUTES.ORDER_COMPLETE}
                    element={<OrderCompletePage />}
                  />
                }
              />
              <Route
                path={ROUTES.ORDER_FAIL}
                element={
                  <AppRoute
                    path={ROUTES.ORDER_FAIL}
                    element={<OrderFailPage />}
                  />
                }
              />
              <Route
                path={ROUTES.MY_PAGE}
                element={
                  <AppRoute path={ROUTES.MY_PAGE} element={<MyPage />} />
                }
              />
              <Route
                path={ROUTES.TEST}
                element={<AppRoute path={ROUTES.TEST} element={<TestPage />} />}
              />
              <Route
                path={ROUTES.UI_TEST}
                element={
                  <AppRoute path={ROUTES.UI_TEST} element={<UiTestPage />} />
                }
              />
              <Route
                path={ROUTES.SHADCN_TEST}
                element={
                  <AppRoute
                    path={ROUTES.SHADCN_TEST}
                    element={<ShadcnTestPage />}
                  />
                }
              />
              <Route
                path={ROUTES.TAILWIND_TEST}
                element={
                  <AppRoute
                    path={ROUTES.TAILWIND_TEST}
                    element={<TailwindTestPage />}
                  />
                }
              />
              <Route
                path={ROUTES.SIGNUP_API_TEST}
                element={
                  <AppRoute
                    path={ROUTES.SIGNUP_API_TEST}
                    element={<SignupTestPage />}
                  />
                }
              />
              <Route
                path={ROUTES.LOGIN_API_TEST}
                element={
                  <AppRoute
                    path={ROUTES.LOGIN_API_TEST}
                    element={<LoginTestPage />}
                  />
                }
              />
              <Route
                path={ROUTES.DIALOG_TEST}
                element={
                  <AppRoute
                    path={ROUTES.DIALOG_TEST}
                    element={<DialogTestPage />}
                  />
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
        <Toaster />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
