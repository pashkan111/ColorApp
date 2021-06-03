import React from 'react'
import './colorBox.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {Link} from 'react-router-dom'


function ColorBoxDetail(props) {
    const {colors, format} = props
    const [copied, setCopied] = React.useState(false)

    const handleCopy = () => {
        setCopied(true)
    }

    React.useEffect(() => {
        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }, [copied])

    return (
        colors.map(item => (
    <CopyToClipboard text={item.format} onCopy={handleCopy}>
        {item.hex === '#ffffff' ? <div className='go-back ColorBox'>
            <Link to={`/pallete/${props.palletename}/`} className='back-button'>Вернуться</Link>
        </div> :
        
        <div className='ColorBox' style={{background: item.hex}}>
            <div
            style={{background: item.hex}} 
            className={copied ? 'copy-overlay show' : 'copy-overlay'} 
            />
            <div className={copied ? 'copied show' : 'copied'}>
                <h2>Скопировано</h2>
                <h4>{item[format].toUpperCase()}</h4>
            </div>
            <div className='copy-container'>
                <div className='box-content'>
                <span>{item[format]}</span>
                </div>
                <button className='copy-button'>Копировать</button>
            </div>
        </div>
}
    </CopyToClipboard>
    ))
    )
}

export default ColorBoxDetail
