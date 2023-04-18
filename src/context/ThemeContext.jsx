import { createContext, useState } from "react";

const ThemeContext = createContext();

const initialTheme = "light"

const ThemeProvider = ({children}) =>{
    const [theme, setTheme] = useState(initialTheme)
    
    const handleTheme = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'dark') {
            setTheme('dark')
        } else {
            setTheme(initialTheme)
        }
    }
    
    const data = {theme, handleTheme}

    return(
        <ThemeContext.Provider value={data}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider}
export default ThemeContext