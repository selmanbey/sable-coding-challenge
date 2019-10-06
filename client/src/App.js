import React, { Component } from 'react';
import './css/App.css';
import TrsCard from "./components/TrsCard";

class App extends Component {
  constructor(props) {
    super(props);

    this.updateApp = this.updateApp.bind(this);
  }

  state = {
    transactions: []
  };

  async fetchUnresolvedTransactions() {
    let transactions = await fetch('/api/get-unresolved-transactions');
    transactions = await transactions.json();

    let sortedTrs = transactions.sort( (trs1, trs2) =>
      new Date(trs1.date) > new Date(trs2.date) ? -1 : 1
    );

    this.setState({ transactions: sortedTrs } );
  }

  updateApp() {
    this.fetchUnresolvedTransactions();
  }

  componentDidMount() {
    this.updateApp()
  }

  render() {
    return (
      <div className="App">
        <h1>Suspicious Transactions</h1>
        { this.state.transactions.map( (card, index) =>
          <TrsCard
            key={ index }
            id={ card.id }
            from={ card.from }
            to={ card.to }
            amount={ card.amount }
            date={ card.date}
            updateApp={ this.updateApp }/>
          )}
      </div>
    );
  }
}

export default App;
