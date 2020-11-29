import './App.css';
import React, { Component } from "react";
import axios from "axios";
import { Modal } from "antd";
import "antd/dist/antd.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tekkom: [],

    };
  }
  handleButton = (nama) => {
    alert(nama);
  };
  handleTambahOrang = () => {
    this.setState({
      visible: true,
    });
  };
  
    componentDidMount() {
      axios({
        method: "get",
        url: "http://api.tvmaze.com/schedule?country=US&date=2014-12-01",
        headers: {
          accept: "*/*",
        },
      })
      .then((data) => {
        console.log(data.data);
        this.setState({
          tekkom: data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
    render() {
      return (
      <div>
        <div className="boxWhite">
          <center>
            <h1>Tugas RSBK Modul 5 Kelompok 39</h1>
            <h4>The schedule is a complete list of episodes that air in a given country on a given date. This endpoint will only return episodes that are tied to a specific country, either via a Network or via a local Web Channel such as HBO Max or Sky Go. Episodes from global Web Channels like Netflix are not included.</h4>
            <h6>Note that contrary to what you might expect, the ISO country code for the United Kingdom is not UK, but GB.</h6>
          </center>
          <Modal
          title="TV Show"
          centered
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={() => this.setState({ visible: false })}
          width={500}
          >
            <div style={{ textAlign: "center" }}>
              <p>Name : </p>{}
            </div>
            </Modal>
            {this.state.tekkom.map((results, index) => {
              return (
              <div className="card" key={results.nama}>
                  <h3 className="card-title">{results.name}</h3>
                  <h5 className="card-title">Season : {results.season}</h5>
                  <h5 className="card-title">Genre : {results.show.genres[0]}</h5>
                  <h5 className="card-title">Language : {results.show.language}</h5>
                  <h5 className="card-title">Country : {results.show.network.country.name}</h5>
                  <h5 className="card-title">Channel : {results.show.network.name}</h5>
                  <h5 className="card-title">Premiered : {results.show.premiered}</h5>
                  <h5 className="card-title">Status : {results.show.status}</h5>
              </div>
              );
            })}
        </div>
      </div>
      );
    }
}
