# 75. Context API Introducción
Context provee una forma de pasar datos a través del árbol de componentes sin tener que pasar props manualmente en cada nivel.

En una aplicación típica de React, los datos se pasan de arriba hacia abajo (de padre a hijo) a través de props, pero esta forma puede resultar incómoda para ciertos tipos de props (por ejemplo, localización, el tema de la interfaz) que son necesarias para muchos componentes dentro de una aplicación. Context proporciona una forma de compartir valores como estos entre componentes sin tener que pasar explícitamente una prop a través de cada nivel del árbol.

Podemos definir un sólo contexto y ahí definír las variables para nuestra aplicación si es que estamos hablando de una App medianamente chica. En cambio, si nuestra aplicación se va volviendo compleja o aumentando el número de módulos, sería recomendable crear diferentes contextos para los diferentes temáticas o variables.

---
# 76. Context API. Haciendo una APP con THEME Dark/Light sin Context.
Creamos los componentes de Header, Main y Footer y los enviamos a llamar a nuestro componente MyPage... siendo esta misma la que se exporta a nuestra `App.jsx`.
```js
import React from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'

const MyPage = () => {
    return (
        <div className='my-page'>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default MyPage
```
Para controlar el estado de nuestro Theme crearemos una vde theme con el initialState='light', siendo 'theme' lo que pasaremos como propiedad a nuestro Header, Main y Footer.

Creamos la clase .dark en nuestra 'index.css' con el background-color en blanco y un filter: invert(1) para que invierta los colores. Los que se encargaran de desencadenar este evento van a ser los inputs radio. 

Ahora necesitamos una función que controle el *evento* (onClick) de nuestros inputs de tipo radio para asi poder "conectar" la funcionalidad de los inputs con las props theme's enviadas a nuestros demás componentes. Debemos de entender que la vde theme recibe la clase 'dark' de nuestro 'index.css' ya que esta está siendo importada en nuestro main.jsx, y a la vez nuestro 'App.jsx' tambien esta siendo importada en nuestro main. Por eso es que estan entrelazadas y se permite esta funcionalidad.

La clase 'light' de initialTheme tiene la función de quitar la calse 'dark' que SI existe en nuestro 'index.css', y al quitarse se aplican los estilos por defecto... en este caso, colores claros. 'light' no debe de existir en nuestro css, sólo tiene la función de reemplazar 'dark'.
```js
const initialTheme = "light"

const MyPage = () => {
    const [theme, setTheme] = useState(initialTheme)

    const handleTheme = (e) =>{
        console.log(e.target.value)
        if(e.target.value === 'dark'){
            setTheme('dark')
        } else {
            setTheme(initialTheme)
        }
    }

    return (
        <div className='my-page'>
            <Header theme={theme} handleTheme={handleTheme}/>
            <Main theme={theme} />
            <Footer theme={theme} />
        </div>
    )
    ...
```
Header.jsx:
```js
const Header = ({theme, handleTheme}) => {
...
            <input type="radio" name='theme' id='light' onClick={handleTheme} value='light'/>
            <label htmlFor="light">Claro</label>
            <input type="radio" name='theme' id='dark' onClick={handleTheme} value='dark'/>
...            
```
Main.jsx y Footer.jsx:
```js
const Main = ({theme}) => {
    return (
        <main className={theme}>
        ...
}
    
const Footer = ({theme}) => {
    return (
        <footer className={theme}>
        ...
}
```
index.css:
```css
.my-page{
  margin: 2rem auto;
  padding: 1rem;
  width: 70%;
  background-color: #888585;
}

.dark{
  background-color: #FFF;
  filter: invert(1)
}
```
---
# 77. Context API. Haciendo una APP MultiIDIOMA SIN Context.
Creamos la vde language con su estado inicial en "es". Luego creamos un objeto 'translations' con las props *es* y *en*, teniendo cada una los textos que querramos mostrar tanto en español como en ingles. También necesitaremos una vde texts que es la que se encargará de almacenar los textos respectivamente, con su estado inicial ``translations[language]``. Pasaremos como *prop* la vde _*texts*_ al Header, Main y Footer.

Para el manejo del cambio de idioma necesitamos un manejador de eventos `handleLanguage` y lo enviaremos como *prop* al encargado de desencadenar dicho *e*, el Header, a través de un 'onChange' en el *select*. Destructuramos *texts y handleLanguage*. 

Terminaremos de destructurar la prop texts en Main, y Footer y comenzaremos por reemplazar los textos por cada una de las props de nuestro objeto translations con `{texts.}` y su respectiva prop.

