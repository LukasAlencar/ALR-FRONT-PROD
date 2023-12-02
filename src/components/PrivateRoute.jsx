import { useContext, useEffect, useState } from "react";
import { Context } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function PrivateRoute({ children }) {
    const { isAuth, setUserLogged } = useContext(Context)
    const [loading, setIsLoading] = useState(true)
    const navigate = useNavigate()


    useEffect(() => {
        (function authenticate() {
            if (!isAuth) {
                navigate('/')
            }

            setIsLoading(false)

        })()
    }, [])

    if (loading) {
        return <h1>Carregando...</h1>
    }
    return children
}

export default PrivateRoute