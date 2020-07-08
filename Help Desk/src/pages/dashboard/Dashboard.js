import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Grid, withStyles, CircularProgress,
  Snackbar, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle,
  TextField, MenuItem, Select,
  InputLabel, FormControl, Button,
  IconButton, Tooltip, Typography,
  Menu
} from "@material-ui/core";
import request from 'request'
import {useDropzone} from 'react-dropzone'
import FileIcon from 'react-file-icon';
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import MUIDataTable from "mui-datatables";
import AddIcon from "@material-ui/icons/Add";
import firebase  from 'firebase/app'
import Pipefy from '../../config/pipefy'
import LoadingOverlay from 'react-loading-overlay';
import userInfo from "../../config/userInfo";
import cards from "../../config/cards";
import getCard from "../../config/card";
import tableTranslate from '../../config/tableTranslate'
import FileUploader from "react-firebase-file-uploader";
import axios from 'axios'
import 'typeface-roboto';
import * as Sentry from '@sentry/browser';
import moment from 'moment'
import 'moment/locale/pt-br'
 
const columns = [ 
  { name: "id", label: "ID", options: { display: 'excluded', filter: false, download: false } }, 
  { name: "concluido", label: "Concluído", 
    options: { 
      sortDirection: 'asc',
      customBodyRender: (columnMeta, handleToggleColumn) => (columnMeta === 'Não'? <RadioButtonUncheckedIcon /> : <CheckCircleIcon color="secondary"/>)
    }
  },
  { name: "titulo", label: "Título"},
  { name: "criado", label: "Data" },
  { name: "fase", label: "Fase" },
  { name: "previsao", label: "Previsão" },
  { name: "setor", label: "Setor" },
  { name: "categoria", label: "Categoria" },
 ]

