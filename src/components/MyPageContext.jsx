import React from 'react'
import { ThemeProvider } from '../context/ThemeContext'
import { LanguageProvider } from '../context/LanguageContext'
import { AuthProvider } from '../context/AuthContext'
import HeaderContext from './HeaderContext'
import MainContext from './MainContext'
import FooterContext from './FooterContext'

const MyPageContext = () => {
    return (
        <div className='my-page'>
            <ThemeProvider>
                <LanguageProvider>
                    <AuthProvider>
                        <HeaderContext />
                        <MainContext />
                    </AuthProvider>
                    <FooterContext />
                </LanguageProvider>
            </ThemeProvider>
        </div>
    )
}

export default MyPageContext