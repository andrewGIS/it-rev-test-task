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
import {TableHeader} from '../components/TableHeader'
import {tblRow, order} from '../commomTypes'
// test redux
import {useSelector, useDispatch} from 'react-redux'
import {TableState} from '../store/table/reducer'

import {AddRowDialog} from './Dialog'

import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import {getRows} from '../store/table/actions'
import { METHODS } from 'http';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            margin: theme.spacing(1),
        },
        table: {
            //height: "400px"
            // maxWidth: 700,
        },
        paper: {
            //width: 140,
            //height: 400
        },
        margin: {
            margin: theme.spacing(1)
        },
        footer: {
            backgroundColor: 'black'
        },
        // container: {
        //     height: 50,
        //     alignContent:'center',
        //     verticalAlign:'baseline'
        // }
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
    let kmsLabel: string = kms % 10 == 1 ? 'километр' : kms <= 4 ? 'километра' : 'километров'
    let meters: number = dist % 1000
    let metersLabel: string = dist % 10 == 1 ? 'метр' : meters <= 4 && meters != 0 ? 'метра' : 'метров'
    return kms == 0 ? `${meters} ${metersLabel}`
        : meters == 0 ? `${kms} ${kmsLabel}`
            : `${kms} ${kmsLabel} ${meters} ${metersLabel}`
}

function compare (a:string,b:string):number
function compare (a:number,b:number):number
function compare (a:string|number,b:string|number):number
//function compare (a:any,b:any):number
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

const TableComponent=() => {

    const dispatch = useDispatch()
    //dispatch(getRows())

    const classes = useStyles();

    const [isDialogOpen, setDialogVisibility] = React.useState(false)
    const [editRowData, seteditRowData] = React.useState<tblRow|undefined>(undefined)

    const rows1 = useSelector((state:TableState) => state.tableRows)
    const [sortedRows, updateRow] = React.useState<tblRow[]>(rows1);

    useEffect(()=>{
        // load init rows
        dispatch(getRows())
        //updateRow(rows1)
    },[])

 

    const handleSort = (event: React.MouseEvent<unknown>, property: keyof tblRow, dir:order) => {

        console.log(property,dir)

        let sortedRows = [...rows1.sort((a,b)=>{
            if (dir === 'asc') {
                return compare(a[property], b[property])
            }
            else {
                return -compare(a[property], b[property])
            }
            
        })]
        updateRow (sortedRows)
        //setOrder(isAsc ? 'desc' : 'asc');
        //setOrderBy(property);
      };

    const handleDeleteRow = (e:number) => {
        console.log(e)
        fetch (`http://localhost:5000/walking/${e}`,
        {method:'DELETE'})
        dispatch(getRows())
        
    }

    const handleEditRow = (row:tblRow) => {
        console.log(row)
        seteditRowData(row)
        setDialogVisibility(true)
        // return ( <AddRowDialog />)
    }
    const toggleDialog = (payload:boolean) => {
        seteditRowData(undefined)
        setDialogVisibility(payload)
    }

    return (
        <Grid container className={classes.root} >
            <Grid container justify="center" spacing={2}>
                <Grid item key={0}>
                    <Paper className={classes.paper}>

                        <Table
                            className={classes.table}
                        // size="small"
                        >
                            <TableHeader onRequestSort={handleSort}></TableHeader>

                            <TableBody>
                                {rows1.map((row,index) => (
                                    <StyledTableRow key={index}>

                                        <TableCell >
                                            {getDayOfWeek(parseDate(row.date))}
                                            <br />
                                            {parseDate(row.date).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell align="right">
                                            {formatDistance(row.distance)}
                                            <IconButton size="small" onClick={()=>handleDeleteRow(row.id)}>
                                                <DeleteIcon ></DeleteIcon>
                                            </IconButton>
                                            <IconButton size="small" onClick={()=>handleEditRow(row)}>
                                                <EditIcon ></EditIcon>
                                            </IconButton>
                                        </TableCell>
                                        <TableCell>
                                            

                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>

                        
                        

                    </Paper>
                    <AddRowDialog 
                    key={0} 
                    isOpen={isDialogOpen} 
                    handleShowDialog={toggleDialog}
                    inputData = {editRowData}
                    />
                </Grid>
                <Grid item key={1}>
                    <Paper className={classes.paper}>
                        <Typography>
                            Суммарная активность
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    )
}


//export { formatDistance,  connect(TableComponent1)
export { formatDistance,  TableComponent}
