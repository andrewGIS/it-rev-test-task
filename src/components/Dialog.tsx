import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Container } from '@material-ui/core';
import { useEffect } from 'react'
import { createStyles, makeStyles, Theme, responsiveFontSizes } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { fetchRows } from '../store/table/actions'
import { tblRow } from '../commomTypes'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            height: 50,
            display: 'flex',
            backgroundColor: 'red',
            //textTransform: 'none'
        },
        button: {
            outline: 0,
            backgroundColor: 'red',
            color: 'white',
            textTransform: 'none',
            cursor: 'pointer',
            width: '100%',
            position: "relative",
            borderColor: 'red',
            fontFamily: 'Roboto',
            fontSize: 16,
            border: 0

        }
    }))

interface DialogProps {
    editData?: tblRow,
    isOpen: boolean,
    handleShowDialog: (visible: boolean) => void;
}

export const AddEditRowDialog: React.FC<DialogProps> = (
    {
        editData,
        isOpen,
        handleShowDialog
    }
) => {
    const [inputID, setInputID] = React.useState<number | null>();
    const [inputDate, setInputDate] = React.useState<string | null>();
    const [inputDistance, setInputDistance] = React.useState<number | null>();

    const dispatch = useDispatch()
    const classes = useStyles();

    const parseDateToDisplay = (inString: string): string => {
        let date = new Date(inString)
        return date.toJSON().slice(0, 16)
    }

    useEffect(() => {
        if (editData) {
            setInputID(editData.id)
            setInputDate(parseDateToDisplay(editData.date))
            setInputDistance(editData.distance)
        } else {
            clearFields()
        }
    }, [editData])

    const onAddRow = async () => {

        if (editData) {

            // put request
            try {
                const response = await fetch(`http://localhost:5000/walking/${editData.id}`, {
                    method: 'PUT',
                    body: JSON.stringify({ "id": editData.id, "date": inputDate, "distance": inputDistance }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                })

                if (!response.ok)
                {
                    throw new Error(response.statusText);
                }
                dispatch(fetchRows())

                handleShowDialog(false)
                clearFields()

            } catch (err) {
                alert(err)
            }



        } else {
            // post request
            try {
                const response = await fetch(`http://localhost:5000/walking`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "id": inputID,
                        "date": inputDate,
                        "distance": inputDistance
                    })
                })

                if (!response.ok) {
                    throw new Error(response.statusText);
                }

                dispatch(fetchRows())
                handleShowDialog(false)
                clearFields()

            } catch (err) {
                alert(err)
            }
        }
    }

    const handleClose = () => {

        handleShowDialog(false)
        clearFields()
    };

    const clearFields = () => {
        setInputDistance(null)
        setInputDate(null)
        setInputID(null)
    }

    return (
        <Container className={classes.container}>
            <button
                className={classes.button}
                onClick={() => handleShowDialog(true)}>
                Добавить запись
            </button>
            <Dialog open={isOpen} onClose={handleClose} >
                <DialogTitle>
                    {editData
                        ? "Редактирование данных"
                        : "Внесите данные (заполните все поля)"
                    }
                </DialogTitle>
                <DialogContent>
                    <TextField onChange={(event) => setInputID(parseInt(event.target.value))}
                        error={inputID ? false : true}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Идентификатор записи"
                        type="number"
                        fullWidth
                        disabled={editData ? true : false}
                        value={inputID}
                    />
                    <TextField onChange={(event) => setInputDate(event.target.value)}
                        error={inputDate ? false : true}
                        margin="dense"
                        id="time"
                        type="datetime-local"
                        fullWidth
                        value={inputDate}
                    />
                    <TextField onChange={(event) => setInputDistance(parseInt(event.target.value))}
                        error={inputDistance ? false : true}
                        margin="dense"
                        id="distance"
                        label="Дистанция"
                        type="number"
                        fullWidth
                        value={inputDistance}
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
                        {editData
                            ? "Cохранить запись"
                            : "Добавить запись"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}