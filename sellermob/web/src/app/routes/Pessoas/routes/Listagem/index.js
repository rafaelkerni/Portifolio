import React, { useState, useEffect } from "react";
import { Fab, Tooltip, IconButton, Button, TextField } from "@material-ui/core";
import tableTranslate from "util/tableTranslate";
import moment from "moment";
import "moment/locale/pt-br";
import FilterlistIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import tableIcons from "util/tableIcons";
import axios from 'axios'

const columns = [
  { title: "ID", field: "id", editable: false },
  { title: "Nome", field: "nome" },
  { title: "E-mail", field: "email" },
  { title: "Senha", field: "senha", render: rowData => <TextField  type={'password'} id="codigo" label="Código" value={rowData.senha} onChange={e => {}} />}
]

function Pessoas(props) {
  const [filtrar, setFiltrar] = useState(false);
  const [pessoas, setPessoas] = useState([]);

  function loadPessoas() {
    try {
      const token = `bearer ${localStorage.getItem("token")}`;
      console.log(['token',token]);
      //const token = `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MX0.NTwKy1AEj8Wig50IIt6PzIIRCJutwWTaI8KO8nI3pE4`;
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .get("/pessoas")
        .then(response => {console.log(response); setPessoas(response.data.data)})
        .catch(error => console.log("error:" + error));
    } catch (err) {
      console.log("error:" + err);
    }
  }

  useEffect(() => {
    loadPessoas()
  }, [])

  const options = {
    columnsButton: true,
    doubleHorizontalScroll: true,
    emptyRowsWhenPaging: false,
    exportButton: true,
    exportFileName: `pessoas_${moment(new Date()).format("DD_MM_YYYY_HH_mm")}`,
    filtering: filtrar,
    grouping: true,
    initialPage: 10,
    pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
    showEmptyDataSourceMessage: true,
    showTextRowsSelected: true
  };

  const styles = {
    fab: {
      position: "fixed",
      bottom: 20,
      right: 20,
      backgroundColor: "#3AB44A"
    }
  };

  return (
      <div className="app-wrapper ">
        <MaterialTable
          columns={columns}
          //actions={actions}
          data={pessoas}
          title="Pessoas"
          icons={tableIcons}
          options={options}
          localization={tableTranslate}
          actions={[
            {
              icon: () => <FilterlistIcon />,
              tooltip: 'Filtrar',
              onClick: (event, rowData) =>  setFiltrar(!filtrar),
              isFreeAction: true
            },
            
          ]}
          editable={{
            isDeletable: () => true,
            onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                
              }, 1000)  
            }),
            onRowUpdate: (newData, oldData) => 
              new Promise((resolve, reject) => {
                
              }, 1000)
            ,
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {   
                
              }, 1000)
            })
        }}
        />
      </div>
  );
}

export default Pessoas;
