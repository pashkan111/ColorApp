import React from 'react'
import ColorBox from './colorBox'
import './pallete.css'
import Navbar from './navbar'
import { Snackbar, IconButton } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import {Link} from 'react-router-dom'


function Pallete(props) {
    const {colors} = props
    const [color, setColor] = React.useState(500)
    const [format, setFormat] = React.useState('hex')
    const [open, setOpen] = React.useState(false)

    function changeLevel(value) {
        setColor(value)
    }

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
        <div className='Pallete'>
            <Navbar
            changeLevel={changeLevel}
            color={color}
            changeFormat={changeFormat}
            isSingle={false}
            />
            <div className='Pallete-color'>
                {colors.colors[color].map(item => (
                <ColorBox key={color[format]} background={item} name={item[format]} id={item.id} palletename={colors.id}/>
            ))}
                <div className='ColorBox go-back'>
                    <Link to={'/'} className='back-button'>Вернуться</Link>
                </div>
            </div>
            <Snackbar 
            anchorOrigin={{vertical: 'bottom', horizontal: 'left',  }}
            open={open}
            autoHideDuration={3000}
            message={<span id="message-id">Формат изменен</span>}
            onClose={closeBar}
            SnackbarContentProps={{
                'aria-describedby': 'message-id',
              }}
            action={[
                <IconButton onClick={closeBar}>
                    <CloseIcon/>
                </IconButton>
            ]}
            
            />

        </div>
    )
}

export default Pallete
