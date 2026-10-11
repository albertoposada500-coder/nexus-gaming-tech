import { CartProvider } from '@/context/CartContext';
import HomePage from '@/pages/HomePage';

function App() {
  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  );
}

export default App;
