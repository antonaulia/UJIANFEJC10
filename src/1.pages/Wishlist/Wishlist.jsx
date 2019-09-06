import React, { Component } from 'react';

export class Wishlist extends Component {
    state = {
        Productwishlist : [],
        isCheckout : false,
        inputPenerima : '',
        inputAlamat : '',
        inputKodePos : '',
        inputUang : 0
    }

    // getDataCart = (id) => {
    //     Axios.get(urlApi + 'products')
    //     .then(res => {
    //         console.log(res)
    //         this.setState({Productwishlist : res.data})
    //         this.props.caricartLength(this.props.id)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    render() {
        return (
            <div className='container'>
                <h1>ini Wishlist !</h1>
                <table>
                    <thead>
                    <tr>
                        <th>No.</th>
                        <th>Nama Product</th>
                    </tr>
                    </thead>
                    <tbody>
                        {/* render wishlist di sini  */}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default Wishlist;
