import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { tblRow,order } from '../commomTypes'
import { createStyles, makeStyles } from '@material-ui/core';

interface headCell {
    id: keyof tblRow;
    label: string;
    numeric: boolean;
    align: string
}


const headCells: headCell[] = [
    { id: 'date', numeric: false, label: 'Дата', align: "left" },
    { id: 'distance', numeric: true, label: 'Дистанция, м', align: 'right' },
];

interface TableHeaderProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof tblRow, dir:order) => void;
}

const TableHeader = (props:TableHeaderProps) => {

    const [sortDir,updateSortDir] = React.useState<order>('asc')
    const [sortCol,updateSortCol] = React.useState<keyof tblRow>('date')

    const { onRequestSort } = props;

    const createSortHandler = (property: keyof tblRow, dir:order) => (event: React.MouseEvent<unknown>) => {

        const isAsc = sortCol === property && sortDir === 'asc';
        
        updateSortDir(isAsc ? 'desc' : 'asc')
        updateSortCol(property)
        onRequestSort(event, property,dir);
        
      };
    

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align === "left" ? "left" : "right"}
                    >
                        <TableSortLabel
                            active={headCell.id === sortCol}
                            direction={sortDir}
                            onClick={createSortHandler(headCell.id,sortDir)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export { TableHeader }