import { useHistory } from 'react-router-dom'
import './categoryCard.css'

const CategoryCard = ({ name, pic, id }) => {
    const history = useHistory()
    return (
        <div onClick={() => history.push(`/services/category/${id}`)} className='category-container'>
            <img style={{height: '45px'}} src={pic} alt={'pic'} />
            <p>{name}</p>
        </div>
    )
}

export default CategoryCard