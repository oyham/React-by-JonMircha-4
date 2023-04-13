import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const initialTheme = "light"
const initialLanguage = "es"

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
        mainWelcome: "Welcome",
        mainHello: "Hello user",
        mainContent: "My main content",
        footerTitle: "My footer"
    },
}


const MyPage = () => {
    const [theme, setTheme] = useState(initialTheme)
    const [language, setLanguage] = useState(initialLanguage)
    const [texts, setTexts] = useState(translations[language])

    const handleTheme = (e) => {
        console.log(e.target.value)
        if (e.target.value === 'dark') {
            setTheme('dark')
        } else {
            setTheme(initialTheme)
        }
    }

    const handleLanguage = (e) =>{
        if(e.target.value === "en"){
            setLanguage("en")
            setTexts(translations.en)
        } else {
            setLanguage(initialLanguage)
            setTexts(translations.es)
        }
    }

    return (
        <div className='my-page'>
            <Header theme={theme} texts={texts} handleTheme={handleTheme} handleLanguage={handleLanguage}/>
            <Main theme={theme} texts={texts}/>
            <Footer theme={theme} texts={texts}/>
        </div>
    )
}

export default MyPage