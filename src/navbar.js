import React from 'react'
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import './navbar.css'
import { MenuItem } from '@material-ui/core';
import Select from '@material-ui/core/Select';

function Navbar(props) {
    const {changeLevel, color, changeFormat, isSingle} = props
    const [format, setFormat] = React.useState('hex')
    console.log(format)
    
    function handleChangeFormat(e) {
        changeFormat(e.target.value)
        setFormat(e.target.value)
    }

    return (
        <header className='navbar'>
            {!isSingle? 
            (<div className='slider'>    
                <Slider 
                defaultValue={color} 
                min={100} 
                max={900} 
                onChange={changeLevel}
                step={100}
                />
            </div>) :
            (<span></span>)
        }
            
                <Select value={format} onChange={handleChangeFormat}>
                    <MenuItem value="hex">HEX</MenuItem>
                    <MenuItem value="rgba">RGBA</MenuItem>
                    <MenuItem value="rgb">RGB</MenuItem>
                </Select>
        </header>
    )
}

export default Navbar
