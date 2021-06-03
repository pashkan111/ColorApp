import React from 'react'
import ColorBoxDetail from './ColorBoxDetail'
import './pallete.css'
import './colorBox.css'
import Navbar from './navbar'

function ColorDetail(props) {
    const {colors, palletename} = props
    const [format, setFormat] = React.useState('hex')
    const [open, setOpen] = React.useState(false)

    function changeFormat(value) {
        setFormat(value)
        setOpen(true)
        setTimeout(() => {
            setOpen(false)
        }, 2000)
    }

    
    function closeBar() {
        setOpen(false)
    }

    return (
        <div className='Pallete single'>
            <Navbar
            isSingle={true}
            changeFormat={changeFormat}
            />
            <div className='Pallete-color'>
                <ColorBoxDetail colors={colors} format={format} palletename={palletename}/>
            </div>
        </div>
    )
}

export default ColorDetail
