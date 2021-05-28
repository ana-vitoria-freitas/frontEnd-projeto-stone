import React from 'react'

import { Router, Switch, Route } from 'react-router'

import Login from '../pages/login'
import Vendas from '../pages/vendas/Vendas'
import Home from '../pages/home'
import Abertura from '../pages/abertura/Abertura'
import NovoProduto from '../pages/novoProduto/NovoProduto'
import deletaProduto from '../pages/deletaProduto/deletaProduto'
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute'

import {history} from '../history'

const Routes = () => (
    <Router history={history}>
        <Switch>
            <Route component={Abertura} exact path="/"/>
            <Route component={Login} exact path="/login"/>
            <PrivateRoute component={deletaProduto} exact path="/deletaProduto"/>
            <PrivateRoute component={Vendas} exact path="/vendas"/>
            <PrivateRoute component={Home} exact path="/produtos"/>
            <PrivateRoute component={NovoProduto} exact path="/novoProduto"/>
            <PrivateRoute component={NotFound}/>
        </Switch>
    </Router>
)

export default Routes
