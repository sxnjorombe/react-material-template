import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';
import Grid from 'material-ui/Grid';

import Progress from '../../../components/ui/CircularProgess';
import * as actions from '../actions';


const AuthRoute = ({ component: Component, ...rest, auth = false, tryStorageAuth }, props) => {
  if(auth){
    return (<Route { ...rest } render={ (props) => (<Component {...props}/>) } />);
  }
  const client = localStorage.getItem('client');
  const uid = localStorage.getItem('uid');
  const accessToken = localStorage.getItem('access-token');

  if(client === null || uid === null || accessToken === null) {
    return (<Route { ...rest } render={ (props) => (<Redirect to='/login'/>)}/>);
  } 
  
  tryStorageAuth();
  return (
    <Grid container justify={'center'}>
      <Progress/>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return { auth: state.Auth.authenticated };
};

const mapDispatchToProps = {
  tryStorageAuth: actions.tryStorageAuth,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthRoute);
