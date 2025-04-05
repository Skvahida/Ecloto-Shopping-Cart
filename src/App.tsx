import React, { useState, useEffect } from 'react';

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const remainingForGift = Math.max(0, THRESHOLD - cartSubtotal);
  const progressPercentage = Math.min((cartSubtotal / THRESHOLD) * 100, 100);

  useEffect(() => {
    const hasGift = cart.some(item => item.id === FREE_GIFT.id);
    
    if (cartSubtotal >= THRESHOLD && !hasGift) {
      setCart(prev => [...prev, { ...FREE_GIFT, quantity: 1 }]);
    } else if (cartSubtotal < THRESHOLD && hasGift) {
      setCart(prev => prev.filter(item => item.id !== FREE_GIFT.id));
    }
  }, [cartSubtotal]);

  const addToCart = (product: typeof PRODUCTS[0]) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === productId) {
            const newQuantity = item.quantity + delta;
            return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-black mb-8 text-center">Shopping Cart</h1>

        {/* Products */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-black mb-4">Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PRODUCTS.map(product => (
              <div key={product.id} className="bg-white p-4 rounded-lg shadow-sm">
                <h3 className="font-bold text-black mb-1">{product.name}</h3>
                <p className="text-gray-600 mb-3">₹{product.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Cart Summary */}
        <section className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-2xl font-bold text-black mb-4">Cart Summary</h2>
          <div className="flex justify-between items-center mb-4">
            <span className="font-medium">Subtotal:</span>
            <span className="font-bold text-black">₹{cartSubtotal}</span>
          </div>
          
          {cartSubtotal < THRESHOLD && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800 mb-2">
                Add ₹{remainingForGift} more to get a FREE Wireless Mouse!
              </p>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
          
          {cartSubtotal >= THRESHOLD && (
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800 font-medium">
                You got a free Wireless Mouse!
              </p>
            </div>
          )}
        </section>

        {/* Cart Items */}
        {cart.length > 0 && (
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-2xl font-bold text-black mb-4">Cart Items</h2>
            <div className="space-y-4">
              {cart.map(item => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div>
                    <h3 className="font-bold text-black">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                    </p>
                  </div>
                  {item.id !== FREE_GIFT.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full font-medium">
                      FREE GIFT
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {cart.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <p className="text-gray-500 font-medium">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-1">Add some products to see them here!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;