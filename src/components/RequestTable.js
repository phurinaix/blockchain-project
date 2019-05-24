import React, { Component } from 'react';
import { Table, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';

class RequestTable extends Component {
    state = {
        credential: [],
        fetching: false
    }
    deleteHandler = (id) => {
        axios.delete(`https://tu-issuer.herokuapp.com/recipient/credential/${id}`)
                .then(response => {
                    if (response.data === 'success') {
                        this.setState({
                            credential: this.state.credential.filter(c => c.id !== id)
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
    }
    componentDidMount = () => {
        this.setState({ fetching: true });
        var identity = localStorage.getItem("identity");
        axios.get(`https://tu-issuer.herokuapp.com/recipient/credential/${identity}`)
                .then(response => {
                    if (typeof response.data === 'object') {
                        this.setState({ 
                            credential: response.data,
                            fetching: false
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
    }    
    render() {
        return (
            <React.Fragment>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Diploma</th>
                            <th>Transcript</th>
                            <th>Requested Time</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.credential.length > 0 && this.state.credential.map((c, index) => {
                            return (
                                <tr key={index}>
                                    <td>{++index}</td>
                                    <td>{c.diploma}</td>
                                    <td>{c.transcript}</td>
                                    <td>{c.created_time}</td>
                                    <td><Button variant="danger" onClick={() => this.deleteHandler(c.id)}>Delete</Button></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
                { this.state.fetching && 
                    <div className="text-center mt-4">
                        <Spinner animation="border"role="status"><span className="sr-only">Loading...</span></Spinner>
                    </div>
                }
            </React.Fragment>
        );
    }
}

export default RequestTable;