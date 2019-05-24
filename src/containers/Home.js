import React, { Component } from 'react';
import LoginForm from '../components/LoginForm';
import Navigation from '../components/Navigation';
import axios from 'axios';

class Home extends Component {
    state = {
        studentName: '',
        studentId: '',
        requestInvalidText: '',
        fetching: false
    };
    handleStudentNameChange = (event) => {
        this.setState({
            studentName: event.target.value
        });
    };
    handleStudentIdChange = (event) => {
        this.setState({
            studentId: event.target.value
        });
    };
    handleRequestSubmit = (event) => {
        event.preventDefault();
        this.setState({ fetching: true });
        axios.post('https://tu-issuer.herokuapp.com/recipient', {
            name: this.state.studentName,
            id: this.state.studentId
          })
          .then((response) => {
            let res = response.data;
            this.setState({ fetching: false });
            if (res.key0) {
                if(res.status === 'success') {
                    this.setState({ 
                        requestInvalidText: '',
                    });
                    localStorage.setItem("key0", res.key0);
                    localStorage.setItem("identity", this.state.studentId);
                    this.props.history.push('/blockchain-project/add');
                }
            }else {
                if(res === 'invalid_name') {
                    this.setState({ requestInvalidText: 'Student name must contain only English characters'});
                } else if(res === 'invalid_id') {
                    this.setState({ requestInvalidText: 'Student ID must contain only number'});                
                } else if(res === 'id_length') {
                    this.setState({ requestInvalidText: 'Student ID must consisting of 10 digits'});                
                } else if(res === 'invalid_name_id') {
                    this.setState({ requestInvalidText: 'Student name and Student ID are invalid'});
                }
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <LoginForm 
                    studentName={this.state.studentName}
                    studentId={this.state.studentId}
                    studentNameChange={this.handleStudentNameChange}
                    studentIdChange={this.handleStudentIdChange}
                    submit={this.handleRequestSubmit}
                    invalidText={this.state.requestInvalidText}
                    fetching={this.state.fetching}
                />
            </React.Fragment>
        );
    }
}

export default Home;