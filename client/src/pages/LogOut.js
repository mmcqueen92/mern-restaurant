import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function LogOut(props) {
  const { setUser } = props;
  const navigate = useNavigate()

  useEffect(() => {
    setUser(null);
    localStorage.setItem("mern_restaurant_user", null);
    navigate("/")
  });
  return <div>Log Out</div>;
}
