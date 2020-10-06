import React, { useState, useEffect, useRef } from "react";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  ExpansionPanelActions,
  Typography,
  Input,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Button,
  Chip,
} from "@material-ui/core";
import InfoCard from "components/InfoCard/index";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import moment from "moment";
import "moment/locale/pt-br";
import { KeyboardDatePicker } from "@material-ui/pickers";
import * as data from "./data";
import CardPedidos from 'components/CardPedidos'
import ContainerHeader from 'components/ContainerHeader/index';

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

function Dashboard(props) {
  const [dimensao, setDimensao] = useState("Rota de Entrega");
  const [empresa, setEmpresa] = useState([]);
  const [filtros, setFiltros] = useState(true);
  const [selectedDate, setSelectedDate] = useState(moment(new Date()));  

  return (
    <>
    <ContainerHeader match={props.match} title="Pedidos"/>
    <div className="app-wrapper pt-0">
      <div className="mb-3">
        <ExpansionPanel onChange={(event, expanded) => setFiltros(!filtros)}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={styles.heading}>Filtros</Typography>
            {!filtros ? (
              false
            ) : (
              <div className="pl-3">
                <Chip
                  size="small"
                  label="Empresas: FlexSul, TopFlex"
                  onDelete={() => {}}
                  className="ml-2"
                />
                <Chip
                  size="small"
                  label="Data Entrega: 23/07/2019"
                  onDelete={() => {}}
                  className="ml-2"
                />
              </div>
            )}
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={styles.details}>
            <div className="row col-12">
              <div className="col-4">
                <FormControl className="w-100">
                  <InputLabel htmlFor="name-multiple">Empresas</InputLabel>
                  <Select
                    multiple
                    value={empresa}
                    onChange={event => setEmpresa(event.target.value)}
                    input={<Input id="name-multiple" />}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 224,
                          width: 200
                        }
                      }
                    }}
                  >
                    {data.empresas.map(e => (
                      <MenuItem
                        key={e}
                        value={e}
                        style={{
                          fontWeight: empresa.indexOf(e) !== -1 ? "500" : "400"
                        }}
                      >
                        {e}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="col-4">
                <KeyboardDatePicker
                  fullWidth
                  label="Data Pedido"
                  format={"DD/MM/YYYY"}
                  value={selectedDate}
                  onChange={date => setSelectedDate(moment(date))}
                  animateYearScrolling={false}
                  keyboardIcon={<i className="zmdi zmdi-calendar" />}
                  leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                  rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                />
              </div>
              <div className="col-4">
                <KeyboardDatePicker
                  fullWidth
                  label="Data Entrega"
                  format={"DD/MM/YYYY"}
                  value={selectedDate}
                  onChange={date => setSelectedDate(moment(date))}
                  animateYearScrolling={false}
                  keyboardIcon={<i className="zmdi zmdi-calendar" />}
                  leftArrowIcon={<i className="zmdi zmdi-arrow-back" />}
                  rightArrowIcon={<i className="zmdi zmdi-arrow-forward" />}
                />
              </div>
            </div>
          </ExpansionPanelDetails>
          <ExpansionPanelActions>
            <Button variant="contained" size="small" color="primary">
              Filtrar
            </Button>
          </ExpansionPanelActions>
        </ExpansionPanel>
      </div>
      <div className="row">
        <div className="col-xl-2 col-sm-7 col-md-4 col-sd col-12">
          <div className="card jr-card-intra shadow text-center">
            <div className="card-header pt-3 pb-2 d-flex align-items-center">
              <h3 className="mb-0">Dimensão</h3>
            </div>
            <div className="pb-4">
              <FormControl className="w-75">
                <Select
                  autoWidth
                  value={dimensao}
                  onChange={event => setDimensao(event.target.value)}
                >
                  <MenuItem value={"Rota de Entrega"}>Rota de Entrega</MenuItem>
                  <MenuItem value={"Rota de Venda"}>Rota de Venda</MenuItem>
                  <MenuItem value={"Vendedor"}>Vendedor</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="col-xl-2 col-sm-7 col-md-4 col-12">
          <InfoCard data={data.cardData[0]} />
        </div>
        <div className="col-xl-2 col-sm-7 col-md-4 col-12">
          <InfoCard data={data.cardData[1]} />
        </div>
        <div className="col-xl-2 col-sm-7 col-md-4 col-12">
          <InfoCard data={data.cardData[2]} />
        </div>
        <div className="col-xl-2 col-sm-7 col-md-4 col-12">
          <InfoCard data={data.cardData[3]} />
        </div>
        <div className="col-xl-2 col-sm-7 col-md-4 col-12">
          <InfoCard data={data.cardData[4]} />
        </div>
      </div>

      <div className="row">
      { data.rotas.map(rota => <CardPedidos rota={rota}/>) }
      </div>
    </div>
    </>
  );
}

export default Dashboard;
