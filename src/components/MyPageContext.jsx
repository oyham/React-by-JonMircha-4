import React, { useState } from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import HeaderContext from './HeaderContext'
import MainContext from './MainContext'
import FooterContext from './FooterContext'


const initialLanguage = "es"
const initialAuth = null

const translations = {
    es: {
        headerTitle: "Mi aplicacion CON Context Api",
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
        headerTitle: "My application WITH Context Api",
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


const MyPageContext = () => {
    const [language, setLanguage] = useState(initialLanguage)
    const [texts, setTexts] = useState(translations[language])
    const [auth, setAuth] = useState(initialAuth)



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
        if (auth) {
            setAuth(null)
        } else {
            setAuth(true)
        }
    }

    return (
        <div className='my-page'>
            <ThemeProvider>
                <HeaderContext  texts={texts} auth={auth}
                    handleLanguage={handleLanguage}
                    handleAuth={handleAuth}
                />
                <MainContext texts={texts} auth={auth} />
                <FooterContext texts={texts} />
            </ThemeProvider>
        </div>
    )
}

export default MyPageContext