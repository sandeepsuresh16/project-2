import axios from '../axios'
import { useContext,useState,useEffect, createContext } from 'react'

const AuthContext = createContext();

function AuthContextProvider(props){
    const [adminLoggedIn, setAdminLoggedIn] = useState(undefined);


    async function getAdminLoggedIn(){
        const loggedInResp = await axios.get('/admin/loggedin')
        setAdminLoggedIn(loggedInResp.data)
        console.log(adminLoggedIn)
    }

    useEffect(()=>{
        getAdminLoggedIn()
    },[])

    return(
        <AuthContext.Provider value={{getAdminLoggedIn,adminLoggedIn}} >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext
export {AuthContextProvider} 