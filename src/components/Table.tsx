import React, { Props } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';
import { createStyles, withStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import TableFooter from '@material-ui/core/TableFooter'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import {Connect, ConnectedProps} from 'react-redux'
import {TableHeader} from '../components/TableHeader'
import {order} from '../commomTypes'

import AddRowDialog from './Dialog'
import { Container } from '@material-ui/core';

interface tblRow {
    id: number,
    date: string,
    distance: number
}

interface HeadCell {
    id: keyof tblRow;
    label: string;
    numeric: boolean;
}

const returnTestData = (): tblRow[] =>
    [
        {
            id: 1,
            date: "2019-07-24T09:24:06.364Z",
            distance: 12500
        },
        {
            id: 2,
            date: "2019-07-24T09:25:44.252Z",
            distance: 7500
        },
        {
            id: 3,
            date: "2018-07-24T09:35:06.654Z",
            distance: 21000
        }
    ]

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
function compare (a:any,b:any):number
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

    const classes = useStyles();

    const [rows, updateRow] = React.useState<tblRow[]>(returnTestData);

    const handleSort = (event: React.MouseEvent<unknown>, property: keyof tblRow, dir:order) => {

        console.log(property,dir)

        let sortedRows = [...rows.sort((a,b)=>{
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
                                {rows.map((row) => (
                                    <StyledTableRow key={row.id}>

                                        <TableCell >
                                            {getDayOfWeek(parseDate(row.date))}
                                            <br />
                                            {parseDate(row.date).toLocaleDateString()}
                                        </TableCell>

                                        <TableCell align="right">
                                            {formatDistance(row.distance)}
                                        </TableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <AddRowDialog />
                        

                    </Paper>
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
