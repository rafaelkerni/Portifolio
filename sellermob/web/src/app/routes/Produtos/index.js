import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import asyncComponent from 'util/asyncComponent'

const Produtos = ({match}) => (
    <Switch>
      <Route path={`${match.url}/:id/edicao`} component={asyncComponent(() => import('./routes/Edicao'))}/> 
      <Route path={`${match.url}/`} component={asyncComponent(() => import('./routes/Listagem'))}/>
    </Switch>
);
export default Produtos;