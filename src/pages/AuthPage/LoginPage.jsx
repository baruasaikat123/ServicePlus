import { useEffect, useState } from 'react'
import Loading from '../../components/Loading'
import Navbar from '../../components/navbar/Navbar'
import Login from '../../components/userAuth/login/Login'

const LoginPage = () => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setLoading(false), 2000)

        return () => setLoading(false)
    }, [])

    if(loading) return <Loading />
    
    
    return (
        <><Navbar />
        <div style={{width: '50%', marginLeft: '20%', marginTop: '150px'}}>
            <Login />
        </div></>
    )
}

export default LoginPage