export default function Navbar(props){
    const setPage = props.setPage;
    return (
        <div>
            <div>Restaurant Name/Icon</div>
            <div onClick={() => {
                setPage("menu")
            }}>Menu</div>
            <div onClick={() => {
                setPage("contact")
            }}>Contact</div>
            <div onClick={() => {
                setPage("about")
            }}>About</div>
            <div>Login/Profile</div>
        </div>
    )
}