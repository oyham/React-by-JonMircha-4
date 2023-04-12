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