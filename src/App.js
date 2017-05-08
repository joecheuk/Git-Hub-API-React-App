import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

const Card = (props) => {
  return (
    <div>
      <img src={props.people.avatar_url} alt="logo" style={{width: 75}} />
      <div style={{display: 'inline-block', margin: 2}}> 
        <p>{props.people.name}</p> 
        <p>{props.people.company}</p> 
      </div>
    </div>
    )
}

class CardList extends Component {
  render(){
    return (
      <div>
        {this.props.people.map((p, i) => <Card key={i} people={p}/>)}
      </div>
    )
  }
}

class Form extends Component{
  state = { inputName: "" }
  gitHubApiUrl = "https://api.github.com/users/"
  onClickSubmitForm = (event) => {
    event.preventDefault()
    //console.log(`${this.gitHubApiUrl}${this.state.inputName}`)
    axios.get(`${this.gitHubApiUrl}${this.state.inputName}`)
    .then(
      res => {
        //console.log(res.data)
        this.props.onSubmit(res.data)
      }
    )
    .catch(
      (error) =>
       console.log(error)
    )
  }
  render(){
    return (
      <form onSubmit={this.onClickSubmitForm}>
        <input type="text" value={ this.state.inputName } placeholder="Enter anyone's github id" onChange={(event) => this.setState({ inputName: event.target.value })} />
        <button type="submit">Add New Card</button>
      </form>
    )
  }
}


class App extends Component {
  state = {data: []}

  addNewCard = (res) => {
    this.setState(prevState =>
        ({
          data: prevState.data.concat(res)
        })
      )
  }

  render() {
    return (
      <div className="App">
        <Form onSubmit={this.addNewCard} />
        <CardList people={this.state.data} />
      </div>
    );
  }
}

export default App;
