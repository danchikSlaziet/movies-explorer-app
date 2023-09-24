import { Navigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


export default function ProtectedRoute({element: Component, ...props}) {
  return props.loggedIn ? 
    <>
      <Header profileHandler={props.profileHandler} loggedIn={props.loggedIn} />
      <Component {...props}/>
      <Footer />
    </> : <Navigate to="/"/>;
}