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
  IconButton,
  FormControlLabel,
} from "@material-ui/core";
import { SketchPicker } from 'react-color';
import InfoCard from "components/InfoCard";
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
import ContainerHeader from "components/ContainerHeader";
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

function ProdutosEdicao(props) {
  const [fotos, setFotos] = useState([]);
  const [cor, setCor] = useState({});
  const [logo, setLogo] = useState([]);
  const [snack, setSnack] = useState(['', false]);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("data_sellermob"));
    axios.defaults.headers.common["Authorization"] = `bearer ${dados.token}`;
    loadImages();
    loadConfig();
  }, []);

  function salvarConfig(){
    try {
      axios
        .put('/config', {cor: cor})
        .then(response => {console.log(1);setSnack(['', true])})
        .catch(error => {
          console.log(error);
          setSnack([error, true])
        });
    } catch (error) {
      console.log(3);
      setSnack([error, true])
    }
  }

  function loadConfig(){
    try {
      axios
        .get('/config', {cor: cor})
        .then(response => setCor(response.data.data.cor))
        .catch(error => {
          setSnack([error, true])
        });
    } catch (error) {
      setSnack([error, true])
    }
  }

  function deletarFoto(id){
    if(id <= 0){
      setSnack(['Erro ao deletar a foto!', true])
    }else{
      axios
      .delete(`/imagem_config/${id}`)
      .then(resp => loadImages())
        .catch(err => {
          console.log("err", err);
        });
    }
  }

  function loadImages() {
    try {
      axios
        .get(`/imagem_config/`)
        .then(response => {
          let f = [];
          response.data.data.forEach(
            file =>
              (f = [
                ...f,
                {
                  src: `${axios.defaults.baseURL}/static/${file.imagem}`,
                  thumbnail: `${axios.defaults.baseURL}/static/${file.imagem}`,
                  thumbnailWidth: 160,
                  thumbnailHeight: 100,
                  customOverlay: 
                    <Button variant="contained" color="primary"
                      style={{pointerEvents: "auto"}} 
                      onClick={()=>deletarFoto(file.id)} >
                    Deletar
                    <DeleteIcon />
                  </Button>
                }
              ])
          );
          setFotos(f);
        })
        .catch(error => console.log("error:" + error));
    } catch (err) {
      console.log("error:" + err);
    }
  }

  
  function enviarFotos(acceptedFiles, id) {
    acceptedFiles.forEach(item => {
      let data = new FormData();
      data.append("image", acceptedFiles[0]);
      axios
        .post(axios.defaults.baseURL + `/imagem_config/${id > 0 ? id : ''}`, data, {
          headers: {"Content-Type": "multipart/form-data"}
        })
        .then(resp => loadImages())
        .catch(err => {
          console.log("err", err);
        });
    });
  }

  return (
    <div>
      <ContainerHeader
        match={props.match}
        title={'Configurações'}
      />
      <div className="app-wrapper pt-0">
        <div className="row ">
          <div className="row pb-3 px-4">
            <Button
              variant="contained"
              color="primary"
              className="pr-2 mr-1"
              onClick={() => salvarConfig()}
            >
              Gravar
              <DoneIcon className="ml-1" />
            </Button>

            <Button
              variant="contained"
              color="primary"
              className="pr-2 mr-1"
              onClick={() => window.location.reload()}
            >
              Cancelar
              <ClearIcon className="ml-1" />
            </Button>
          </div> 
          <div
            className="card jr-card-intra shadow text-center w-100 m-2"
            style={{ minHeight: "160px" }}
          >
            <div className="card-header pt-3 pb-2 d-flex align-items-center">
              <h3 className="mb-0">Imagens</h3>
            </div>
            <Dropzone onDrop={acceptedFiles => enviarFotos(acceptedFiles)} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p style={{ margin: 25, padding: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#000' }}>
                      Arraste aqui a imagem, ou clique para selecionar...
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="mx-4 mb-3">
              <Gallery
                rowHeight={90}
                imageCountSeparator=" de "
                enableImageSelection={false}
                images={fotos}
                tagStyle={styles.tag}
              />
            </div>
          </div>

          <div
            className="card jr-card-intra shadow text-center w-100 m-2"
            style={{ minHeight: "160px" }}
          >
            <div className="card-header pt-3 pb-2 d-flex align-items-center">
              <h3 className="mb-0">Logo</h3>
            </div>
            <Dropzone onDrop={acceptedFiles => enviarFotos(acceptedFiles)} multiple={false}>
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p style={{ margin: 25, padding: 20, borderStyle: 'dashed', borderWidth: 2, borderColor: '#000' }}>
                      Arraste aqui o logo, ou clique para selecionar...
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
            <div className="mx-4 mb-3">
              <Gallery
                rowHeight={90}
                imageCountSeparator=" de "
                enableImageSelection={false}
                images={logo}
                tagStyle={styles.tag}
              />
            </div>
          </div>

          <div
            className="card jr-card-intra shadow text-center w-40 m-2"
            style={{ minHeight: "160px" }}
          >
            <div className="card-header pt-3 pb-2 d-flex align-items-center">
              <h3 className="mb-0">Cor</h3>
            </div>
                <SketchPicker color={cor} onChange={c => {setCor(c.hex); console.log(c)}}/>
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