Para la programación del handleLanguage es muy similar al handleTheme. Nos preguntaremos si el valor del *e* es igual a la palabra "en" siendo esta la que se encuentra en el option del select. Si es así ejectuamos el ``setLanguage("en")`` y también el seteo del texto con `setTexts(translation.en)`. Y en caso contrario, lo mismo pero con `es`.
```js
const initialLanguage = "es"

const translations = {
    es: {
        headerTitle: "Mi aplicacion SIN Context Api",
        ...
    },
    en: {
        headerTitle: "My application WITHOUT Context Api",
        ...
    },
}

const MyPage = () => {
    const [theme, setTheme] = useState(initialTheme)
    const [language, setLanguage] = useState(initialLanguage)
    const [texts, setTexts] = useState(translations[language])
    ...
const handleLanguage = (e) =>{
        if(e.target.value === "en"){
            setLanguage("en")
            setTexts(translations.en)
        } else {
            setLanguage(initialLanguage)
            setTexts(translations.es)
        }
    }
    ...
return (
        <div className='my-page'>
            <Header theme={theme} texts={texts} handleTheme={handleTheme} handleLanguage={handleLanguage}/>
            <Main theme={theme} texts={texts}/>
            <Footer theme={theme} texts={texts}/>
...
```
```js
const Header = ({theme, handleTheme, texts, handleLanguage}) => {
    return (
        <header className={theme}>
            <h2>{texts.headerTitle}</h2>
            <h3>{texts.headerSubtitle}</h3>
            <select name="language" onChange={handleLanguage}>
            ...
```
---
# 78. Context API. Haciendo una APP con SESIÓN de Usuario SIN CONTEXT
Crearemos una vde auth con su estado inicial es *null*. Crearemos el manejador de eventos para controlar el estado de nuestra variable y la pasamos como *prop* a nuestro Header. El Main recibirá como *prop* a `auth` para saber que texto mostrar, si el de invitado o usuario, y para el Footer no posee texto privado, asi que no necesita la autenticación. 

En el Main crearemos un conditional render diciendo que si auth es verdadero se muestre un texto u el otro. Lo mismo con el botón de nuestro Header de iniciar y cerrar sesión. Este mismo manejara el `handleAuth` en su *onClick*.
MyPage:
```js
const initialAuth = null
...
const [auth, setAuth] = useState(initialAuth)
...
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
    ...
``` 
Header:
```js
const Header = ({ ... auth, handleAuth }) => {
    ...
     <button onClick={handleAuth}>{auth ? texts.buttonLogout : texts.buttonLogin}</button>
    ...
``` 
Main:
```js
const Main = ({ theme, texts, auth }) => {
    return (
        <main className={theme}>
            {auth ? <p>{texts.mainHello}</p> : <p>{texts.mainWelcome}</p>}
            ...
``` 
---
# 79. Context API. Haciendo una APP con THEME Dark/Light CON Context
Duplicamos todos los componentes y mandamos a llamar a App. Creamos la carpeta contexto y por cada funcionalidad global que tengamos en la App, creemos un archivo.jsx independiente. 
`ThemeContext` no se crea con rafce, sinó que creamos la const y la igualamos a la palabra reservada createContext(), esta hará la autoimportación de 'react'. Internamente el contexto tiene dos objetos, un proveedor (un wrapper), y un "consumer", otro mecanismo que nos va a permitir consumir esos valores que dá el proveedor.

Hay personas que crean el archivo del contexto, y otro archivo para el provider. Nosotros crearemos el proveedor en el contexto, y para el "consumer" podríamos crear un objeto para poderlo consumir, pero desde que existen los Hooks, tenemos useContext que viene a reemplazar el 'consumer'.

Recordemos que todos los componentes en React reciben la *prop* `children` por defecto, haciendo referencia a los componentes que internamente tienen más contenido. La estructura es similar a React-router, envolviendo los componentes.

Destructuramos la prop *children* en nuestro ThemeProvider. Internamente nuestro jsx retornará ThemeContext.Provider, envolviendo los hijos que necesiten los valores que este contexto tenga. Cada valor que queramos compartir de manera global lo podemos ir definiendo como props en `<ThemeContext.Provier ...>`, pero se sugiere que previamente poseamos un objeto fuera del retorno, y cada prop del objeto sería un valor global.

Comenzamos con el ThemeDark/Light. Cortamos y pegamos la vde, el initialState y el manejador de dicha funcionalidad a nuestro ThemeContext. Luego en nuestra *data* que enviaremos como prop a nuestro *.Provider* le pasamos la vde *theme* y el manejador *handleTheme*. Con esto nuestra App ya renderiza correctamente pero aún falta algo más para que funcione... Si revisamos nuestros componentes, veremos que la vde theme que pasabamos como prop ya no se entrelaza (por asi decirlo) correctamente, lógico. Para que funcione theme en cada uno de nuestros componentes, debemos de hacer uso del `useContext`, snippet en lo posible. El snippet nos propone crear una const con 'nombre' pero podemos hacer uso de la destructuración que envía el ThemeProvider a través del *value={data}*, y de dónde proviene esa *data*? De la ``const ThemeContext = createContext()`` que creamos previamente. Luego de esto podemos eliminar las prop que recibe HeaderTheme que utilizaba antes (theme, handleTheme).

Hacemos lo mismo con los demás componentes, sin olvidar la importación del useContext, destructurando sólo {theme}, y eliminando cómo prop *theme*.

ThemeContext.jsx:
```js
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
        <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>
    )
}

export {ThemeProvider}
export default ThemeContext
```
MyPageContext.jsx:
```js
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
```
Header, Main, Footer:
```js
import React, { useContext } from 'react'
import ThemeContext from '../context/ThemeContext'

const HeaderContext = ({ texts, handleLanguage, auth, handleAuth }) => {
    const {theme, handleTheme} = useContext(ThemeContext)

const MainContext = ({ texts, auth }) => {
    const { theme } = useContext(ThemeContext)

const FooterContext = ({ texts }) => {
    const { theme } = useContext(ThemeContext)
```
---
