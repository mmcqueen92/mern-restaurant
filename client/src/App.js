import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MainContainer from "./components/MainContainer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";

function App() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");

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
                  handleAddress={handleAddress}
                />
              }
            ></Route>
            <Route path="/about" element={<About/>}></Route>
            <Route path="/contact" element={<Contact/>}></Route>
          </Routes>
        </main>
        
      </Router>
    </div>
  );
}

export default App;
