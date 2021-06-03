import React from 'react'
import './colorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom'
import chroma from "chroma-js";
import {withStyles} from '@material-ui/styles'

const defineColor = (props) => chroma(props.background.hex).luminance() < 0.3? 'white': 'black'

const styles = {
    copyText: {
        color: defineColor,
    },
    nameText: {
        color: defineColor
    },
    seeMore: {
        background: '#e4e8e9',
        position: 'absolute',
        border: 'none',
        right: '0px',
        bottom: '0px',
        width: '60px',
        height: '30px',
        textAlign: 'center',
        lineHeight: '30px',
    },
    seeMoreButton: {
        color: 'blue',
        textDecoration: 'none'
    }
}

function ColorBox(props) {
    const {background, name, id, palletename, classes} = props
    const [copied, setCopied] = React.useState(false)

    const shade = chroma(background.hex).luminance()

    const handleCopy = () => {
        setCopied(true)
    }

    React.useEffect(() => {
        setTimeout(() => (setCopied(false)), 1500)
    }, [copied])

    return (
        <CopyToClipboard text={background.hex} onCopy={handleCopy}>
        <div className='ColorBox' style={{background: background.hex}}>
            <div 
            style={{background: background.hex}} 
            className={copied ? 'copy-overlay show' : 'copy-overlay'} 
            />          
                <div className={copied ? 'copied show' : 'copied'}>
                       <h2 className={classes.copyText}>Скопировано</h2>
                        <p className={classes.copyText}>{name}</p>                
                </div>
            <div className='copy-container'>
                <div className='box-content'>
                    <span className={classes.nameText}>{name}</span>
                </div>
                <button className='copy-button'>Копировать</button>
            </div>
            <div className={classes.seeMore}>
                <Link className={classes.seeMoreButton} to={`/color-detail/${palletename}/${id}`} onClick={(event) => event.stopPropagation()}>
                    <span>Еще</span>          
                </Link>
            </div>
        </div>
        </CopyToClipboard>
    )
}

export default withStyles(styles)(ColorBox)
