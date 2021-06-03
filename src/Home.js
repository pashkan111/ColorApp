import React from 'react'
import {Link} from 'react-router-dom'
import MiniPallete from './MiniPallete'
import {withStyles} from '@material-ui/styles'

const styles = {
      root: {
        height: "100vh",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        backgroundColor: "#394bad",
        overflow: "scroll"
      },
      container: {
        // width: "50%",
        // display: "flex",
        // alignItems: "flex-start",
        // flexDirection: "column",
        // // flexWrap: "wrap",
      },
      paletts: {
        // boxSizing: "border-box",
        // width: "100%",
        // display: "grid",
        // // gridTemplateColumns: "repeat(3, 30%)",
        // gridGap: "5rem",
      }
    };


function Home(props) {
    const {classes} = props
    console.log(props.colors)
    return (
        <div className={classes.root}>
            <div className={classes.container}>
            <h1>Home</h1>
            <Link to={'/pallete-new/'}>
                Создать новый
            </Link>
            {props.colors.map(i => (
                <div key={i.id} className={classes.pallets}>
                    <Link to={`/pallete/${i.id}`}>                       
                        <MiniPallete {...i}/>
                    </Link>
                </div>))}
            </div>
        </div>
    )
}

export default withStyles(styles)(Home)
