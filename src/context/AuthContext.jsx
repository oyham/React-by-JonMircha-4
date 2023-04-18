import { createContext, useState } from "react";

const AuthContext = createContext();
const initialAuth = null

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(initialAuth)
    //Mis handleAuth
    const handleAuth = () => (!auth ? setAuth(!initialAuth) : setAuth(initialAuth))
    const handleAuth2 = () => (!auth ? setAuth(true) : setAuth(initialAuth))

    //El de Jon
    const handleAuth3 = (e) => {
        if (auth) {
            setAuth(null)
        } else {
            setAuth(true)
        }
    }

    const data = { auth, handleAuth }

    return (
        <AuthContext.Provider value={data}>{children}</AuthContext.Provider>
    )
}

export { AuthProvider };
export default AuthContext;