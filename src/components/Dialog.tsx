import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Container } from '@material-ui/core';

import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

type tblRow = {
    id: number,
    date: string,
    distance: number
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: 50,
            display:'flex',
            backgroundColor:'black',
            textTransform:'none'

        },
        button:{
            color: 'red',
            textTransform:'none'
        }
    }))


export default function AddRowDialog() {
    const [open, setOpen] = React.useState(false);
    const [inputData, updateInData] = React.useState<tblRow[]>([
        {
            id: 0,
            date: '',
            distance: 0
        }
    ]);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log(inputData)
        setOpen(false);

    };

    // const test = <N extends keyof tblRow>(name:N){
    //     console.log(typeof(testObj[name]))
    // }

    const classes = useStyles();

    const handleChange = (name: keyof tblRow) => (event: React.ChangeEvent<HTMLInputElement>) => {



        let value

        if (typeof (value) === 'number') {
            value = parseInt(event.target.value)
        }

        if (typeof(value) === 'string') {
            value = event.target.value
        }

        updateInData({
            ...inputData,
            [name]: value
        })
    }

    return (
        <Container className={classes.container}>
            <Button variant="text" color="primary" onClick={handleClickOpen} fullWidth className={classes.button}>
                Добавить запись
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>Внесите данные</DialogTitle>
                <DialogContent>
                    <TextField onChange={handleChange('id')}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Id"
                        type="number"
                        fullWidth
                    />
                    <TextField onChange={handleChange('date')}
                        margin="dense"
                        id="time"
                        type="datetime-local"
                        fullWidth
                    />
                    <TextField onChange={handleChange('distance')}
                        margin="dense"
                        id="distance"
                        label="Дистанция"
                        type="number"
                        fullWidth
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Добавить запись
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}