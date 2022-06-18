import Container from "@mui/material/Container";
import {
  AlojamientosPorRegion,
  AlojamientosRegistradosMensualmente,
  Pie,
  StatusAnfitriones,
  UsuariosRegistradosMensualmente,
} from "../../components/atom/Charts";
import { MenuItem, Select } from "@mui/material";
import { useState } from "react";
import Api from "../../server/Api";

const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Setiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

function getFilters(stats) {
  return stats.map(function (value) {
    return value.province;
  });
}

function registeredUsersPerMonth(data) {
  let hostsData = months.map(function (value, index) {
    return 0;
  });

  //Populates current year
  data.forEach(function (value, i, data) {
    if (value.role !== "HOST") return;
    if (Number(value.year) === Number("2022"))
      hostsData[value.month - 1] = value.total;
  });

  let guestsData = months.map(function (value, index) {
    return 0;
  });
  //Populates current year
  data.forEach(function (value, i, data) {
    if (value.role !== "GUEST") return;
    if (Number(value.year) === Number("2022"))
      guestsData[value.month - 1] = value.total;
  });

  return [
    {
      name: "Usuarios anfitriones",
      data: hostsData,
    },
    {
      name: "Usuarios huespedes",
      data: guestsData,
    },
  ];
}

function getAccomodations(data) {
  let seriesData = data.map(function (value) {
    return value.total;
  });
  return [
    {
      name: "Alojamientos por Región",
      data: seriesData,
    },
  ];
}

function registeredHousesPerMonth(data) {
  let seriesData = months.map(function (value, index) {
    return 0;
  });
  //Populates current year
  data.forEach(function (value, i, data) {
    if (value.year !== "2022") seriesData[value.month - 1] = value.total;
  });
  return [
    {
      name: "Alojamientos registrados",
      data: seriesData,
    },
  ];
}

function statusHostPerMonth(data) {
  let deletedData = months.map(function (value, index) {
    return 0;
  });
  let blockedData = months.map(function (value, index) {
    return 0;
  });
  let acceptedData = months.map(function (value, index) {
    return 0;
  });
  data.forEach(function (value, i, data) {
    if (Number(value.year) === Number("2022")) {
      if (Number(value.status) === 3)
        //Rejected
        deletedData[value.month - 1] = value.total;
      if (Number(value.status) === 2)
        //Blocked
        blockedData[value.month - 1] = value.total;
      if (Number(value.status) === 0)
        //Accepted
        acceptedData[value.month - 1] = value.total;
    }
  });
  return [
    {
      name: "Anfitriones Eliminados",
      data: deletedData,
    },
    {
      name: "Anfitriones Bloqueados",
      data: blockedData,
    },
    {
      name: "Anfitriones Aceptados",
      data: acceptedData,
    },
  ];
}

export default function Estadisticas() {
  const api = new Api();
  const [accomodationsByRegion, setAccomodationsByRegion] = useState([]);
  const [province, setProvince] = useState("");
  const [usersSeries, setUsersSeries] = useState([]);
  const [accomodations, setAccomodations] = useState([]);
  const [hostsRegistered, setHostsRegistered] = useState([]);

  const getStats = async () => {
    let data = await api.obtenerEstadisticas();
    setAccomodationsByRegion(data.accommodationsByRegion);
    setProvince(data.accommodationsByRegion[0].province);
    setUsersSeries(data.registeredUsersPerMonth);
    setAccomodations(data.accommodatiosRegisteredPerMonth);
    setHostsRegistered(data.hostConfirmedRefusedList);
    return data;
  };

  if (accomodationsByRegion.length == 0) getStats();

  let provinces = accomodationsByRegion.map(function (val) {
    return val.province;
  });
  provinces = [...new Set(provinces)];

  const AlojamientosPorRegionWrapper = () => {
    if (accomodationsByRegion.length == 0) return <></>;
    let filters = provinces.map(function (val) {
      return (
        <MenuItem value={val} key={val}>
          {val}
        </MenuItem>
      );
    });
    const getLabels = function (province) {
      let values = [];
      accomodationsByRegion.map(function (val) {
        if (val.province === province) {
          values.push(val.city);
        }
      });
      return values;
    };
    const seriesByRegion = function (province) {
      let values = [];
      accomodationsByRegion.map(function (val) {
        if (val.province === province) {
          values.push(val.total);
        }
      });
      return [
        {
          name: "Alojamientos por Región",
          data: values,
        },
      ];
    };
    let chartLabels = getLabels(province);
    let seriesData = seriesByRegion(province);
    const handleChange = (event) => {
      setProvince(event.target.value);
      seriesData = seriesByRegion(province);
      chartLabels = getLabels(province);
    };

    return (
      <>
        <Select
          labelId="select-region-label"
          id="select-region"
          label="Región"
          value={province}
          onChange={handleChange}
        >
          {filters}
        </Select>
        <AlojamientosPorRegion labels={chartLabels} series={seriesData} />
      </>
    );
  };

  const UsuariosRegistradosWrapper = () => {
    if (usersSeries.length === 0) {
      return <></>;
    }
    const series = registeredUsersPerMonth(usersSeries);
    return (
      <>
        <UsuariosRegistradosMensualmente labels={months} series={series} />
      </>
    );
  };

  const AlojamientosRegistradosMensualmenteWrapper = () => {
    if (accomodations.length === 0) {
      return <></>;
    }
    const housesSeries = registeredHousesPerMonth(accomodations);
    return (
      <>
        <AlojamientosRegistradosMensualmente
          labels={months}
          series={housesSeries}
        />
      </>
    );
  };

  const AnfitrionesWrapper = () => {
    if (hostsRegistered.length === 0) {
      return <></>;
    }
    const labels = ["Eliminado", "Bloqueado", "Aceptado"];
    const series = statusHostPerMonth(hostsRegistered);
    return (
      <>
        <StatusAnfitriones labels={months} series={series}></StatusAnfitriones>
      </>
    );
  };

  return (
    <Container>
      <AlojamientosRegistradosMensualmenteWrapper></AlojamientosRegistradosMensualmenteWrapper>
      <UsuariosRegistradosWrapper></UsuariosRegistradosWrapper>
      <AlojamientosPorRegionWrapper></AlojamientosPorRegionWrapper>
      <AnfitrionesWrapper></AnfitrionesWrapper>
    </Container>
  );
}
