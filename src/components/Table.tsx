import React, { useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { createStyles, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';
import { TableHeader } from '../components/TableHeader'
import { Container } from '@material-ui/core'
import { tblRow, order } from '../commomTypes'
// test redux
import { useSelector, useDispatch } from 'react-redux'
import { TableState } from '../store/table/reducer'

import { AddEditRowDialog } from './Dialog'

import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { fetchRows } from '../store/table/actions'

import { Graphic } from './Graphic'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
        margin: {
            margin: theme.spacing(1)
        },
        paper:{
            overflowY:'auto',
            maxHeight:350,
            maxWidth:400
        }
    })
);

const parseDate = (rawDate: string): Date => {
    return new Date(rawDate)
}

const getDayOfWeek = (inDate: Date): string => {
    let days = [
        "Воскресенье",
        "Понедельник",
        "Вторник",
        "Среда",
        "Четверг",
        "Пятница",
        "Суббота",
    ]
    return days[inDate.getDay()]
}

const formatDistance = (dist: number): string => {
    let kms: number = Math.floor(dist / 1000)
    let meters: number = dist % 1000

    let kmsLabel: string = kms % 10 === 1
        ? 'километр'
        : kms % 10 <= 4
            ? 'километра'
            : 'километров'

    let metersLabel: string = meters % 10 === 1
        ? 'метр' : meters <= 4 && meters != 0
            ? 'метра' : 'метров'

    return kms === 0
        ? `${meters} ${metersLabel}`
        : meters === 0
            ? `${kms} ${kmsLabel}`
            : `${kms} ${kmsLabel} ${meters} ${metersLabel}`
}

function compare(a: string, b: string): number
function compare(a: number, b: number): number
function compare(a: string | number, b: string | number): number
function compare(a: any, b: any): number {
    if (typeof a == 'number') {
        if (a < b) {
            return -1
        }
        if (a > b) {
            return 1
        }
    }
    if (typeof a == 'string') {
        if (parseDate(a) < parseDate(b)) {
            return -1
        }
        if (parseDate(a) > parseDate(b)) {
            return 1
        }
    }
    return 0
}

const StyledTableRow = withStyles((theme: Theme) =>
    createStyles({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }),
)(TableRow);




//const connector = connect()

const TableComponent = () => {


    //dispatch(getRows())
    const dispatch = useDispatch();
    const classes = useStyles();

    const [isDialogOpen, setDialogVisibility] = React.useState(false)
    const [editRowData, setEditRowData] = React.useState<tblRow | undefined>(undefined)
    const [orderDir, setOrderDir] = React.useState<order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof tblRow>('date')

    const tblData = useSelector((state: TableState) => state.tableRows)


    useEffect(() => {
        // load init rows

        dispatch(fetchRows())
        //updateRow(rows1)

    }, [])

    const sorting = (data: tblRow[], property: keyof tblRow, dir: order): tblRow[] => {
        let sortedRows = [...tblData.sort((a, b) => {
            if (dir === 'asc') {
                return -compare(a[property], b[property])
            }
            else {
                return compare(a[property], b[property])
            }

        })]

        return sortedRows
    }

    const onOrderOptChange = (event: React.MouseEvent<unknown>, property: keyof tblRow, dir: order) => {

        const isAsc = orderBy === property && orderDir === 'asc';

        setOrderDir(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDeleteRow = async (e: number) => {
        await fetch(`http://localhost:5000/walking/${e}`,
            { method: 'DELETE' })
        dispatch(fetchRows())

    }

    const handleEditRow = (row: tblRow) => {
        console.log(row)
        setEditRowData(row)
        setDialogVisibility(true)
        // return ( <AddRowDialog />)
    }
    const toggleDialog = (payload: boolean) => {
        setEditRowData(undefined)
        setDialogVisibility(payload)
    }

    return (
       <Paper className={classes.paper}>
                <Table>
                    <TableHeader
                        onRequestSort={onOrderOptChange}
                        orderDir={orderDir}
                        orderBy={orderBy}
                    >
                    </TableHeader>

                    <TableBody>
                        {sorting(tblData, orderBy, orderDir).map((row, index) => (
                            <StyledTableRow key={index}>

                                <TableCell >
                                    {getDayOfWeek(parseDate(row.date))}
                                    <br />
                                    {parseDate(row.date).toLocaleDateString()}
                                </TableCell>

                                <TableCell align="right">
                                    {formatDistance(row.distance)}
                                </TableCell>
                                <TableCell>
                                    <IconButton size="small" onClick={() => handleDeleteRow(row.id)}>
                                        <DeleteIcon ></DeleteIcon>
                                    </IconButton>

                                    <IconButton size="small" onClick={() => handleEditRow(row)}>
                                        <EditIcon ></EditIcon>
                                    </IconButton>
                                </TableCell>

                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                <AddEditRowDialog
                    isOpen={isDialogOpen}
                    handleShowDialog={toggleDialog}
                    editData={editRowData}
                />
       </Paper>

    )
}


//export { formatDistance,  connect(TableComponent1)
export { formatDistance, TableComponent }
