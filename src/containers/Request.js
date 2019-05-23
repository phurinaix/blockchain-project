import React, { Component } from 'react';
import NavigationInside from '../components/NavigationInside';
import axios from 'axios';

class Request extends Component {
    componentDidMount = () => {
        axios.post('https://tu-issuer.herokuapp.com/recipient/session', {
                key: localStorage.getItem("key0")
            })
            .then(response => {
                let res = response.data;
                if (res === 'unauthorized') {
                    this.props.history.push('/blockchain-project');
                }
            })
            .catch(err => {
                console.log(err);
            });
    };
    render() {
        return (
            <React.Fragment>
                <NavigationInside />
                <div>
                    <h2>Request</h2>
                </div>
            </React.Fragment>
        );
    };
}

export default Request;