import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import OTPVerification from './pages/OTPVerification';
import Dashboard from './pages/Dashboard';
import ExtraPage from './pages/ExtraPage';
import SearchResults from './pages/SearchResults';
import Registry from './pages/Registry';
import GiftCards from './pages/GiftCards';
import Sell from './pages/Sell';

import './index.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <WishlistProvider>
          <CartProvider>
            <ToastProvider>
              <Router>
                <Routes>
                  {/* Routes without standard Layout */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/verify-otp" element={<OTPVerification />} />
                  <Route path="/checkout" element={<Checkout />} />

                  {/* Routes with Standard Layout */}
                  <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="products" element={<Products />} />
                    <Route path="product/:id" element={<ProductDetails />} />
                    <Route path="cart" element={<Cart />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="extra" element={<ExtraPage />} />
                    <Route path="search" element={<SearchResults />} />
                    <Route path="registry" element={<Registry />} />
                    <Route path="gift-cards" element={<GiftCards />} />
                    <Route path="sell" element={<Sell />} />
                  </Route>
                </Routes>
              </Router>
            </ToastProvider>
          </CartProvider>
        </WishlistProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
