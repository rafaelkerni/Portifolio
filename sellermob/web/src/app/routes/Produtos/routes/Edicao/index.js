import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Avatar,
  Checkbox,
  ListItemText,
  TextField,
  Snackbar,
  IconButton
} from "@material-ui/core";
import InfoCard from "components/InfoCard/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from '@material-ui/icons/Close';
import MaterialTable, { MTableToolbar } from "material-table";
import moment from "moment";
import "moment/locale/pt-br";
import { KeyboardDatePicker } from "@material-ui/pickers";
import ContainerHeader from "components/ContainerHeader/index";
import tableIcons from "util/tableIcons";
import tableTranslate from "util/tableTranslate";
import FilterlistIcon from "@material-ui/icons/FilterList";
import Gallery from "react-grid-gallery";
import axios from "axios";
import { WithContext as ReactTags } from 'react-tag-input';

import Dropzone from "react-dropzone";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddBox from '@material-ui/icons/AddBox';
import LoadingOverlay from 'react-loading-overlay';

import "./reactTags.css";

function ProdutosEdicao(props) {
  const [produto, setProduto] = useState(null);
  const [grupos, setGrupos] = useState([]);
  const [snack, setSnack] = useState(['', false]);
  const [dialolgDeletar, setDialolgDeletar] = useState(false);
  const [adicionando, setAdicionando] = useState(false);
  const [campos, setCampos] = useState([]);
  const [filtrar, setFiltrar] = useState(false);
  const [detalhes, setDetalhes] = useState([]);
  const [loading, setLoading] = useState(false);

  const suggestions = [
      { id: 'CÓDIGO', field: 'CÓDIGO', title: "CÓDIGO" },
      { id: 'MEDIDA_/_mm', field: 'MEDIDA / mm', title: "MEDIDA / mm" },
      { id: 'EMBALAGEM', field: 'EMBALAGEM', title: "EMBALAGEM" },
  ];

  const KeyCodes = {
    comma: 188,
    enter: 13,
  };
  
  const options = {
    columnsButton: true,
    doubleHorizontalScroll: true,
    emptyRowsWhenPaging: false,
    exportButton: true,
    exportFileName: `sellermob_produto_detalhes_${moment(new Date()).format(
      "DD_MM_YYYY_HH_mm"
    )}`,
    filtering: filtrar,
    grouping: true,
    initialPage: 10,
    pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
    showEmptyDataSourceMessage: true,
    showTextRowsSelected: true
  };

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("data_sellermob"));
    axios.defaults.headers.common["Authorization"] = `bearer ${dados.token}`;
    loadGrupos();
    if (props.match.params.id > 0) {
      loadProdutos(props.match.params.id);
    }else{
      setAdicionando(true);
    }
  }, []);

  function loadProdutos(id) {
    try {
      axios
        .get(`/produtos/${id}`)
        .then(response => {
          setProduto(response.data.data);
          setCampos(JSON.parse(response.data.data.campos))
          setDetalhes(JSON.parse(response.data.data.detalhes))
        })
        .catch(error => {
          setSnack([error, true])
        });
    } catch (err) {
      console.log("error:" + err);
    }
  }

  function loadGrupos(){
    setLoading(true)
    axios.get("/grupos").then(res => {
      setGrupos(res.data.data)
      console.log(res.data.data)
    }).catch(res => {
      setLoading(false)
      if(res.response){
        setSnack([res.response.data, true])
      }else{
        setSnack(['Ocorreu um erro ao obter os dados!', true])
      }
    })
  }

  function salvarProduto() {
    if (adicionando) {
      try {
        axios
          .post(`/produtos`, {...produto, campos: JSON.stringify(campos), detalhes: JSON.stringify(detalhes)} )
          .then(response => {
            props.history.push(`/app/produtos/`)
          })
          .catch(error => {
            setSnack([error, true])
          });
      } catch (error) {
        setSnack([error, true])
      }   
    } else {
      try {
        axios
          .put(`/produtos/${produto.id}`, {...produto, campos: JSON.stringify(campos), detalhes: JSON.stringify(detalhes)})
          .then(response => {
            props.history.push(`/app/produtos/`)
          })
          .catch(error => {
            setSnack([error, true])
          });
      } catch (error) {
        setSnack([error, true])
      }
    }
  }

  function deleteProduto() {
    try {
      setDialolgDeletar(false);
      const token = `bearer ${localStorage.getItem("4sd_solo_fifo_token")}`;
      axios.defaults.headers.common["Authorization"] = token;
      axios
        .delete(`/produtos/${produto.id}`)
        .then(response => {
          props.history.push(`/app/produtos/`)
        })
        .catch(error => {
          setSnack([error, true])
        });
    } catch (error) {
      setSnack([error, true])
    }
  }

  function enviarFotos(acceptedFiles, id) {
    if(!id || id <= 0){
      setSnack(['Produto sem ID, salve o produto para depois enviar a imagem!', true])
    }else{  
       setLoading(true)
        let data = new FormData();
        data.append("image", acceptedFiles[0]);
        axios
        .post(axios.defaults.baseURL + `/imagem_produtos/${id}`, data, {
          headers: {"Content-Type": "multipart/form-data"}
        })
        .then(resp => {
          setLoading(false)
          loadProdutos(id)
        })
        .catch(err => {
          setLoading(false)
          console.log("err", err);
        });
    }
  }

  return (
    <div>
      {/* <LoadingOverlay text={'Carregando...'} spinner={true} active={loading}> */}
      <ContainerHeader
        match={props.match}
        title={
          adicionando ? "Novo Produto" : !produto ? "" : `${produto.codigo} - ${produto.nome}`
        }
      />
      <div className="app-wrapper pt-0">
        <div className="row ">
          <div className="row pb-3 px-4">
            <Button
              variant="contained"
              color="primary"
              className="pr-2 mr-1"
              onClick={() => salvarProduto()}
            >
              Gravar
              <DoneIcon className="ml-1" />
            </Button>

            <Button
              variant="contained"
              color="primary"
              className="pr-2 mr-1"
              onClick={() => props.history.push(`/app/produtos/`)}
            >
              Cancelar
              <ClearIcon className="ml-1" />
            </Button>

            <Button
              variant="contained"
              color="primary"
              className="pr-2 mr-1"
              onClick={() => setDialolgDeletar(true)}
            >
              Deletar
              <DeleteIcon className="ml-1" />
            </Button>
            <Dialog
              open={dialolgDeletar}
              onClose={() => setDialolgDeletar(false)}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Deletar Produto"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {!produto
                    ? `Tem certeza que deseja deletar o produto?`
                    : ` Tem certeza que deseja deletar o produto ${produto.id} - ${produto.descricao}?`}
                  `
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setDialolgDeletar(false)}
                  color="primary"
                >
                  NÂO
                </Button>
                <Button
                  onClick={() => deleteProduto()}
                  color="primary"
                  autoFocus
                >
                  SIM
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <div
            className="card jr-card-intra shadow text-center w-100 m-2"
            style={{ minHeight: "170px" }}
          >
            <div className="card-header pt-3 pb-2 d-flex align-items-center">
              <h3 className="mb-0">Dados</h3>
            </div>
            <div className="row">
              <div className="col-xl-11 h-25 ml-4 pb-4">
                <div className="row">
                  <div className="col-xl-2">
                    <TextField
                      id="codigo"
                      label="Código"
                      value={
                        !produto
                          ? ""
                          : `${!produto.codigo ? "" : produto.codigo}`
                      }
                      onChange={e =>
                        setProduto({ ...produto, codigo: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-xl-2">
                    <FormControl className="w-100">
                      <InputLabel htmlFor="name-multiple">Situação</InputLabel>
                      <Select
                        value={
                          !produto
                            ? ""
                            : `${!produto.situacao ? '' : produto.situacao}`
                        }
                        onChange={event =>
                          setProduto({
                            ...produto,
                            situacao: event.target.value
                          })
                        }
                        MenuProps={{  
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 200
                            }
                          }
                        }}
                      >
                        <MenuItem key={1} value={1}>
                          Ativo
                        </MenuItem>
                        <MenuItem key={0} value={0}>
                          Inativo
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>

                  <div className="col-xl-4">
                    <FormControl className="w-100">
                      <InputLabel htmlFor="name-multiple">Grupo</InputLabel>
                      <Select
                        value={
                          !produto
                            ? ""
                            : `${!produto.grupo_id ? 0 : produto.grupo_id}`
                        }
                        onChange={event =>
                          setProduto({
                            ...produto,
                            grupo_id: event.target.value
                          })
                        }
                        MenuProps={{  
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 200
                            }
                          }
                        }}
                      >
                        {grupos.map(item => 
                           <MenuItem key={item.id} value={item.id}>
                           {item.nome}
                          </MenuItem>
                        )}
                      </Select>
                    </FormControl>
                  </div>

                  
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <TextField
                      id="nome"
                      label="Nome"
                      className="w-100"
                      style={{ marginTop: 5 }}
                      value={
                        !produto
                          ? ""
                          : `${!produto.nome ? "" : produto.nome}`
                      }
                      onChange={e =>
                        setProduto({ ...produto, nome: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <TextField
                      id="descricao"
                      label="Descrição"
                      className="w-100"
                      style={{ marginTop: 5 }}
                      multiline
                      rows="4"
                      value={
                        !produto
                          ? ""
                          : `${!produto.descricao ? "" : produto.descricao}`
                      }
                      onChange={e =>
                        setProduto({ ...produto, descricao: e.target.value })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="card jr-card-intra shadow text-center w-100 m-2"
            style={{ minHeight: "170px" }}
          >
            <MaterialTable   
              columns={campos}
              data={detalhes}
              title="Detalhes"
              icons={tableIcons}
              options={options}
              localization={tableTranslate}
              components={{
                Toolbar: props => (
                  <div>
                    <MTableToolbar {...props} />
                    <div className="row" style={{ marginBottom: 35 }}>
                    <div style={{ fontWeight: "bold", marginTop: 6, marginLeft: 25, marginRight: 10  }}>Campos:</div>
                      <ReactTags 
                        tags={campos}
                        suggestions={suggestions}
                        handleDelete={c => setCampos(campos.filter((tag, index) => index !== c))}
                        handleAddition={c => setCampos([...campos, { ...c, title: c.field }])}
                        allowDragDrop={false}
                        autofocus={false}
                        autocomplete={1}
                        placeholder={"Adicionar Campo"}
                        labelField={'field'}
                      />
                    </div>
                  </div>
                ),
              }}
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
                      let newArray = detalhes;
                      if(newArray){
                        newArray = [...newArray, newData];
                      }else{
                        newArray = [newData];
                      }
                      setDetalhes(newArray);
                      resolve()
                  }, 1000)  
                }),
                onRowUpdate: (newData, oldData) => 
                  new Promise((resolve, reject) => {
                    setTimeout(() => {   
                    let newArray = detalhes;
                    const index = newArray.indexOf(oldData);
                    newArray[index] = newData;
                    //GAMBITO: Seto pra em branco pq se não não atualiza a tabela
                    setDetalhes([]);
                    setDetalhes(newArray);
                    resolve(false) 
                  }, 1000)
                }),
                onRowDelete: oldData =>
                new Promise((resolve, reject) => {
                  setTimeout(() => {   
                    let newArray = detalhes;
                    newArray.splice( newArray.indexOf(oldData), 1 );
                    //GAMBITO: Seto pra em branco pq se não não atualiza a tabela
                    setDetalhes([]);
                    setDetalhes(newArray);
                    resolve(false) 
                  }, 1000)
                })
            }}
            />
          </div>

          <div
            className="card jr-card-intra shadow text-center w-100 m-2"
            style={{ minHeight: "160px" }}
          >
            <div className="card-header pt-3 pb-2 d-flex align-items-center">
              <h3 className="mb-0">Imagem</h3>
            </div>
            <Dropzone onDrop={acceptedFiles => enviarFotos(acceptedFiles, produto.id)}  multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p style={{ margin: 25, padding: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#000' }}>
                      Arraste aqui a imagem, ou clique para selecionar...
                    </p>
                    {!produto || !produto.imagem ? false : <img src={`${axios.defaults.baseURL}/static/${produto.imagem}`} style={{ maxWidth: 500}}/> }
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={snack[1]}
        autoHideDuration={6000}
        onClose={() => setSnack(['', false])}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{JSON.stringify(snack[0])}</span>}
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
      {/* </LoadingOverlay> */}
    </div>
  );
}

const styles = {
  images: {
    width: "auto",
    height: "35px",
    cursor: "pointer"
  },
  tag: {
    display: "inline",
    padding: ".2em .6em .3em",
    fontSize: "75%",
    fontWeight: "600",
    lineHeight: "1",
    color: "#FFFFFF",
    background: "rgba(0,0,0,0.65)",
    textAlign: "center",
    whiteSpace: "nowrap",
    verticalAlign: "baseline",
    borderRadius: ".25em"
  }
};

export default ProdutosEdicao;
