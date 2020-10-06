import React, { useState, useEffect, useRef } from "react";
import { 
Fab, Tooltip, IconButton, 
Button, Snackbar, 
} from "@material-ui/core";
import tableTranslate from "util/tableTranslate";
import moment from "moment";
import "moment/locale/pt-br";
import FilterlistIcon from "@material-ui/icons/FilterList";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable from "material-table";
import tableIcons from "util/tableIcons";
import axios from 'axios'  
import Dropzone from "react-dropzone";
import LoadingOverlay from 'react-loading-overlay';

function Grupos(props) {
    const [filtrar, setFiltrar] = useState(false);
    const [loading, setLoading] = useState(false);
    const [grupos, setGrupos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [snack, setSnack] = useState(['', false]);

    useEffect(() => {
      const dados = JSON.parse(localStorage.getItem("data_sellermob"));
      axios.defaults.headers.common["Authorization"] = `bearer ${dados.token}`;
      getCategorias()
      loadImages()
    }, [])

    function getCategorias(){
      axios.get("/categorias").then(res => {
        let c = {};
        res.data.data.forEach(i => {
            c[i.id] = i.nome
        })
        setCategorias(c)
      }).catch(res => {
        console.log(res);
        if(res.response){
          setSnack([res.response.data, true])
        }else{
          setSnack(['Ocorreu um erro ao obter os dados!', true])
        }
      })
    }

    function loadImages(){
      axios.get("/grupos").then(res => {
        setGrupos(res.data.data)
      }).catch(res => {
        if(res.response){
          setSnack([res.response.data, true])
        }else{
          setSnack(['Ocorreu um erro ao obter os dados!', true])
        }
      })
    }

    function setData(grupo){
      axios.post("/grupos", grupo).then(res => {
        loadImages();
      }).catch(res => {
        if(res.response){
          setSnack([res.response.data, true])
        }else{
          setSnack(['Ocorreu um erro ao inserir os dados!', true])
        }
      })
    }
    
    function alterData(grupo){
      axios.put(`/grupos/${grupo.id}`, grupo).then(res => {
        loadImages();
      }).catch(res => {
        if(res.response){
          setSnack([res.response.data, true])
        }else{
          setSnack(['Ocorreu um erro ao alterar os dados!', true])
        }
      })
    }

    function deleteData(id){
      axios.delete(`/grupos`).then(res => {
        loadImages();
      }).catch(res => {
        if(res.response){
          setSnack([res.response.data, true])
        }else{
          setSnack(['Ocorreu um erro ao deletar os dados!', true])
        }
      })
    }

    function enviarFotos(acceptedFiles, id) {
      if(!id || id <= 0){
        setSnack(['Grupo sem ID, termine de editar o grupo para depois enviar a imagem!', true])
      }else{  
          let data = new FormData();
          data.append("image", acceptedFiles[0]);
          axios
          .post(axios.defaults.baseURL + `/imagem_grupos/${id}`, data, {
            headers: {"Content-Type": "multipart/form-data"}
          })
          .then(resp => {
            loadImages()
          })
          .catch(err => {
            loadImages()
            console.log("err", err);
          });
      }
    }

    const columns = [
        { title: "ID", field: "id", editable: 'never' },
        { title: "Grupo", field: "nome" },
        { title: "Categoria", field: "categoria_id", lookup: categorias},
        { title: "Imagem", field: "imagem", editable: 'never', filtering: false, grouping: false, disableClick: true,
          render: rowData => <div>
            <Dropzone onDrop={acceptedFiles => enviarFotos(acceptedFiles, !rowData ? 0 : rowData.id)}  multiple={false} >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    {!rowData || rowData.imagem === null ? 
                    <p style={{ marginTop: 15, marginBottom: 15,  padding: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#000' }}>
                      Arraste aqui a imagem, ou clique para selecionar...
                    </p> : 
                    <img src={!rowData || !rowData.imagem === null ? ''  : `${axios.defaults.baseURL}/static/${rowData.imagem}`} style={{width: 100}}/> }
                  </div>
                </section>
              )}
            </Dropzone>    
          </div>
        },
      ];

      const options = {
        columnsButton: true,
        doubleHorizontalScroll: true,
        emptyRowsWhenPaging: false,
        exportButton: true,
        exportFileName: `sellermob_grupos_${moment(new Date()).format("DD_MM_YYYY_HH_mm")}`,
        filtering: filtrar,
        grouping: false,
        initialPage: 10,
        pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
        showEmptyDataSourceMessage: true,
        showTextRowsSelected: true
      };

    return (
        <div className="app-wrapper ">
        <LoadingOverlay text={'Carregando...'} spinner={true} active={loading}>
        <MaterialTable
          columns={columns}
          data={grupos}
          title="Grupos"
          icons={tableIcons}
          options={options}
          localization={tableTranslate}
          //onRowClick={(event, rowData) => props.history.push(`/app/grupos/${rowData.id}/produtos`)}
          actions={[
            {
              icon: () => <FilterlistIcon />,
              tooltip: 'Filtrar',
              onClick: (event, rowData) =>  setFiltrar(!filtrar),
              isFreeAction: true
            },
            
          ]}
          editable={{ 
            isEditable: rowData => true,
            isDeletable: rowData => true,
            onRowAdd: newData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    setData(newData);
                    resolve()
                  }, 1000)  
                }),
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {
                    alterData(newData);
                    resolve()
                  }, 1000)  
                }),
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
        </LoadingOverlay>
      </div>
    );
}

export default Grupos;