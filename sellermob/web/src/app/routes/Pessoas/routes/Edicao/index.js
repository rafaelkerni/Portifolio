import React, { useState, useEffect } from "react";
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
} from "@material-ui/core";
import InfoCard from "components/InfoCard/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import DeleteIcon from "@material-ui/icons/Delete";
import MaterialTable, { MTableHeader } from "material-table";
import moment from "moment";
import "moment/locale/pt-br";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as data from "./data";
import CardPedidos from "components/CardPedidos";
import ContainerHeader from "components/ContainerHeader/index";
import tableIcons from "util/tableIcons";
import tableTranslate from "util/tableTranslate";
import FilterlistIcon from "@material-ui/icons/FilterList";

const enderecos = [{}];

const styles = {
  heading: {
    fontSize: 15,
    marginRight: 10
  },
  bigAvatar: {
    width: 70,
    height: 70
  }
};

const tipos = ["Entregador", "Vendedor", "Cliente", "Fornecedor"];

const MockupEnderecos = [
  {tipo: "residencial", principal: true, logradouro: "Rua Presidente Getúlio Vargas", numero: "456", complemento: "", cidade: "bento_goncalves", bairro: "centro", uf: "RS", pais: "BR" }
]

const columnsEndereco = [
  { title: "Tipo", field: "tipo", lookup: { residencial: "Residencial", comercial:"Comercial", centro_de_entrega: "Centro de Entrega"} },
  { title: "Principal", field: "principal", type: "boolean" },
  { title: "Logradouro", field: "logradouro" },
  { title: "Número", field: "numero" },
  { title: "Complemento", field: "complemento" },
  { title: "Cidade", field: "cidade", lookup: { bento_goncalves: "Bento Gonçalves", carlos_barbosa:"Carlos Barbosa", garibaldi: "Garibaldi"} },
  { title: "Bairro", field: "bairro", lookup: { centro: "Centro", vitoria:"Vitória", ponte_seca: "Ponte Seca"} },
  { title: "UF", field: "uf", lookup: { RS: "RS", SC:"SC", PR: "PR"} },
  { title: "País", field: "pais", lookup: { BR: "Brasil", AR:"Argentina", UR: "Uruguai"}  },
];

const columnsContatos = [
  { title: "Tipo", field: "tipo", lookup: {email:"E-mail", fone:"Fone"} },
  { title: "Contato", field: "contato" },
];


const MockupContatos = [
  { tipo: 'fone', contato: "(00) 0000-0000" },
  { tipo: 'email', contato: "email@email.com" },
]

