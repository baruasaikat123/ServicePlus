import { Link } from "react-router-dom"
import { useHistory } from "react-router-dom"
import CategoryCard from "../../components/card/CategoryCard"
import { Routediv, RouteHeading, RouteLinkContainer, RouteLinks } from "../../style"
import './category.css'
import { categoryItems } from "./categoryItems"

const Category = () => {

    return (
        <>
            <Routediv>
                <RouteHeading>
                    <h2>Select Categories</h2>
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