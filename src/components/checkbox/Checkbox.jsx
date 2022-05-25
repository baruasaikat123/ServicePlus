import { days } from "../../constants"
import { useAuth } from "../../contexts/AuthContext"
const Checkbox = () => {

    const { serviceData } = useAuth()

    console.log();

    const handleCheck = (e) => {
        const checked = e.target.checked

        if (checked) {

            serviceData.days.push(e.target.value)
            console.log(serviceData.days);
            console.log('checked')
        }
        else {
            let idx = serviceData.days.indexOf(e.target.value)
            serviceData.days.splice(idx, 1)
            console.log(serviceData.days);
            console.log('not checked')
        }
        
    }
    return (
        <>
            {days.map((day,key) => (
                <div key={key} className="checkbox-container" >
                    <input type='checkbox' defaultChecked={serviceData.days.indexOf(day)!==-1 && 'enable'} onChange={handleCheck} value={day}/>
                    <label style={{paddingLeft: '20px'}}>{day}</label>
                </div>
           )) }
        </>
    )
}

export default Checkbox