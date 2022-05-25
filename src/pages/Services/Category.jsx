import CategoryCard from "../../components/card/CategoryCard"
import Navbar from "../../components/navbar/Navbar"
import { useAuth } from "../../contexts/AuthContext"
import { Routediv, RouteHeading, RouteLinkContainer, RouteLinks } from "../../style"
import './category.css'
import { categoryItems } from "./categoryItems"
import Profilebar from '../../components/profilebar/Profilebar'
import Loading from "../../components/Loading"
import { useState, useEffect } from "react"

const Category = () => {

    const { currentUser } = useAuth()
    
    const [loading, setLoading] = useState(true)
  
    useEffect(() => {
      setTimeout(() => setLoading(false), 1000)
  
      return () => setLoading(false)
    }, [])
  
    if(loading) return <Loading />

    return (
        <>
            {currentUser ? <Profilebar /> : <Navbar/>}
            <Routediv>
                <RouteHeading>
                    <p style={{fontSize: '20px', fontWeight: 'bold'}}>Select Categories</p>
                </RouteHeading>
                <RouteLinkContainer>
                    <RouteLinks to='/'><p>Home</p></RouteLinks>
                    <p>&nbsp;/&nbsp;</p>
                    <p>Category</p>
                </RouteLinkContainer>
            </Routediv>
            <div className="category-box">
                {categoryItems.map((item, key) => 
                    (
                    <CategoryCard key={key} name={item.name} pic={item.pic} id={item.id} />    
                    )
                )}
            </div>
        </>
    )
      
}

export default Category