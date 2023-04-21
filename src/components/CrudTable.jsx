import React from 'react'
import CrudTableRow from './CrudTableRow'
import { useContext } from 'react'
import CrudContext from '../context/CrudContext'

export const CrudTable = () => {
    const { db: data } = useContext(CrudContext)
    console.log(data)
    return (
        <>
            <h3>Tabla de Datos</h3>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Constelación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map(el => (
                            <CrudTableRow
                                key={el.id}
                                el={el}
                            />
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Sin datos</td>
                        </tr>

                    )}
                </tbody>
            </table>
        </>
    )
}

