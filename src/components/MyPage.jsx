import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const initialTheme = "light"
const initialLanguage = "es"
const initialAuth = null

const translations = {
    es: {
        headerTitle: "Mi aplicacion SIN Context Api",
        headerSubtitle: "Mi Cabecera",
        headerLight: "Claro",
        headerDark: "Oscuro",
        buttonLogin: "Iniciar Sesion",
        buttonLogout: "Cerrar Sesion",
        mainWelcome: "Bienvenido",
        mainHello: "Hola usuario",
        mainContent: "Mi contenido principal",
        footerTitle: "Mi pié de pagina"
    },
    en: {
        headerTitle: "My application WITHOUT Context Api",
        headerSubtitle: "My Header",
        headerLight: "Sure",
        headerDark: "Dark",
        buttonLogin: "Login",
        buttonLogout: "Close Session",
        mainWelcome: "Welcome Guest",
        mainHello: "Hello user",
        mainContent: "My main content",
        footerTitle: "My footer"
    },
}


const MyPage = () => {
    const [theme, setTheme] = useState(initialTheme)
    const [language, setLanguage] = useState(initialLanguage)
    const [texts, setTexts] = useState(translations[language])
    const [auth, setAuth] = useState(initialAuth)

    const handleTheme = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'dark') {
            setTheme('dark')
        } else {
            setTheme(initialTheme)
        }
    }

    const handleLanguage = (e) => {
        if (e.target.value === "en") {
            setLanguage("en")
            setTexts(translations.en)
        } else {
            setLanguage(initialLanguage)
            setTexts(translations.es)
        }
    }

    //Mis handleAuth
    const handleAuth = () => (!auth ? setAuth(!initialAuth) : setAuth(initialAuth))
    const handleAuth2 = () => (!auth ? setAuth(true) : setAuth(initialAuth))


    //El de Jon
    const handleAuth3 = (e) => {
        if(auth){
            setAuth(null)
        } else {
            setAuth(true)
        }
    }

    return (
        <div className='my-page'>
            <Header theme={theme} texts={texts} auth={auth}
                handleTheme={handleTheme}
                handleLanguage={handleLanguage}
                handleAuth={handleAuth}
            />
            <Main theme={theme} texts={texts} auth={auth} />
            <Footer theme={theme} texts={texts} />
        </div>
    )
}

export default MyPage