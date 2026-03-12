import { BrowserRouter as Router, Routes, Route } from "react-router";
import { AuthProvider } from "@getmocha/users-service/react";
import HomePage from "@/react-app/pages/Home";
import AuthCallbackPage from "@/react-app/pages/AuthCallback";
import MarketplacePage from "@/react-app/pages/Marketplace";
import ProductPage from "@/react-app/pages/Product";
import ProfilePage from "@/react-app/pages/Profile";
import WalletPage from "@/react-app/pages/Wallet";
import OrdersPage from "@/react-app/pages/Orders";
import { CartProvider } from "@/react-app/contexts/CartContext";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth/callback" element={<AuthCallbackPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/marketplace/:category" element={<MarketplacePage />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/wallet" element={<WalletPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
