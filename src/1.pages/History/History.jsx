import React, { Component } from 'react';
import Axios from 'axios';
import {urlApi} from '../../3.helpers/database'
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'

export class History extends Component {
    state={
        histData:[],
        itemhistData:[],
        idDetails:null,
        modal:false,
        viewDetails : false,
    }

    componentDidMount(){
        this.getDataHistory(this.props.id)
    }

    componentWillReceiveProps(newProps){
        this.getDataHistory(newProps.id)
    }

    getDataHistory = (id) => {
        Axios.get(urlApi + 'history?userId=' + id)
        .then(res => {
            this.setState({histData : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    
    renderHistory = () => {
        var jsx = this.state.histData.map((val, idx) => {
            return (
                <tr>
                    <td>{idx+1}</td>
                    <td>{val.time}</td>        
                    <td>{val.items.length}</td>
                    <td>{val.totalPrice}</td>
                    <td><input type="button" className="btn btn-primary btn-block" onClick={()=>this.detailHandler(idx)} value="Details"/></td>
                </tr>
            )
        })
        
        return jsx
    }

    detailHandler=(id)=>{
        this.setState({viewDetails : true})
        this.setState({itemhistData: this.state.histData[id].items})
        this.setState({idDetails:id})
        this.rendercartdetail(id)
        this.renderReceiverDetail(id)
        // alert(this.state.histData[id].items[0].productName)
    }

    rendercartdetail = (id) => {
        var jsx = this.state.itemhistData.map((val, idx) => {
            // this.setState({viewDetails:false})
            return (
                <tr>
                    <td>{idx+1}</td>
                    <td>{val.productName}</td>        
                    <td><img height='100px' src={val.img} alt=""/></td>        
                    <td>{val.quantity}</td>        
                    <td>{val.discount}%</td>        
                    <td>{val.price}</td>        
                    <td>{val.price-(val.price*(val.discount/100))}</td>        
                </tr>
            )
        })
        return jsx
    }

    renderReceiverDetail = (id) =>{
        return(
        <div className="container mt-5 mb-5">
            <div className='row'>
                    <div className="col-3"><td>Receiver : {this.state.histData[id].recipient}</td></div>
                    <div className="col-5 offset-1"><td>Address : {this.state.histData[id].address}</td></div>
                    <div className="col-2 offset-1"><td>Postal Code : {this.state.histData[id].postalCode}</td></div>
            </div>
        </div>
        )
    }

    render() {
        if(this.props.username == ''){
            return <Redirect to="/" exact />
        }
        return (
            <div className='container'>
                {this.state.histData.length>0?
                        <table className='table table-bordered mt-3 text-center'>
                        <thead>
                            <tr>
                                <th>No.</th>
                                <th>Waktu Transaksi</th>
                                <th>Items</th>
                                <th>Total Belanja</th>
                                <th>Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.renderHistory()}
                        </tbody>
                    </table>
            :
            <div>
                <h4 className='p-3 mt-4 bg-danger'>Your History is empty !, Let's <Link to='/'>Go shopping</Link></h4> 
            </div>
            }
            {this.state.viewDetails
                    ?
                    <div className="row">
                        <div className="col-12">
                            <h1>Details : {this.state.histData[this.state.idDetails].time}</h1>
                            <table className='table table-bordered mt-3 text-center'>
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th>Produk</th>
                                        <th>Image</th>
                                        <th>Quantity</th>
                                        <th>Discount</th>
                                        <th>Harga Asli</th>
                                        <th>Harga Setelah Discount</th>                                    
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.rendercartdetail()}
                                </tbody>
                            </table>
                            {this.renderReceiverDetail(this.state.idDetails)}
                        </div>
                    </div>
                    :
                    null
                    }
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        id : state.user.id,
        username : state.user.username
    }
}

export default connect(mapStateToProps)(History) ;
