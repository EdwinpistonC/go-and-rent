import Container from "@mui/material/Container";
import {
    AlojamientosPorRegion,
    AlojamientosRegistradosMensualmente,
    Pie,
    UsuariosRegistradosMensualmente
} from "../../components/atom/Charts";
import {MenuItem, Select} from "@mui/material";
import {useState} from "react";

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo",
    "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];

function getFilters(stats){
    return stats.map(function(value){
        return value.province;
    })
}

function registeredUsersPerMonth(data){
    let seriesData =
        months.map(function (value, index) {
            return 0;
        });
    //Populates current year
    data.forEach(function (value, i, data){
        if(Number(value.year) === Number("2022"))
            seriesData[value.month - 1] = value.total;
    })
    return [
        {
            name: "Usuarios registrados",
            data: seriesData
        },
        {
            name: "Usuarios huespedes",
            data: [5, 3, 1]
        },
        {
            name: "Usuarios anfitriones",
            data: [5,6, 1]
        }
    ]
}

function getAccomodations(data){
    let seriesData = data.map(function(value){
        return value.total;
    });
    return [{
        name: "Alojamientos por Región",
        data: seriesData
    }];
}

function registeredHousesPerMonth(data){
    let seriesData =
        months.map(function (value, index) {
            return 0;
        });
    //Populates current year
    data.forEach(function (value, i, data){
        if(value.year !== "2022")
            seriesData[value.month - 1] = value.total;
    })
    return [
        {
            name: "Alojamientos registrados",
            data: seriesData
        }
    ]
}

export default function Estadisticas() {
    const stats = [
        {
            "total": 11,
            "month": 4,
            "year": 2022
        },
        {
            "total": 25,
            "month": 5,
            "year": 2022
        },
        {
            "total": 33,
            "month": 6,
            "year": 2022
        }
    ];
    const series = registeredUsersPerMonth(stats);
    const housesSeries = registeredHousesPerMonth([
        {
            "total": 6,
            "year": 2022,
            "month": 4
        },
        {
            "total": 20,
            "year": 2022,
            "month": 5
        },
        {
            "total": 16,
            "year": 2022,
            "month": 6
        }
    ]);

    const accomodationsByRegion = [
        {
            "total": 6,
            "country": "Uruguay",
            "province": "Canelones",
            "city": "Lagomar"
        },
        {
            "total": 5,
            "country": "Uruguay",
            "province": "Departamento de Canelones",
            "city": "Atlántida"
        },
        {
            "total": 1,
            "country": "Uruguay",
            "province": "Departamento de Colonia",
            "city": "Colonia Del Sacramento"
        },
        {
            "total": 9,
            "country": "Uruguay",
            "province": "Departamento de Maldonado",
            "city": "Piriápolis"
        },
        {
            "total": 6,
            "country": "Uruguay",
            "province": "Departamento de Maldonado",
            "city": "Punta del Este"
        },
        {
            "total": 6,
            "country": "Uruguay",
            "province": "Departamento de Rocha",
            "city": "La Paloma"
        },
        {
            "total": 4,
            "country": "Uruguay",
            "province": "Departamento de Rocha",
            "city": "Punta del Diablo"
        },
        {
            "total": 1,
            "country": "uruguay",
            "province": "montevideo",
            "city": "montevideo"
        },
        {
            "total": 4,
            "country": "US",
            "province": "California",
            "city": "San Diego"
        }
    ];
    //const regionFilters = getFilters(accomodationsByRegion);
    //const accomodationsByReg = getAccomodations(accomodationsByRegion);
    const [province, setProvince] = useState(accomodationsByRegion[0].province);
    let provinces = accomodationsByRegion.map(function (val){
        return val.province;
    })
    provinces = [...new Set(provinces)];
    const seriesByRegion = function(province){
        let values = [];
        accomodationsByRegion.map(function(val){
            if(val.province === province){
                values.push(val.total);
            }
        })
        return [{
            name: "Alojamientos por Región",
            data: values
        }];
    }

    const labels = function(province){
        let values = [];
        accomodationsByRegion.map(function(val){
            if(val.province === province){
                values.push(val.city);
            }
        })
        return values;
    }
    let seriesData = seriesByRegion(province);
    let chartLabels = labels(province);
    let filters = provinces.map(function(val){
        return (<MenuItem value={val}>{val}</MenuItem>);
    })
    const handleChange = (event) => {
        setProvince(event.target.value);
        seriesData = seriesByRegion(province);
        chartLabels = labels(province);
        console.log(chartLabels)
    };
    return (
        <Container>
            <UsuariosRegistradosMensualmente labels={months} series={series}/>
            <AlojamientosRegistradosMensualmente labels={months} series={housesSeries}/>
            <Select
                labelId="select-region-label"
                id="select-region"
                label="Región"
                value={province}
                onChange={handleChange}
            >
                {filters}
            </Select>
            <AlojamientosPorRegion
                labels={chartLabels}
                series={seriesData}/>
        </Container>);
}