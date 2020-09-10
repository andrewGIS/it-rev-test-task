import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { tblRow, order } from '../commomTypes';

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
    orderDir: order,
    orderBy: keyof tblRow,
    onRequestSort: (event: React.MouseEvent<unknown>, 
         property: keyof tblRow, 
         dir:order) => void;
}

const TableHeader: React.FC<TableHeaderProps> = (

    { orderDir, orderBy,onRequestSort }) => {

    const createSortHandler = (property: keyof tblRow, dir: order) => (event: React.MouseEvent<unknown>) => {

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
                            active={headCell.id === orderBy}
                            direction={orderDir}
                            onClick={createSortHandler(headCell.id,orderDir)}
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