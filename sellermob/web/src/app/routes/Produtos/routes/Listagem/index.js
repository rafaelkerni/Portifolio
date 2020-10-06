import React, { useState, useEffect } from "react";
import { Fab, Tooltip, IconButton, Button, Snackbar } from "@material-ui/core";
import tableTranslate from "util/tableTranslate";
import moment from "moment";
import "moment/locale/pt-br";
import FilterlistIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from "@material-ui/icons/Edit";
import MaterialTable from "material-table";
import tableIcons from "util/tableIcons";
import axios from 'axios'
import { formataMoedaCom } from 'util/Funcoes';
import AddBox from '@material-ui/icons/AddBox';

const columns = [
  { title: "ID", field: "id" },
  { title: "Código", field: "codigo" },
  { title: "Nome", field: "nome" },
  { title: "Situacao", field: "situacao", lookup: {1: "Ativo", 0:"Inativo"} },
];

function ProdutosListagem(props) {
  const [filtrar, setFiltrar] = useState(false);
  const [produtos, setProdutos] = useState([]);
  const [snack, setSnack] = useState(['', false]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("data_sellermob"));
    axios.defaults.headers.common["Authorization"] = `bearer ${dados.token}`;
    loadImages()
  }, [])

  function loadImages(){
    axios.get("/produtos").then(res => {
      setProdutos(res.data.data)
    }).catch(res => {
      if(res.response){
        setSnack([res.response.data, true])
      }else{
        setSnack(['Ocorreu um erro ao obter os produtos!', true])
      }
    })
  }

  function deleteData(id){
    axios.delete(`/produtos/${id}`).then(res => {
      loadImages();
    }).catch(res => {
      if(res.response){
        setSnack([res.response.data, true])
      }else{
        setSnack(['Ocorreu um erro ao deletar os dados!', true])
      }
    })
  }

  const options = {
    columnsButton: true,
    doubleHorizontalScroll: true,
    emptyRowsWhenPaging: false,
    exportButton: true,
    exportFileName: `sellermob__produtos_${moment(new Date()).format("DD_MM_YYYY_HH_mm")}`,
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
          data={produtos}
          title="Produtos"
          icons={tableIcons}
          options={options}
          localization={tableTranslate}
          actions={[
            {
              icon: () => <EditIcon />,
              tooltip: 'Editar',
              onClick: (event, rowData) => props.history.push(`/app/produtos/${rowData.id}/edicao`)
            },
            {
              icon: () => <FilterlistIcon />,
              tooltip: 'Filtrar',
              onClick: (event, rowData) =>  setFiltrar(!filtrar),
              isFreeAction: true
            },
            {
              icon: () => <AddBox />,
              tooltip: 'Adicionar',
              isFreeAction: true,
              onClick: (event) => props.history.push(`/app/produtos/0/edicao`)
            }
          ]}
          editable={{
            isDeletable: () => true,
            onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                deleteData(oldData.id);
                resolve()
              }, 1000) 
            })
        }}
        />
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={snack[1]}
          autoHideDuration={6000}
          onClose={() => setSnack(['', false])}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{snack[0]}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => setSnack(['', false])}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
  );
}

export default ProdutosListagem;
