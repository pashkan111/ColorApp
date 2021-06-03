import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {ChromePicker} from 'react-color'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DragableColorList from './DragableColorList'
import {arrayMove} from 'react-sortable-hoc';
import FormDialog from './Form'


const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },

  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    height: 'calc(100vh - 50px)'
  },
}));

function NewPallete(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [Open, setOpen] = React.useState(false);
  const [arr, setArr] = React.useState([]);
  const [Color, setColor] = React.useState('#00b4cc');
  const [boxName, setBoxName] = React.useState('');
  const [palleteName, setPalleteName] = React.useState('');

  const handleDrawerToggle = () => {
    setOpen(!Open);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
    </div>
  );

  function Changer(newColor) {
    setColor(newColor.hex)
  }

  function createPallete() {
      const newObj = {
        color: Color, id: Date.now(), name: boxName
      }
      if (arr.length<20) {
        setArr([...arr, newObj])
      } else {
          return arr
      }    
  }

  function changeName(e) {
      setBoxName(e.target.value)
  }

  React.useEffect(() => {
      return () => { 
        ValidatorForm.addValidationRule('isBoxNameUnique', value => {
            arr.every(i => i.title.toLowerCase() !== value.toLowerCase())
          })
     }
  }, [])

  const arrOfColors = JSON.parse(localStorage.getItem('colors'))

  React.useEffect(() => {
    const existingPalleteNames = []
    existingPalleteNames.push(arrOfColors.map(item => (
      item.paletteName
    )));
    ValidatorForm.addValidationRule('isPalleteNameUnique', (value) => {
        existingPalleteNames.forEach(i => i !== value)
      });
      return () => {
        ValidatorForm.removeValidationRule('isPalleteNameUnique');
     }
  }, [])

function savePallete() {
  const newPalleteName = palleteName
  const newPallete = {
    paletteName: newPalleteName,
    id: newPalleteName.toLowerCase().replace(/ /g, '-'),
    colors: arr
  }
  props.savePallete(newPallete)
  props.history.push('/')
}
  function handlePalleteName(e) {
    setPalleteName(e.target.value)
  }

  const container = window !== undefined ? () => window().document.body : undefined;

  function deleteIcon(id) {
    setArr(prev => prev.filter(item => item.id !== id))
  }

  const onSortEnd = ({oldIndex, newIndex}) => {
    setArr(i => arrayMove(i, oldIndex, newIndex))
  }

  function removeAll() {
    setArr([])
  }
  
  function getRandomInt() {
    return Math.floor(Math.random() * 10);
  }


  function randomAll() {
    setArr(arrOfColors[getRandomInt()].colors)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>          
              <FormDialog palleteName={palleteName} savePallete={savePallete}
handlePalleteName={handlePalleteName} />
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">

        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={Open}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true,
            }}
          >
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
              <div>
                <Button variant='contained' color='primary' onClick={randomAll}>
                        Добавить случайный
                </Button>
                <Button variant='contained' color='secondary' onClick={removeAll}>
                        Очистить
                </Button>
              </div>

            {drawer}
        <ChromePicker color={Color} onChangeComplete={Changer} />
        <ValidatorForm onSubmit={createPallete}>
            <TextValidator 
                value={boxName}
                onChange={changeName}
                validators={['required']}
                errorMessages={['Поле не может быть пустым']}
                // validators={['required', 'isBoxNameUnique']}
                // errorMessages={['Поле не может быть пустым', 'Название должно быть уникальным']}
                />
            <Button variant='contained' color='primary' type='submit'>
                Создать
            </Button>
        </ValidatorForm>
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
            <DragableColorList arr={arr} deleteIcon={deleteIcon} axis='xy' onSortEnd={onSortEnd}/>
      </main>
    </div>
  );
}

export default NewPallete;
