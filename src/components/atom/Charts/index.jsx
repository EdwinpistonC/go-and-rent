import Chart from 'react-apexcharts';
import {useState} from "react";
import {MenuItem, Select} from "@mui/material";

function Pie(){
    const [options, setOptions] = useState({
        "labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        theme: {
            monochrome: {
                enabled: true
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5
                }
            }
        },
        title: {
            text: "Monochrome Pie"
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: false
        }
    });
    const [series, setSeries] = useState([44, 55, 41, 17, 15]);
    return (
        <>
            <div className="donut">
                <Chart options={options} series={series} type="donut" width="380" />
            </div>
            <button onClick={ () => setSeries([14, 25, 51, 15, 35])}>Update</button>
        </>
    );
}

function UsuariosRegistradosMensualmente(props){
    const [options, setOptions] = useState({
        "labels": props.labels,
        chart: {
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        }
    });
    return (
        <>
            <div className="donut">
                <Chart options={options} series={props.series} type="bar" width="500" />
            </div>
        </>
    );
}

function AlojamientosRegistradosMensualmente(props){
    const [options, setOptions] = useState({
        "labels": props.labels,
        chart: {
            type: 'bar'
        },
        plotOptions: {
            bar: {
                horizontal: false
            }
        }
    });
    return (
        <>
            <div className="donut">
                <Chart options={options} series={props.series} type="bar" width="500" />
            </div>
        </>
    );
}

function AlojamientosPorRegion(props){
    let options = {
        "labels": props.labels,
        chart: {
        type: 'bar'
    },
        plotOptions: {
            bar: {
                horizontal: false
            }
        }
    }

    return (
        <>
            <div className="donut">
                <Chart options={options} series={props.series} type="bar" width="500" />
            </div>
        </>
    );
}

export {Pie, UsuariosRegistradosMensualmente, AlojamientosRegistradosMensualmente, AlojamientosPorRegion};