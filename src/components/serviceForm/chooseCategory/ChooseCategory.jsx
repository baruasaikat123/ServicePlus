import './chooseCategory.css'
import { category } from '../../../constants'
import Dropdown from '../../dropdown/Dropdown'
import { useAuth } from '../../../contexts/AuthContext'
import Checkbox from '../../checkbox/Checkbox'

const ChooseCategory = () => {

    const { serviceData } = useAuth()
    
    return (
        <div className='choose-category-content'>
            <div>
                <label style={{fontWeight: 'bold'}}>Select a category:</label>
                <Dropdown
                    text={'category'}
                    data={serviceData.category}
                    options={category}
                />
            </div>
            <div>
                <label style={{fontWeight: 'bold', paddingBottom: '15px'}}>Specify your preferred days:</label>
                <Checkbox />
            </div>
        </div>
           
    )
}

export default ChooseCategory