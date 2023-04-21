import React, { createContext, useContext } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import Loader from "./Loader";
import Message from "./Message";
import CrudContext from "../context/CrudContext";

const CrudApi = () => {
    const { db, error, loading} = useContext(CrudContext)

    return (
        <>
            <h2>CRUD-API con Context</h2>
                    <CrudForm />
                    {loading && <Loader />}
                    {error && <Message
                        msg={`Error ${error.status}: ${error.statusText}`}
                        bgColor="#dc3545" />}
                    {db && <CrudTable />}
        </>
    )
}

export default CrudApi