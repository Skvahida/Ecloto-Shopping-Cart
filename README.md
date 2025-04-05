# Ecloto Shopping Cart

## Overview
Ecloto Shopping Cart is a simple React application that allows users to add products to a shopping cart, update quantities, and track their progress towards earning a free gift.

## Features
- Display a list of products with a quantity selector and "Add to Cart" button.
- Display a shopping cart below the products.
- Update product quantities in the cart.
- Remove products from the cart.
- Add a free gift automatically when the cart subtotal reaches a threshold.
- Show a progress bar indicating progress towards the free gift.
- Ensure only one free gift is added and it cannot be removed manually.
- Remove the free gift if the cart value goes below the threshold.
- Show a message when the free gift is added.
- Smooth interactions for adding/removing items.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Skvahida/Ecloto-Shopping-Cart.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Ecloto-Shopping-Cart
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Project
1. Start the development server:
   ```bash
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to see the application.

## Project Structure
- `src/` - Contains the source code of the React application.
- `public/` - Contains the public assets and the HTML template.
- `README.md` - Project documentation and instructions.

## Data
The application uses the following constants for products and the free gift:
```javascript
const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;
```

## State Management
The application uses React’s built-in state management (`useState`, `useEffect`) to manage the state for products and the cart.

## User Experience
The application provides smooth interactions for adding and removing items from the cart, updating quantities, and tracking progress towards the free gift.




Good luck! 🚀
