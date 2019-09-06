import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database';
import {Link} from 'react-router-dom'

class Analytics extends Component {
    state = {
        data : [],
        pendapatan : 0,
        jmltrx :0
    }

    componentDidMount(){
        Axios.get(urlApi + 'history')
        .then(res => {
            console.log(res)
            this.setState({data : res.data})
            this.pendapatanitung()
        })
        .catch(err => {
            console.log(err)
        })
    }

    pendapatanitung = () => {
        this.state.data.map(val => {
            this.setState({pendapatan : val.totalPrice + this.state.pendapatan})
        })
        this.setState({jmltrx : this.state.data.length})
        return this.state.pendapatanitung
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mt-3">
                            <div className="card-header border-0 pt-5">
                                <h3>Total Income</h3>
                            </div>
                            <div className="card-body">
                                <h4>Total pendapatan dari user belanja adalah Rp. {this.state.pendapatan}</h4>
                            </div>
                            <div className="card-footer align-items-center">
                                <h4>Pendapatan dihitung dari  {this.state.jmltrx} transaksi yang berhasil </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Analytics;