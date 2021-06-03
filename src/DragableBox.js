import React from 'react'
import { makeStyles} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {SortableElement} from 'react-sortable-hoc'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '20%',
        height: '25%',
        margin: '0 auto',
        display: 'inline-block',
        position:'relative',
        cursor: 'pointer',
        '&:hover svg': {
            color: 'white',
            transform: 'scale(1.3)'
        }
    },
    boxContent: {
        position: 'absolute',
        width: '100%',
        left: '0px',
        bottom: '0px',
        padding: '10px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        fontSize: '13px',
        display: 'flex',
        justifyContent:'space-between'
    },
    deleteIcon: {
        transition: 'all 0.2s ease-in-out'
        // color: "white",
        // backgroundColor: "#eb3d30",
        // width: "20px",
        // height: "20px",
        // position: "absolute",
        // right: "0px",
        // top: "0px",
        // padding: "10px",
        // zIndex: 10,
        // opacity: 0
      }
}))


const DragableBox = SortableElement((props) => {
    const classes = useStyles()
    const {color, name, deleteIcon} = props

    function removeIcon(id) {
        deleteIcon(id)
    }

    return (
        <div className={classes.root} style={{backgroundColor: color}}>
            <div className={classes.boxContent}>
                <span>{name}</span>
                <DeleteIcon className={classes.deleteIcon} onClick={() => removeIcon(props.id)}/>
            </div>           
        </div>
    )
})

export default DragableBox
