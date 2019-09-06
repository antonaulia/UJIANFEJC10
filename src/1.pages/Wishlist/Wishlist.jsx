import React, { Component } from 'react';
import Axios from 'axios'
import {connect} from 'react-redux'
import {urlApi} from '../../3.helpers/database'
import {Link} from 'react-router-dom'

export class Wishlist extends Component {
    state = {
        Productwishlist : [],
        isCheckout : false,
        inputPenerima : '',
        inputAlamat : '',
        inputKodePos : '',
        inputUang : 0
    }

    componentDidMount(){
        this.getwishlist()
    }

    getwishlist = () => {
        Axios.get(urlApi + 'wishlist?userId='+this.props.id)
        .then(res => {
            console.log(res)
            this.setState({Productwishlist : res.data})
        })
        .catch(err => {
            console.log(err)
        })
    }

    renderwishlist=()=>{
        var i=0
        var jsx = this.state.Productwishlist.map((val,idx)=>{
            if(val.wishlist){
                i+=1
                return(
                    <tr>
                        <td>{i}</td>
                        <td><Link to={"/product-details/"+val.productId}>{val.productName}</Link></td>
                    </tr>
                )
            }else{
                return null
            }
        })
        return jsx
    }

    render() {
        return (
            <div className='container'>
                <h1>ini Wishlist !</h1>
                <table className='table table-bordered' >
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama Product</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderwishlist()}
                    </tbody>
                </table>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        username : state.user.username,
        id : state.user.id
    }
}

export default connect(mapStateToProps)(Wishlist);
