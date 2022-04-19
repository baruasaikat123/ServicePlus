import { useHistory } from 'react-router-dom'
import './categoryCard.css'

const CategoryCard = ({ name, pic, id }) => {
    const history = useHistory()
    return (
        <div onClick={() => history.push(`/services/category/${id}`)} className='category-container'>
            <img style={{height: '45px'}} src={pic} alt={'pic'} />
            <h4>{name}</h4>
        </div>
    )
}

export default CategoryCard