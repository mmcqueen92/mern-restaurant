import {useState, useEffect} from 'react';
import Navbar from './Navbar';
import ContentContainer from './ContentContainer';

export default function MainContainer() {
    const [page, setPage] = useState("welcome");
    const [cart, setCart] = useState([]);

    // useEffect to monitor cart for testing purposes
    useEffect(() => {
        console.log("CART: ", cart)
    }, [cart])

    // if item is in cart already, increase quantity by 1. if not, insert new item into cart
    const addToCart = (item) => {
        const itemIndex = cart.findIndex(i => i.id === item.id);
        if (itemIndex < 0) {
            item.quantity = 1;
            setCart((prev) => [...prev, item])
        } else if (itemIndex >=0) {
            const newArray = cart.map((cartItem, index) => {
                if (index===itemIndex) {
                    const returnObj = {...cartItem };
                    returnObj.quantity++;
                    return returnObj;
                } else {
                    return cartItem;
                }
            });
            setCart(newArray);
        }
    }

    const menuItems = [
        {
            id: 0,
            name: "Food Item 1",
            description: "This is Food Item 1. Here is placeholder text describing it.",
            price: 10,
            category: "Appetizers"
        },
        {
            id: 1,
            name: "Food Item 2",
            description: "This is Food Item 2. Here is placeholder text describing it.",
            price: 20,
            category: "Mains"
        },
        {
            id: 2,
            name: "Food Item 3",
            description: "This is Food Item 3. Here is placeholder text describing it.",
            price: 5,
            category: "Dessert"
        },
    ]

    return (
        <div>
            <Navbar
            setPage={setPage}
            ></Navbar>
            <ContentContainer
            page={page}
            menuItems={menuItems}
            addToCart={addToCart}
            cart={cart}
            ></ContentContainer>
            <div>

            </div>
        </div>
    )
}