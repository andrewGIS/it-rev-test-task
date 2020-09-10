import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux'
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js'
import { useSelector } from 'react-redux';
import { TableState } from '../store/table/reducer';
import Paper from '@material-ui/core/Paper';

export const Graphic: React.FC = () => {

    const chartContainer = useRef(null);
    //const myChartRef = chartRef.current.getContext("2d");
    const getData = () => {
        return tblData.map(row => row.distance)
    }

    const tblData = useSelector((state: TableState) => state.tableRows)

    const [barValues, setBarValues] = useState<number[]>([])

    const [barData, setBarData] = useState({
        labels: [""],
        datasets: [
            {
                data: getData(),
                // borderWidth: 3
                fill: false,
            }
        ]
    });
    const [barOptions, setBarOptions] = useState<ChartOptions>({

        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: false
                    },
                    gridLines: {
                        display: false
                    }
                }
            ]
        },
        title: {
            display: true,
            text: 'Суммарная активность',
            fontSize: 25
        },
        legend: {
            display: false,
            position: 'top'
        },
        responsive: true

    });

    const dateToLabel = (inDate: string):string => {
        let date = new Date(inDate) 
        return date.toLocaleDateString()
    }

    useEffect(() => {
        let obj = { ...barData }
        obj.labels = tblData.map(row => dateToLabel(row.date))
        obj.datasets[0].data = tblData.map(row => row.distance)
        setBarData(obj)
    }, [tblData])

    return (
        <div style={{position:'relative', height:'100%'}}>
            <Line data={barData} options={barOptions}></Line>
            <div style={{ 
                height: '50px', 
                backgroundColor: 'black',
                color:'white' ,
                display:'flex',
                verticalAlign:'middle'
                }}>
                Максимум: {Math.max(...tblData.map(row => row.distance))} метров Минимум: {Math.min(...tblData.map(row => row.distance))} метров
            </div>
        </div>


    )
}