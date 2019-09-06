import React, { Component } from 'react';
import Axios from 'axios'
import { urlApi } from '../../3.helpers/database';
import {Link} from 'react-router-dom'

class ParaSultan extends Component {
    state = {
        data : [],
        idSultan : 0,
        belanjaanSultan : 0,
        namaSultan : ''
    }

    componentDidMount(){
        Axios.get(urlApi + 'history')
        .then(res => {
            console.log(res)
            this.setState({data : res.data})
            this.renderBelanjaanSultan()
            this.renderNamaSultan()
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderBelanjaanSultan = () => {
        this.state.data.map(val => {
            if (val.totalPrice>this.state.belanjaanSultan){
                this.setState({belanjaanSultan : val.totalPrice})
                this.setState({idSultan : val.userId})
            }
        })
        return this.state.belanjaanSultan
    }

    renderNamaSultan = ()=>{
        Axios.get(urlApi + 'users?id='+this.state.idSultan)
        .then(res => {
            console.log(res)
            this.setState({namaSultan : res.data[0].username})
        })
        .catch(err => {
            console.log(err)
        })
        return this.state.namaSultan
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow mt-3">
                            <div className="card-header border-0 pt-5">
                                <h3>User Tersultan adalah : {this.state.namaSultan}</h3>
                            </div>
                            <div className="card-body">
                                {this.state.belanjaanSultan}
                                <br/>
                                <h4>Ayo<Link to='/'> Kalahkan {this.state.namaSultan} </Link>! </h4>
                            </div>
                            <div className="card-footer align-items-center">
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ParaSultan;