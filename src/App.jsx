import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardShowcase from './HomePage';
import CartPage from './CartPage';
import Layout from "./Layout";
import CheckoutPage from "./CheckoutPage";


export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CardShowcase />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}