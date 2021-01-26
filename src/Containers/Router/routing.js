import React, {Component} from 'react';
import {BrowserRouter as Router, Route } from 'react-router-dom';
import home from '../pages';
import pilihanKelas from '../pages/pilihankelas';
import kelas from '../pages/kelas';
import tugas from '../pages/tugas';
import bantuan from '../pages/bantuan';
import semuaKelas from '../pages/listKelas';
import kelasStart from '../pages/kelasStart';
import Nilai from '../pages/nilai';
import DataMurid from '../pages/dataMurid';


class Routing extends Component{

    render(){
        return(
          <Router>
            <div>
          <Route path="/" exact component={home}/> 
          <Route path="/pilihanKelas" component={pilihanKelas}/> 
          <Route path="/kelas" component={kelas}/> 
          <Route path="/tugas" component={tugas}/> 
          <Route path="/bantuan" component={bantuan}/> 
          <Route path="/semuaKelas" component={semuaKelas}/> 
          <Route path="/kelasStart" component={kelasStart}/> 
          <Route path="/nilai" component={Nilai}/> 
          <Route path="/DataMurid" component={DataMurid}/> 
            </div>
          </Router>
        );
    }
}

export default Routing;