import React, { useState } from "react";
import {
  Typography,
  Menu,
  MenuItem,
  IconButton,
  Dialog,
  TableCell,
  TableRow,
} from "@material-ui/core";
import moment from "moment";
import "moment/locale/pt-br";
import MUIDataTable from "mui-datatables";
import tableTranslate from "util/tableTranslate";
import { withRouter } from "react-router-dom";

export const pedidos = [
  ["45678", "4561274", "Yonkers", "NY"],
  ["786123", "015645", "Hartford", "CT"],
  ["4123", "54612", "Tampa", "FL"],
  ["45821", "786213", "Dallas", "TX"]
];

export const produtos = [
  ["1", "132", "Produto 1", "5", "25,63"],
  ["2", "456", "Produto 2", "7", "12,36"],
  ["3", "789", "Produto 3", "3", "72,10"],
  ["4", "963", "Produto 4", "1", "50,00"],
  ["5", "852", "Produto 5", "2", "42,00"],
  ["1", "132", "Produto 1", "5", "25,63"],
  ["2", "456", "Produto 2", "7", "12,36"],
  ["3", "789", "Produto 3", "3", "72,10"],
  ["4", "963", "Produto 4", "1", "50,00"],
  ["5", "852", "Produto 5", "2", "42,00"],
  ["1", "132", "Produto 1", "5", "25,63"],
  ["2", "456", "Produto 2", "7", "12,36"],
  ["3", "789", "Produto 3", "3", "72,10"],
  ["4", "963", "Produto 4", "1", "50,00"],
  ["5", "852", "Produto 5", "2", "42,00"]
];

const optionsListaProdutos = {
  filterType: "multiselect",
  responsive: "stacked",
  rowsPerPageOptions: ["4", "10", "20", "30", "40", "50"],
  rowHover: true,
  selectableRows: false,
  resizableColumns: false,
  expandableRows: false,
  expandableRowsOnClick: false,
  downloadOptions: {
    filename: `produtos_${moment(new Date()).format(
      "DD_MM_YYYY_HH_mm"
    )}.csv`
  },
  textLabels: tableTranslate,
  elevation: 2,
  rowsPerPage: 4
};

const optionsListaPedidos = {
  filterType: "multiselect",
  responsive: "scroll",
  rowsPerPageOptions: ["10", "20", "30", "40", "50", "100"],
  rowHover: true,
  selectableRows: false,
  resizableColumns: false,
  downloadOptions: {
    filename: `pedidos_${moment(new Date()).format(
      "DD_MM_YYYY_HH_mm"
    )}.csv`
  },
  textLabels: tableTranslate,
  expandableRows: true,
  expandableRowsOnClick: true,
  renderExpandableRow: (rowData, rowMeta) => {
    const colSpan = rowData.length + 1;
    return (
      <TableRow>
        <TableCell colSpan={colSpan}>
          <div
            className="container-fluid p-2"
            style={{ backgroundColor: "#F4F4F7" }}
          >
            <div className="row d-flex justify-content-between">
              <div className="col-md-6">
                <div className="card jr-card-intra shadow pb-3">
                  <div className="card-header pt-3 pb-1 d-flex align-items-center">
                    <h3 className="mb-0">
                      <b># 4123</b>
                    </h3>
                  </div>
                  <div className="row px-4 pt-1" style={{ height: "50px" }}>
                    <div className="col-md-6">
                      <Typography variant="b">Empresa</Typography>
                      <Typography paragraph>FlexSul</Typography>
                    </div>
                  </div>
                  <div className="row px-4" style={{ height: "50px" }}>
                    <div className="col-md-6">
                      <Typography variant="b">Cliente</Typography>
                      <Typography paragraph>
                        Cliente Teste da Esquina
                      </Typography>
                    </div>
                  </div>
                  <div className="row px-4" style={{ height: "50px" }}>
                    <div className="col-md-4">
                      <Typography variant="b">Nº NF</Typography>
                      <Typography paragraph>54612</Typography>
                    </div>
                    <div className="col-md-4">
                      <Typography variant="b">Data</Typography>
                      <Typography paragraph>10/08/2019</Typography>
                    </div>
                    <div className="col-md-4">
                      <Typography variant="b">Hora</Typography>
                      <Typography paragraph>10:29:42</Typography>
                    </div>
                  </div>
                  <div className="row px-4" style={{ height: "50px" }}>
                    <div className="col-md-4">
                      <Typography variant="b">Tipo</Typography>
                      <Typography paragraph>Venda</Typography>
                    </div>
                    <div className="col-md-6">
                      <Typography variant="b">Vendedor</Typography>
                      <Typography paragraph>André da Silva</Typography>
                    </div>
                  </div>
                  <div className="row px-4" style={{ height: "50px" }}>
                    <div className="col-md-6">
                      <Typography variant="b">Endereço</Typography>
                      <Typography paragraph>Rua das Palmeiras</Typography>
                    </div>
                    <div className="col-md-2">
                      <Typography variant="b">Número</Typography>
                      <Typography paragraph>894</Typography>
                    </div>
                    <div className="col-md-4">
                      <Typography variant="b">Complemento</Typography>
                      <Typography paragraph></Typography>
                    </div>
                  </div>
                  <div className="row px-4" style={{ height: "50px" }}>
                    <div className="col-md-4">
                      <Typography variant="b">Bairro</Typography>
                      <Typography paragraph>Centro</Typography>
                    </div>
                    <div className="col-md-4">
                      <Typography variant="b">Cidade</Typography>
                      <Typography paragraph>Bento Gonçalves</Typography>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <MUIDataTable
                  title={"Produtos"}
                  data={produtos}
                  columns={[
                    "Nº Item",
                    "Cód. Produto",
                    "Descrição",
                    "Qtde",
                    "Preço"
                  ]}
                  options={optionsListaProdutos}
                />
              </div>
            </div>
          </div>
        </TableCell>
      </TableRow>
    );
  }
};

