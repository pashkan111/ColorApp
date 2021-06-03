import React from 'react'
import {withStyles} from '@material-ui/styles'

const styles = {
    root: {
        backgroundColor: "white",
        border: "1px solid black",
        borderRadius: "5px",
        padding: "0.5rem",
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        "&:hover svg": {
          opacity: 1
        }
      },
      colors: {
        backgroundColor: "#dae1e4",
        height: "150px",
        width: "100%",
        borderRadius: "5px",
        overflow: "hidden"
      },
      title: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: "0",
        color: "black",
        paddingTop: "0.5rem",
        fontSize: "1rem",
        position: "relative"
      },
      miniColor: {
        height: "25%",
        width: "20%",
        display: "inline-block",
        margin: "0 auto",
        position: "relative",
        marginBottom: "-3.5px"
      },
}

function MiniPallete(props) {
    const {classes, paletteName, colors} = props

    const miniBox = () => {
        colors.map(item => (
            <div
                style={{backgroundColor: item.color}} 
                className={classes.miniColor}
                key={item.name}>
            </div>
        ))
    }
    return (
        <div className={classes.root}>
            <h5 className={classes.title}>{paletteName}</h5>
            <div className={classes.colors}>
                {miniBox()}
            </div>            
        </div>
    )
}

export default withStyles(styles)(MiniPallete)
