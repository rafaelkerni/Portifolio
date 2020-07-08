
import Button from '@material-ui/core/Button';



export default function DropFile(props) {
    const [files, setFiles] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [fileSelected, setFileSelected] = React.useState(null);

    const {getRootProps, getInputProps} = useDropzone({
        onDrop: acceptedFiles => {
          setFiles(acceptedFiles.map(file => {
            const extensao = file.name.slice((file.name.lastIndexOf(".") - 1 >>> 0) + 2) 
            /*firebase
            .storage()
            .ref(`${Math.floor(Date.now() / 1000)}.${extensao}`)
            .put(file).then(function(snapshot) {
              console.log(snapshot);
              snapshot.ref.getDownloadURL().then(function(downloadURL) {
                console.log("File available at", downloadURL);
              });
            })  */     
            
            return Object.assign(file, {
              typeMime: file.type.slice(0, file.type.lastIndexOf("/")),
              ext: (extensao === '' ? 'file' : extensao),
              preview: URL.createObjectURL(file)
          })
        }))
        //setFiles(files.concat(oFiles))
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
      console.log(files)
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
                  size={90}
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

    useEffect(() => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);
    
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