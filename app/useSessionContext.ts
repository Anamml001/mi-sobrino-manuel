import { useContext } from "react";
import SessionContext from "./SessionContext";


export default () => useContext<{ loggedIn: boolean, setLoggedIn: (loggedIn: boolean) => void }>(SessionContext)