import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default class ShowBook extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentDidMount() {
        axios.get('https://mern-backend-300354368.onrender.com/')
            .then(response => {
                this.setState({ data: response.data });
            })
            .catch(error => {
                console.error(error);
            });
    }

    handleDelete = (id) => {
        axios.delete(`https://mern-backend-300354368.onrender.com/${id}`)
            .then(response => {
                // console.log(response);
                const newData = this.state.data.filter(item => item._id !== id);
                this.setState({ data: newData });
            })
            .catch(error => {
                console.error(error);
            });
    }

    

    render() {
        const { data } = this.state;
        // console.log("data is : ", data);

        const myStyle = {
            width: '50px',
            height: '50px',
            backgroundColor: 'orange',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            color: '#fff',
            margin: 'auto',
            marginTop: '20px',
          };


        return (
            <div className="BookList">
                <div className="col-md-12">
                    <br />
                    <h2 className="display-4 text-center">Books in theList</h2>
                </div>
                <div className="circle" style={myStyle}>{data.length}</div>
                <div className="col-md-11">
                    <Link to="/" className="btn btn-info float-right"> + Add New Book</Link>
                    <br /><br />
                    <hr />
                </div>
                <div className="list" style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {data.map(item => (
                        <div key={item._id} className="card-container" style={{ flexBasis: '300px', marginRight: '20px', marginBottom: '20px', border: '1px solid #ccc', padding: '20px', borderRadius: '5px' }}>
                            <img src="https://images.unsplash.com/photo-1495446815901-a7297e633e8d" alt="Books" height="200"/>
                            <div className="desc">
                                <h2><a href={`/showbook/${item._id}`}>{item.title}</a></h2>
                                <h2>{item.author}</h2>
                                <p>{item.description} &nbsp;&nbsp;&nbsp;<button style={{border: '2px solid red', padding: '10px', borderRadius: '5px', backgroundColor: 'red', color: 'white' }} onClick={() => this.handleDelete(item._id)}>X</button></p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    } 
}