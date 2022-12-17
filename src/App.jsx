import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import ManageUser from './pages/manageuser/ManageUser';
import PageTitle from './components/pagetitle/PageTitle';
import MainPage from './pages/mainpage/MainPage';
import './App.css';

export default class App extends Component {
  render() {
    return (
      <>
      <PageTitle />
      <Switch>
        <Route exact path="/" component={ MainPage } />
        <Route path="/add" render={(props) => <ManageUser {...props} type="add"/> } />
        <Route path="/edit/:id" render={(props) => <ManageUser {...props} type="edit"/> } />
      </Switch>
    </>
    );
  }
}
