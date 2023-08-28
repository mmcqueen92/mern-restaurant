import {useState} from 'react';
import Navbar from './Navbar';
import ContentContainer from './ContentContainer';

export default function MainContainer() {
    const [page, setPage] = useState("welcome");

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
            ></ContentContainer>
        </div>
    )
}