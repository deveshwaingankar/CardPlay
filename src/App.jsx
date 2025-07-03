import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardShowcase from './HomePage';
import CartPage from './CartPage';
import Layout from "./Layout";

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<CardShowcase />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}
