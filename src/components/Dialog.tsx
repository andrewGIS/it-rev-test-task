import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, Container } from '@material-ui/core';

import { useEffect } from 'react'

import { createStyles, lighten, makeStyles, Theme } from '@material-ui/core/styles';

import { useDispatch } from 'react-redux'

import { sendMessage, getRows } from '../store/table/actions'

import { tblRow } from '../commomTypes'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            height: 50,
            display: 'flex',
            backgroundColor: 'black',
            textTransform: 'none'

        },
        button: {
            color: 'red',
            textTransform: 'none'
        }
    }))

interface DialogProps {
    inputData?: tblRow,
    isOpen: boolean,
    handleShowDialog: (visible: boolean) => void;
}

export const AddRowDialog: React.FC<DialogProps> = (
    {
        inputData,
        isOpen,
        handleShowDialog
    }
) => {

    const [open, setOpen] = React.useState(isOpen);
    const [inputID, changeInputID] = React.useState<number | null>(null);
    const [inputDate, changeInputDate] = React.useState<string | null>(null);
    const [inputDistance, changeInputDistance] = React.useState<number | null>(null);
    const [errorInForm, setErrorForm] = React.useState<boolean>(false);

    const dispatch = useDispatch()

    //React.useEffect(() => { console.log("component updated"); });

    const parseDateToDisplay = (inString: string): string => {
        let t = new Date(inString)
        return t.toJSON().slice(0, 16)
    }

    React.useEffect(() => {
        if (inputData) {
            changeInputID(inputData.id)
            changeInputDate(parseDateToDisplay(inputData.date))
            changeInputDistance(inputData.distance)
        } else {
            changeInputID(null)
            changeInputDate(null)
            changeInputDistance(null)
        }
    }, [inputData])

    const onAddRow = () => {

        if (inputData) {

            // put request
            fetch(`http://localhost:5000/walking/${inputData.id}`, {
                method: 'PUT',
                body: JSON.stringify({ "id": inputData.id, "date": inputDate, "distance": inputDistance }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            dispatch(getRows())
        } else {

            // postt request
            fetch(`http://localhost:5000/walking`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id": inputID ? inputID : 0,
                    "date": inputDate ? new Date(inputDate).toISOString() : "0",
                    "distance": inputDistance ? inputDistance : 1000
                })
            })
            dispatch(getRows())
        }

        setOpen(false);
        // dispatch(sendMessage({
        //     id: inputID ? inputID : 0,
        //     date: inputDate ? new Date(inputDate).toISOString() : "0",
        //     distance: inputDistance ? inputDistance : 1000
        // }))

        handleShowDialog(false)

        clearField()

    }

    const handleClose = () => {

        //console.log(inputData)
        setOpen(false);
        clearField()
    };

    const clearField = () => {
        changeInputDistance(null)
        changeInputDate(null)
        changeInputID(null)
    }



    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <Button
                variant="text"
                color="primary"
                fullWidth
                className={classes.button} onClick={() => handleShowDialog(true)}>
                Добавить запись
            </Button>
            <Dialog open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle>
                    { inputData
                    ? "Редактирование данных"
                    :"Внесите данные (заполните все поля)"
                    }
                </DialogTitle>
                <DialogContent>
                    <TextField onChange={(event) => changeInputID(parseInt(event.target.value))}
                        error={inputID ? false : true}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Id"
                        type="number"
                        fullWidth
                        disabled={inputData ? true : false}
                        value={inputData ? inputData.id : undefined}
                    />
                    <TextField onChange={(event) => changeInputDate(event.target.value)}
                        error={inputDate ? false : true}
                        margin="dense"
                        id="time"
                        type="datetime-local"
                        fullWidth
                        value={inputDate ? inputDate : undefined}
                    />
                    <TextField onChange={(event) => changeInputDistance(parseInt(event.target.value))}
                        error={inputDistance ? false : true}
                        margin="dense"
                        id="distance"
                        label="Дистанция"
                        type="number"
                        fullWidth
                        value={inputDistance ? inputDistance : undefined}
                    />
                </DialogContent>

                <DialogActions>
                    <Button onClick={() => handleShowDialog(false)} color="primary">
                        Отмена
                    </Button>
                    <Button
                        disabled={!inputID || !inputDate || !inputDistance}
                        onClick={onAddRow}
                        color="primary">
                        {inputData 
                        ? "Cохранить запись" 
                        : "Добавить запись"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}