const styles = theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: 10
  },
  details: {
    alignItems: "center"
  },
  column: {
    flexBasis: "33.3%"
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.text.lightDivider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`
  },
  list: {
    width: "100%",
    maxHeight: "100%"
  },
  dialog: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: "none"
  },
  detalhePedidoAltura: {
    height: "50px"
  }
});

function CardPedidos(props) {
  const [modalPedidos, setModalPedidos] = useState(false);
  const [menuDimensoes, setMenuDimensoes] = useState(false);
  const [anchorEl, setAnchorEl] = useState(false);

  return (
    <div className="col-xl-2 col-sm-6 col-12">
      <div className="card jr-card-intra jr-card-header shadow text-center">
        <div className=" d-flex px-3 pt-3">
          <h3 className="card-heading mr-auto">Rota 2</h3>
          <IconButton
            className="icon-btn"
            onClick={event => {
              setAnchorEl(event.currentTarget);
              setMenuDimensoes(true);
              event.stopPropagation();
            }}
          >
            <i className="zmdi zmdi-more-vert" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={menuDimensoes}
            onClose={() => setMenuDimensoes(false)}
          >
            <MenuItem
              onClick={() => {
                setMenuDimensoes(false);
                setModalPedidos(true);
              }}
            >
              <i className="zmdi zmdi-account zmdi-hc-fw mr-2" />
              Detalhes
            </MenuItem>
            <MenuItem onClick={() => props.history.push("/app/cargas/1/edicao")}>
              <i className="zmdi zmdi-settings zmdi-hc-fw mr-2" />
              Utilizar em Carga
            </MenuItem>
          </Menu>
        </div>
        <div className="pl-3 pr-3">
          <ul className="list-unstyled text-left">
            <li className="mb-1 d-flex justify-content-between">
              <span>Qtde Entregas</span>
              <span>25</span>
            </li>
            <li className="mb-1 d-flex justify-content-between">
              <span>Qtde Pedidos</span>
              <span>25</span>
            </li>
            <li className="mb-1 d-flex justify-content-between">
              <span>Peso</span>
              <span>153,04 Kg</span>
            </li>
            <li className="mb-1 d-flex justify-content-between">
              <span>Cubagem</span>
              <span>321 m³</span>
            </li>
            <li className="mb-1 d-flex justify-content-between">
              <b>Valor Total</b>
              <b>R$ 1243,75</b>
            </li>
          </ul>
        </div>
      </div>
      <Dialog
        open={modalPedidos}
        onClose={() => setModalPedidos(!modalPedidos)}
        fullWidth
        scroll={"paper"}
        maxWidth={"lg"}
        aria-labelledby="form-dialog-title"
      >
        <div style={{ top: 50, left: 50 }} className={styles.dialog}>
          <MUIDataTable
            title={"Pedidos"}
            data={pedidos}
            columns={["Nº Pedido", "Nº NF", "Cliente", "Endereço"]}
            options={optionsListaPedidos}
          />
        </div>
      </Dialog>
    </div>
  );
}

export default withRouter(CardPedidos);
