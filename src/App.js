import React from 'react'
import Pallete from './pallete'
import colorsArr from './colors'
import {generatePalette} from './colorHelper'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Home from './Home'
import ColorDetail from './ColorDetail'
import NewPallete from './NewPallete'
import useLocalStorage from './hooks'

function App() {
  const [colors, setColors] = useLocalStorage('colors', colorsArr)
  const findColor = (id) => {
    return colors.find(item => item.id===id)
  }

  const getShadesOfColor=(arr, id) => {
    const arrOfColors = []
        for (let key in arr.colors){
            for (let i in arr.colors[key]){
                arrOfColors.push(arr.colors[key][i])
            }
        }
        return arrOfColors.filter(item => item.id===id).reverse()
  }
  
  function savePallete(arr) {
    setColors([...colors, arr])
  }
  
  return (
      <BrowserRouter>
        <Route exact path={'/pallete/:id/'} 
          render={(props) => <Pallete colors={generatePalette(findColor(props.match.params.id))}/>}/>
        <Route exact path={'/'} render={() => <Home colors={colors}/>}/>
        <Route exact path={'/pallete-new/'} render={(routeProps) => <NewPallete savePallete={savePallete} {...routeProps}/>}/>
        <Route exact path={'/color-detail/:palletename/:id/'} 
          render={(props) => <ColorDetail 
          palletename={props.match.params.palletename}
          id={props.match.params.id}
          colors={getShadesOfColor(generatePalette(findColor(props.match.params.palletename)), props.match.params.id)}
          />}/>
    </BrowserRouter>
  );
}

export default App;
