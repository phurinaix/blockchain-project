import React, { Component } from 'react';
import axios from 'axios';

class Logout extends Component {
    componentDidMount = () => {
        axios.post('https://tu-issuer.herokuapp.com/recipient/logout', {
                key: localStorage.getItem("key0")
            })
            .then(response => {
                let res = response.data;
                if (res === 'success') {
                    localStorage.removeItem("key0");
                    this.props.history.push('/blockchain-project/');
                } else {
                    this.props.history.goBack();
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <React.Fragment>
            </React.Fragment>
        );
    };
}

export default Logout;