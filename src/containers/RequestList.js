import React, { Component } from 'react';
import NavigationInside from '../components/NavigationInside';
import RequestTable from '../components/RequestTable';
import axios from 'axios';

class RequestList extends Component {
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
                <h3 className="text-center mb-5">Request List</h3>
                <RequestTable />
            </React.Fragment>
        );
    }
}

export default RequestList;