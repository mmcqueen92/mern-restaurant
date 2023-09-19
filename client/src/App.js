import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import AdminDashboard from "./pages/AdminDashboard";
import EditMenu from "./pages/EditMenu";
import ViewOrder from "./pages/ViewOrder";

function App() {
  const initialCart = useMemo(() => [], []);
  const [cart, setCart] = useState(initialCart);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [menu, setMenu] = useState([]);

  const fetchMenu = async () => {
    const response = await fetch("http://localhost:5050/api/menu");
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    // on render check for cart in local storage, if it is NOT null (it exists) set cart(state) to match the cart in local storage
    const cartFromLocalStorage = window.localStorage.getItem(
      "mern_restaurant_cart"
    );
    const parsedCartFromLocalStorage = JSON.parse(cartFromLocalStorage);
    if (cartFromLocalStorage !== null) setCart(parsedCartFromLocalStorage);
    // fetch menu
    fetchMenu().then((res) => setMenu(res));
  }, []);

  // whenever cart is adjusted set local storage to match
  useEffect(() => {
    if (cart !== initialCart) {
      localStorage.setItem("mern_restaurant_cart", JSON.stringify(cart));
    }
  }, [cart, initialCart]);

  // if item is in cart already, increase quantity by 1. if not, insert new item into cart
  const addToCart = (item) => {
    const itemIndex = cart.findIndex((i) => i._id === item._id);
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
    const itemIndex = cart.findIndex((i) => i._id === item._id);

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

  // handleEmail function for controlled component in Checkout
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  return (
    <div className="App">
      <Router>
        <Navbar></Navbar>
        <main>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route
              path="/menu"
              element={
                <Menu
                  menuItems={menu}
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
              element={
                <Payment
                  cart={cart}
                  setCart={setCart}
                  address={address}
                  setAddress={setAddress}
                  email={email}
                  setEmail={setEmail}
                />
              }
            ></Route>
            <Route path="/admin/dashboard" element={<AdminDashboard />}></Route>
            <Route
              path="/admin/edit-menu"
              element={<EditMenu menu={menu} setMenu={setMenu} />}
            ></Route>
            <Route path="/view-order/:id" element={<ViewOrder />}></Route>
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;