function PessoasEdicao(props) {
  const [situacao, setSituacao] = useState([]);
  const [pessoa, setPessoa] = useState([]);
  const [tipo, setTipo] = useState([]);
  const [CPF, setCPF] = useState("");
  const [RG, setRG] = useState("");
  const [nome, setNome] = useState("");
  const [fantasia, setFantasia] = useState("");
  const [filtrar, setFiltrar] = useState(false);
  const [enderecos, setEnderecos] = useState(MockupEnderecos);
  const [contatos, setContatos] = useState(MockupContatos);
  const [placeholder, setPlaceHolder] = useState([]);

  const options = {
    columnsButton: true,
    doubleHorizontalScroll: false,
    emptyRowsWhenPaging: false,
    exportButton: true,
    exportFileName: `pessoas_${moment(new Date()).format(
      "DD_MM_YYYY_HH_mm"
    )}.csv`,
    filtering: false,
    grouping: false,
    initialPage: 10,
    pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
    showEmptyDataSourceMessage: true,
    showTextRowsSelected: true
  };

  return (
    <div>
      <ContainerHeader
        match={props.match}
        title="Pessoa - #451"
      />
      <div className="app-wrapper pt-0">
        <div className="row ">
          <div className="row pb-3 px-4">
            <Button variant="contained" color="secondary" className="pr-2 mr-1">
              Gravar
              <DoneIcon className="ml-1" />
            </Button>

            <Button variant="contained" color="secondary" className="pr-2 mr-1">
              Cancelar
              <ClearIcon className="ml-1" />
            </Button>

            <Button variant="contained" color="secondary" className="pr-2 mr-1">
              Deletar
              <DeleteIcon className="ml-1" />
            </Button>
          </div>
          <div
            className="card jr-card-intra shadow text-center w-100 m-2"
            style={{ minHeight: "170px" }}
          >
            <div className="card-header pt-3 pb-2 d-flex align-items-center">
              <h3 className="mb-0">Dados</h3>
            </div>
            <div className="row">
              <div className="col-xl-1" align="center">
                <Typography>Foto/Logo</Typography>
                <div className="col-xl-12 mt-1">
                  { 1 == 0 ? <img src="https://brucelefebvre.com/images/me.jpg" className="rounded-circle mw-100 mh-100" /> : false }
                  <img src="https://material-ui.com/static/images/avatar/1.jpg" className="rounded-circle mw-100 mh-100" onMouseEnter={() => setPlaceHolder(true)} onMouseLeave={() => setPlaceHolder(false)} />    
                </div>
              </div>
              <div className="col-xl-11 h-25">
                <div className="row">
                  <div className="col-xl-2">
                    <FormControl className="w-100">
                      <InputLabel htmlFor="name-multiple">Situação</InputLabel>
                      <Select
                        value={situacao}
                        onChange={event => setSituacao(event.target.value)}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 200
                            }
                          }
                        }}
                      >
                        <MenuItem key={"A"} value={"A"}>
                          Ativo
                        </MenuItem>
                        <MenuItem key={"I"} value={"I"}>
                          Inativo
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-xl-2">
                    <FormControl className="w-100">
                      <InputLabel htmlFor="name-multiple">Pessoa</InputLabel>
                      <Select
                        value={pessoa}
                        onChange={event => setPessoa(event.target.value)}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 200
                            }
                          }
                        }}
                      >
                        <MenuItem key={"F"} value={"F"}>
                          Física
                        </MenuItem>
                        <MenuItem key={"J"} value={"J"}>
                          Jurídica
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-xl-2">
                    <FormControl className="w-100">
                      <InputLabel htmlFor="name-multiple">
                        Tipos
                        {/* <Button onClick={e=> {e.preventDefault(); window.alert('edit')}}><EditIcon /></Button> */}
                      </InputLabel>
                      <Select
                        multiple
                        value={tipo}
                        onChange={event => setTipo(event.target.value)}
                        input={<Input id="name-multiple" />}
                        renderValue={selected => selected.join(", ")}
                        MenuProps={{
                          PaperProps: {
                            style: {
                              maxHeight: 224,
                              width: 200
                            }
                          }
                        }}
                      >
                        {tipos.map(e => (
                          <MenuItem
                            key={e}
                            value={e}
                            style={{
                              fontWeight: tipo.indexOf(e) !== -1 ? "500" : "400"
                            }}
                          >
                            <Checkbox checked={tipo.indexOf(e) > -1} />
                            <ListItemText primary={e} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div className="col-xl-2">
                    <TextField
                      id="cpf"
                      label="CPF"
                      //className={{}}
                      value={CPF}
                      onChange={e => setCPF(e.target.value)}
                    />
                  </div>
                  <div className="col-xl-2">
                    <TextField
                      id="rg"
                      label="RG"
                      //className={{}}
                      value={RG}
                      onChange={e => setRG(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-xl-5">
                    <TextField
                      id="nome"
                      label="Nome"
                      className="w-100"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                    />
                  </div>
                  <div className="col-xl-5">
                    <TextField
                      id="fantasia"
                      label="Fantasia"
                      className="w-100"
                      value={fantasia}
                      onChange={e => setFantasia(e.target.value)}
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
              columns={columnsEndereco}
              //actions={actions}
              data={enderecos}
              title={<h3 className="mb-0">Endereços</h3>}
              icons={tableIcons}
              options={options}
              localization={tableTranslate}
              editable={{
                isEditable: () => true,
                isDeletable: () => true,
                onRowAdd: newData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                /* const data = this.state.data;
                                data.push(newData);
                                this.setState({ data }, () => resolve()); */
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowUpdate: (newData, oldData) =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                /* const data = this.state.data;
                                const index = data.indexOf(oldData);
                                data[index] = newData;                
                                this.setState({ data }, () => resolve()); */
                            }
                            resolve();
                        }, 1000);
                    }),
                onRowDelete: oldData =>
                    new Promise((resolve, reject) => {
                        setTimeout(() => {
                            {
                                /* let data = this.state.data;
                                const index = data.indexOf(oldData);
                                data.splice(index, 1);
                                this.setState({ data }, () => resolve()); */
                            }
                            resolve();
                        }, 1000);
                    })
            }}
            />
          </div>

          <div
            className="card jr-card-intra shadow text-center w-100 m-2"
            style={{ minHeight: "170px" }}
          >
            <MaterialTable
              columns={columnsContatos}
              //actions={actions}
              data={contatos}
              title={<h3 className="mb-0">Contatos</h3>}
              icons={tableIcons}
              options={options}
              localization={tableTranslate}
              editable={{
                  isEditable: () => true,
                  isDeletable: () => true,
                  onRowAdd: newData =>
                      new Promise((resolve, reject) => {
                          setTimeout(() => {
                              {
                                  /* const data = this.state.data;
                                  data.push(newData);
                                  this.setState({ data }, () => resolve()); */
                              }
                              resolve();
                          }, 1000);
                      }),
                  onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                          setTimeout(() => {
                              {
                                  /* const data = this.state.data;
                                  const index = data.indexOf(oldData);
                                  data[index] = newData;                
                                  this.setState({ data }, () => resolve()); */
                              }
                              resolve();
                          }, 1000);
                      }),
                  onRowDelete: oldData =>
                      new Promise((resolve, reject) => {
                          setTimeout(() => {
                              {
                                  /* let data = this.state.data;
                                  const index = data.indexOf(oldData);
                                  data.splice(index, 1);
                                  this.setState({ data }, () => resolve()); */
                              }
                              resolve();
                          }, 1000);
                      })
              }}
            />
          </div>     

        </div>
      </div>
    </div>
  );
}

export default PessoasEdicao;
