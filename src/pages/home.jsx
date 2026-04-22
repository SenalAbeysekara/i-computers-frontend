import { Route, Routes } from "react-router-dom";
import Header from "../components/header";
import ProductPage from "./productPage";
import Overview from "./overview";
import Cart from "./cart";
import Checkout from "./checkout";
import MyOrdersPage from "./myOrdersPage";
import SettingsPage from "./settings";
import LandingPage from "./landingPage";
import SiteFooter from "../components/siteFooter";
import AboutPage from "./staticAbout";
import ContactPage from "./staticContact";
import PrivacyPolicyPage from "./privacyPolicy";
import TermsPage from "./termsPage";
import ScrollToTop from "../components/scrollToTop";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-and-conditions" element={<TermsPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/overview/:productId" element={<Overview />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route
            path="*"
            element={
              <div className="section-shell py-20 text-center text-secondary/70">
                Page not found
              </div>
            }
          />
        </Routes>
      </main>
      <SiteFooter />
    </div>
  );
}