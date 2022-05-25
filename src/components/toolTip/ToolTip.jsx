import './toolTip.css'

const ToolTip = ({text}) => {
    return (
        <div className='tooltip-container'>
          {text}
        </div>
    )
}

export default ToolTip