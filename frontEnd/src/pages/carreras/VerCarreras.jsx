import React, { useState, useEffect } from "react";
import QuickFilteringGrid from "../../components/common/DataGrid";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

const VerCarreras = () => {

  const [carreras, setCarreras] = useState([]); // cargar carreras desde el contrato!
  const [carreraElegida, setCarreraElegida] = useState();

  const columns = [
    { field: "id", headerName: "Codigo", width: 200 },
    {
      field: "participantes",
      headerName: "Participantes",
      sortable: true,
      width: 300,
    },
    {
      field: "precio",
      headerName: "Precio",
      sortable: true,
      width: 200,
    },
    { field: "estado", headerName: "Estado", sortable: false, width: 200 },
    {
      field: "acciones",
      headerName: "",
      sortable: false,
      width: 150,
      renderCell: (params) => {
        const onVerCarreraHandler = (event) => {
          event.preventDefault();
          setCarreraElegida(params.row.carreraElegida);
          history.push({
            pathname: "/ver-carrera",
            state: {
              codigoCarrera: params.row.id,
            },
          });
        };
      }
    }
  ];

  // cargar carreras:
  async function getHorsesByOwner(owner) {
    const provider = new ethers.providers.InfuraProvider('ropsten', '62a26547e82949f0baf003bf5b20e627');
    const wallet = ethers.Wallet.fromMnemonic('snap slender trap leopard web wasp typical hobby panther once tattoo just').connect(provider);
    let contractWithSigner = horseRaceContract.connect(wallet);
  
    // ver errores en browser y arreglar las interacciones con la testnet para cada operacion
    await contractWithSigner.getHorsesByOwner(currentAccount)
      .then((horses) => { displayHorses(horses) })
      .catch( (error) => { console.log(error) })
  }

  async function createHorse(name) {
    const horse = await horseRaceContract.createRandomHorse(horseName);
    return horse
  }

  const handleSubmit = (e) => {
    const { horseName } = formData;
    console.log('Creando caballo');
    createHorse(horseName);
  }

  var accountInterval = setInterval(async function () {
    getHorsesByOwner(currentAccount);
  }, 1000);
  // cargar carreras

  useEffect(() => {
    fetch("https://modulo-proyectos-squad7.herokuapp.com/proyectos")
      .then((res) => res.json())
      .then((data) => {
        setCarreras(data);
      });
  }, []);

  // escuchar eventos de Race para mostrar si una carrera donde participo el usuario se corrio
  // horseRaceContract.events.Race({ filter: { _to: userAccount } })
  //   .on("data", function (event) {
  //     let data = event.returnValues;
  //     getHorsesByOwner(userAccount).then(displayhorses);
  //   }).on("error", console.error);


return (
  <>
    <div style={{ padding: 40, textAlign: 'left' }}><h1 style={{ fontSize: 25, fontWeight: 'bold' }}>Carreras disponibles en este momento: </h1></div>
    <div style={{ padding: 16, margin: "auto" }}>
      <div style={{ float: "right" }}>
        <Button
          variant="contained"
          style={{ right: 0, marginLeft: 16 }}
          color="primary"
          size="small"
          onClick={() => history.push("/crear-carrera")}
        >
          Crear Carrera
        </Button>
      </div>
      <div style={{ marginTop: 40 }}>
        <QuickFilteringGrid data={carreras} columns={columns} />
      </div>
    </div>

  </>
)
};

export default VerCarreras;
