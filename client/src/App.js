import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";

function App() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  const menuItems = [
    {
      id: 0,
      name: "Food Item 1",
      description:
        "This is Food Item 1. Here is placeholder text describing it.",
      price: 10,
      category: "Appetizers",
    },
    {
      id: 1,
      name: "Food Item 2",
      description:
        "This is Food Item 2. Here is placeholder text describing it.",
      price: 20,
      category: "Mains",
    },
    {
      id: 2,
      name: "Food Item 3",
      description:
        "This is Food Item 3. Here is placeholder text describing it.",
      price: 5,
      category: "Dessert",
    },
  ];

  // if item is in cart already, increase quantity by 1. if not, insert new item into cart
  const addToCart = (item) => {
    const itemIndex = cart.findIndex((i) => i.id === item.id);
    if (itemIndex < 0) {
      item.quantity = 1;
      setCart((prev) => [...prev, item]);
    } else if (itemIndex >= 0) {
      const newArray = cart.map((cartItem, index) => {
        if (index === itemIndex) {
          const returnObj = { ...cartItem };
          returnObj.quantity++;
          return returnObj;
        } else {
          return cartItem;
        }
      });
      setCart(newArray);
    }
  };

  // reduce quantity of given item by 1, and filter to remove any items with quantity == 0
  const reduceQuantity = (item) => {
    const itemIndex = cart.findIndex((i) => i.id === item.id);

    let newArray = cart.map((cartItem, index) => {
      if (index === itemIndex) {
        const returnObj = { ...cartItem };
        returnObj.quantity--;
        return returnObj;
      } else {
        return cartItem;
      }
    });

    newArray = newArray.filter((item) => item.quantity > 0);
    setCart(newArray);
  };

  // handleAddress function for controlled component in Checkout
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  }

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <main>
          <Routes>
            <Route path="/" element={Home}></Route>
            <Route
              path="/menu"
              element={
                <Menu
                  menuItems={menuItems}
                  addToCart={addToCart}
                  reduceQuantity={reduceQuantity}
                  cart={cart}
                />
              }
            ></Route>
            <Route
              path="/checkout"
              element={
                <Checkout
                  addToCart={addToCart}
                  reduceQuantity={reduceQuantity}
                  cart={cart}
                  address={address}
                  email={email}
                  handleAddress={handleAddress}
                  handleEmail={handleEmail}
                />
              }
            ></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route
              path="/payment"
              element={<Payment cart={cart} address={address} email={email} />}
            ></Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
