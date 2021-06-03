import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function FormDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Задать имя</DialogTitle>
            <ValidatorForm onSubmit={props.savePallete}>
        <DialogContent>
            <DialogContentText>
                Введите название
            </DialogContentText>
                <TextValidator 
                    value={props.palleteName}
                    onChange={props.handlePalleteName}
                    validators={['required']}
                    fullWidth
                    errorMessages={['Поле не может быть пустым']}></TextValidator>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
            <Button variant='contained'
                  color='secondary'
                  type='submit'
                  >Сохранить      
            </Button>
        </DialogActions>
            </ValidatorForm>
      </Dialog>
    </div>
  );
}