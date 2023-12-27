import React from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import LoginPage from './pages/auth/LoginPage';
import RegistrationPage from './pages/auth/RegistrationPage';
import DashboardPage from "./pages/dashboard/DashboardPage";
import CartPage from "./pages/cart/CartPage";
import AdminPage from "./pages/admin/LoginPage";
import OverviewPage from "./pages/admin/OverviewPage";
import ProductsPage from "./pages/admin/ProductsPage";
import UsersPage from "./pages/admin/UsersPage";
import OrdersPage from "./pages/admin/OrdersPage";
import ErrorPage from "./pages/error/ErrorPage";
import ProductPage from "./pages/dashboard/ProductPage";
import CheckoutPage from "./pages/order/checkout/CheckoutPage";
import AccountPage from "./pages/auth/AccountPage";
import NewDashboardPage from "./pages/dashboard/NewDashboardPage";
import AboutPage from "./pages/about/AboutPage";
import ProductUpdate from "./components/organisms/admin/Products/ProductUpdate";

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    {/* Customer Pages */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegistrationPage />} />

                    <Route path="/all" element={<DashboardPage />} />
                    <Route path="/all/new" element={<NewDashboardPage />} />
                    <Route path="/all/products/:productId" element={<ProductPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/about" element={<AboutPage />} />

                    {/* Admin Pages */}
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/admin/overview" element={<OverviewPage />} />
                    <Route path="/admin/products" element={<ProductsPage />} />
                    <Route path="/admin/users" element={<UsersPage />} />
                    <Route path="/admin/orders" element={<OrdersPage />} />

                    {/*Error Routes*/}
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/*" element={<Navigate to="/error" />} />

                </Routes>
            </Router>
        </div>
    );
}

export default App;