function Dashboard({ classes, theme, ...props }){
  const [usuario, setUsuario] = useState([]);
  const [cartoes, setCartoes] = useState([]);
  const [cardModal, setCardModal] = useState([]);
  const [assunto, setAssunto] = useState('');
  const [setor, setSetor] = useState('');
  const [opcoesSetor, setOpcoesSetor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [opcoesCategoria, setOpcoesCategoria] = useState('');
  const [categoriaVisible, setCategoriaVisible] = useState(false); 
  const [descricao, setDescricao] = useState('');
  const [enviandoCartao, setEnviandoCartao] = useState({enviando: false, mensagem: ''});
  const [modalNovoTicket, setModalNovoTicket] = useState(false);
  const [modalViewTicket, setModalViewTicket] = useState(false);
  const [snack, setSnack] = useState({open: false, mensagem: "", duracao: null});
  const [files, setFiles] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileSelected, setFileSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uid, setUid] = useState('');
  var anexos = '';
  var anexosRestantes = 0;
  const uploader = useRef();

  const options = {
    filterType: 'multiselect',
    responsive: "scroll",
    rowsPerPageOptions: ["10","20","30","40","50","100"],
    rowHover: true,
    selectableRows: false,
    resizableColumns: false,
    downloadOptions: {filename: `help_desk_wmc_${moment(new Date()).format('DD_MM_YYYY_HH_mm')}.csv`},
    onRowClick: (rowData, rowMeta) => { getCard(rowData[0], setCardModal, setModalViewTicket, setSnack)},
    customToolbar: () => {
      return (
        <React.Fragment>
        <Tooltip title={"Novo Ticket"}>
          <IconButton onClick={() => setModalNovoTicket(true)}>
            <AddIcon color="secondary"/>
          </IconButton>
        </Tooltip>
      </React.Fragment>
      );
    },
    textLabels: tableTranslate
  }

  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10
  };
  
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 80,
    height: 80,
    padding: 2,
    boxSizing: 'border-box'      
  };
  
  const thumbInner = {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    overflow: 'hidden'
  };
  
  const img = {

    width: '100%',
    height: '100%',
  };  

  const thumbCaption ={
    fontSize: 10,
    width: 100,
    flexWrap: 'wrap',
  }

  // eslint-disable-next-line
  function DropFile(props) {
    const {getRootProps, getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => {
            const extensao = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2)            
            return Object.assign(file, {
              typeMime: file.type.slice(0, file.type.lastIndexOf("/")),
              ext: (extensao === '' ? 'file' : extensao),
              preview: URL.createObjectURL(file)
          })
        }))
    }})
    
    const baseStyle = {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '10px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#92fca1',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#636363',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      '& a:hover': {
        borderColor: '#2196f3'
      }
    }

    function thumbClick(e, fileClicked) {
      setAnchorEl(e.currentTarget);
      setFileSelected(fileClicked)
    }

    function thumbClickClose() {
      setAnchorEl(null);
      setFileSelected(null);
    }

    function fileRemove() {
      setAnchorEl(null);
      setFileSelected(null)
      setFiles(files.filter(f => f !== fileSelected))
    }

    const thumbs = files.map(file => (
      <div style={thumb} key={file.name}>
        <Button onClick={e => thumbClick(e, file)} >
          <div style={thumbInner}>     
          {  file.typeMime === 'image' ?
              <img
                alt="preview"
                src={file.preview}
                style={img} />
             :  <FileIcon
                  size={70}
                  color="#c9deff"
                  foldColor="#99bef7"
                  gradientOpacity={0}
                  labelColor={props.theme.palette.primary.main}
                  labelTextColor={"#FFFFFF"}
                  labelUppercase
                  radius={2}
                  extension={file.ext} /> }
              <figcaption style={thumbCaption}>{file.name}</figcaption>     
            </div>     
          </Button> 
          
        <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={thumbClickClose}>
        <MenuItem onClick={e => fileRemove(file)}>Remover</MenuItem>
      </Menu>    
      </div>
    ));

    /*useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);*/
    
    const style = useMemo(() => ({
      ...baseStyle,
    }))
  
    return (
      <section className="container">
        <div {...getRootProps({style})}>
          <input {...getInputProps()} />
          <p>Arraste seus arquivos aqui, ou clique aqui para selecionar os arquivos</p>
        </div>
        <aside style={thumbsContainer}>
          {thumbs}
        </aside>
      </section>
    );
  }

  async function getData() {
    await userInfo(setUsuario)
    await cards(setCartoes, setLoading, setSnack, setOpcoesSetor, setOpcoesCategoria)
    await getOpcoes()
    setUid(localStorage.getItem("id_token"))
  }

  async function getOpcoes(){
    request(Pipefy(
      //eslint-disable-next-line
      JSON.stringify({"query": `{ pipe(id: 861990) { start_form_fields { id options } } }`}))
    , async (error, response, body) => {
      if(error){
        Sentry.captureException(new Error({error:error,  mensagem: "Erro ao buscar as opções para criar o card!"}));
        setSnack({ open: true,  mensagem: "Erro ao buscar as opções para criar o card!"})
      }
      const dados = JSON.parse(body).data;
      //console.log(dados.pipe.start_form_fields)  
      dados.pipe.start_form_fields.forEach(campos => {
        if(campos.id === 'setor'){
          setOpcoesSetor(campos.options)
        } else if(campos.id === 'categoria'){
          setOpcoesCategoria(campos.options)
        }
      })    
    })   
  }

  useEffect(() => {
    getData() 
  }, [])

  function limparTicket(){
    setAssunto('')
    setSetor('')
    setCategoria('')
    setCategoriaVisible(false)
    setDescricao('')
    setModalNovoTicket(false)
  }  

  async function enviarAnexos(){
    setEnviandoCartao({enviando: true, mensagem: `Enviando anexos...`})
    anexos = ''
    const filesize = Object.keys(files).length;
    anexosRestantes = filesize;
    for (let i = 0; i < filesize; i++) {
      uploader.current.startUpload(files[i])
    }
  }

   function criarcard() {
    setEnviandoCartao({enviando: true, mensagem: `Criando Ticket...`})
    //eslint-disable-next-line
    const sql = JSON.stringify({"query": `mutation{ createCard(input: {pipe_id: 861990 fields_attributes: [{field_id: "email", field_value: "teste@teste.com"}{field_id: "assunto", field_value: "${assunto.replace(/(\r\n|\n|\r)/gm," ")}"}{field_id: "setor", field_value: "${setor}"}{field_id: "categoria", field_value: "${categoria}"}{field_id: "descri_o", field_value: "${descricao.replace(/(\r\n|\n|\r)/gm,"\\n")}"}{field_id: "usu_rio", field_value: "${usuario.nome}"}{field_id: "empresa", field_value: "${usuario.idEmpresa}"}{field_id: "anexos_ticket", field_value: "${anexos}"}] }) { card {id title }}}}`})
    
    request(Pipefy(sql), (error, response, body) => {
      if(error){
        //console.log(error)
        Sentry.captureException(new Error({error:error, sql}));
        setSnack({open: true, mensagem: "Ocorreu um erro ao criar o ticket, tente novamente!"})
        setEnviandoCartao({enviando: false, mensagem: ``})
        return
      }

      const dados = JSON.parse(body);
      //console.log(dados)
      firebase.database().ref(`/usuarios/${uid}/cartoes/${dados.data.createCard.card.id}`).update({time: firebase.database.ServerValue.TIMESTAMP})
      setEnviandoCartao({enviando: false, mensagem: ``})
      limparTicket()
      setSnack({ open: true,  duracao: 12000, mensagem: "Ticket criado com sucesso!"})
    })
  }

  return (
    <React.Fragment>
      <Grid container spacing={32}> 
        <Grid item xs={12}>
          <LoadingOverlay
            active={loading}
            spinner={<CircularProgress size={26} className={classes.sendLoader} color="secondary" />}
            text='Aguarde, carregando...'>  
              <MUIDataTable
                title="Tickets"
                data={cartoes}
                columns={columns} 
                options={options}/>  
          </LoadingOverlay>     
        </Grid>
      </Grid>
        <Dialog 
        open={modalNovoTicket} 
        onClose={() => { if(!enviandoCartao.enviando){ limparTicket() }}}
        fullWidth
        scroll={"paper"}
        maxWidth={"sm"}
        aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Novo Ticket</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Informe os dados referente ao seu contato para suporte
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="assunto"
              label="Assunto"
              type="text"
              fullWidth
              disabled={enviandoCartao.enviando}
              value={assunto}
              onChange={e => setAssunto(e.target.value)} />
            <FormControl className={classes.select}>
              <InputLabel htmlFor="setor">Setor</InputLabel>
              <Select
                value={setor}
                disabled={enviandoCartao.enviando}
                onChange={e => {
                                setSetor(e.target.value)
                                setCategoriaVisible(e.target.value === "Suporte Técnico")}}
                inputProps={{
                  name: 'setor',
                  id: 'setor', }} >
                { !opcoesSetor ? false : opcoesSetor.map(setor => <MenuItem  key={setor} value={setor}>{setor}</MenuItem>)}  
              </Select>
            </FormControl>
            { categoriaVisible ? 
            <FormControl className={classes.select}>
              <InputLabel htmlFor="categoria">Categoria</InputLabel>
                <Select
                  value={categoria}
                  disabled={enviandoCartao.enviando}
                  onChange={e => setCategoria(e.target.value)}
                  inputProps={{
                    name: 'categoria',
                    id: 'categoria', }} >
                  { !opcoesCategoria ? false : opcoesCategoria.map(categoria => <MenuItem key={categoria} value={categoria}>{categoria}</MenuItem>)}  
                </Select>
            </FormControl> : false }
            <TextField
              autoFocus
              margin="dense"
              id="descricao"
              label="Descrição"
              type="text"
              fullWidth
              multiline
              rows={2}
              disabled={enviandoCartao.enviando}
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
           <FormControl style={{marginTop: 5}}>
            <Typography>Anexos (Máx.: 5Mb)</Typography>
            <FileUploader
                name="uploader"
                disabled={enviandoCartao.enviando}
                style={{marginTop: 5}}
                filename={f => `${Math.floor(Date.now() / 1000)}-${f.name}` }
                storageRef={firebase.storage().ref("")}
                onUploadStart={() => {}}
                onChange={event => {
                  const { target: { files } } = event;  
                  var tamanho = false;
                  for (let i = 0; i < Object.keys(files).length; i++) {
                    if(files[i].size > 5000000){
                      tamanho = true
                      break
                    }
                  }
                  if(tamanho !== false){
                    event.target.value = ""
                    window.alert(`Não é possível enviar arquivos com mais de 5Mb\nSELECIONE NOVAMENTE OS ARQUIVOS!`);
                    setFiles([]);
                    return
                  }else{
                    setFiles(files);
                  }
                }}
                metadata={{customMetadata: { uid }}}
                onUploadError={e => Sentry.captureException(e)}
                onUploadSuccess={filename => {
                                  firebase
                                    .storage()
                                    .ref("")
                                    .child(filename)
                                    .getDownloadURL()
                                    .then(async url => {
                                      await axios.get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(url)}`)
                                        .then(function (response) {
                                          anexos += response.data.shorturl         
                                        })
                                        .catch(function (error) {
                                          anexos += url
                                        });
                                        anexosRestantes--
                                        if(anexosRestantes <= 0){
                                          criarcard()
                                        } else{
                                            anexos += '\\n'
                                        }
                                      })
                                }}
                ref={uploader}
                onProgress={p => setEnviandoCartao({enviando: true, mensagem: `Enviando anexos(${p}%)...`})}
                multiple
              />
            </FormControl>  
          </DialogContent>
          <DialogActions>
            { enviandoCartao.enviando ?
                <div className={classes.enviando}>
                  <CircularProgress size={26} className={classes.sendLoader} color="secondary" />
                  <span className={classes.textLoader}>{ enviandoCartao.mensagem }</span>  
                </div>
              : 
              <React.Fragment>
                <Button onClick={() => limparTicket()} disabled={enviandoCartao.enviando} color="secondary">
                  Cancelar
                </Button>
                <Button onClick={() => {
                    if (Object.keys(files).length > 0){
                      enviarAnexos()
                    }else {
                      criarcard()
                    }
                  }} disabled={enviandoCartao.enviando} color="secondary">
                  Enviar
                </Button>
              </React.Fragment> }
          </DialogActions>
        </Dialog> 
        <Dialog 
        open={modalViewTicket} 
        onClose={() => setModalViewTicket(false)}
        fullWidth
        scroll={"paper"}
        maxWidth={"sm"}
        aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{!cardModal.titulo ? false : cardModal.titulo}</DialogTitle>
          <DialogContent dividers>  
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="b">Data</Typography>
              <Typography paragraph>{!cardModal.criado ? false : cardModal.criado}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="b">Fase</Typography>
              <Typography paragraph>{!cardModal.fase ? false : cardModal.fase}</Typography>
            </Grid>
            <Grid item xs={6}>  
              <Typography variant="b">Previsão</Typography>
              <Typography paragraph>{!cardModal.previsao ? false : cardModal.previsao}</Typography>
            </Grid> 
            <Grid item xs={6}>  
              <Typography variant="b">Setor</Typography>
              <Typography paragraph>{!cardModal.setor ? false : cardModal.setor}</Typography>
            </Grid>
            <Grid item xs={6}>    
              <Typography variant="b">Categoria</Typography>
              <Typography paragraph>{!cardModal.categoria ? false : cardModal.categoria}</Typography>
            </Grid>
            <Grid item xs={6}>  
              <Typography variant="b">Concluído</Typography>
              <Typography paragraph >{!cardModal.concluido ? false : cardModal.concluido}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="b">Descrição</Typography>
              <Typography paragraph style={{whiteSpace: 'pre-line'}}>{!cardModal.descricao ? false : cardModal.descricao}</Typography>
            </Grid>
              { !cardModal.anexos ? false : 
                (<Grid item xs={12}>
                <Typography variant="b">Anexos</Typography>
                { cardModal.anexos.map(anexo => 
                  <a href={anexo} target='_blank' rel="noopener noreferrer" >
                    <div style={thumb}><div style={thumbInner}>     
                      <img  src={anexo} alt={anexo} width={70} height={70} onError={(e)=>{ e.target.onerror = null; e.target.src="/file.svg"}} />  
                    </div></div>
                  </a>)}
                </Grid>)}
          </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setModalViewTicket(false)} color="secondary">
              Fechar
            </Button>
          </DialogActions>
        </Dialog>
      <Snackbar
        anchorOrigin={{
            vertical: "bottom",
            horizontal: 'right'
        }}
        variant={snack.tipo}
        open={snack.open}
        autoHideDuration={snack.duracao}
        onClose={() =>  setSnack({ ...snack, open: false })}
        ContentProps={{
            "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{snack.mensagem}</span>}
        action={[
              <Button color="secondary" size="small" key={1} onClick={() =>  { setSnack({...snack, open: false })}}>
                Fechar
              </Button>
        ]} />     
    </React.Fragment>
  );
};

const styles = theme => ({
    select: {
      width: "100%"
    },
    enviando: {
      flex: '1 0 0',
      marginLeft: 15,
      marginBottom: 15,
    },
    textLoader: {
      marginBottom: 10,
    },
    sendLoader: {
      marginRight: 15,
    }
  });

export default withStyles(styles, { withTheme: true })(Dashboard);
