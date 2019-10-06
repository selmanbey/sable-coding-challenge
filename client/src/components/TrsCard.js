import React, {Component} from 'react';
import '../css/TrsCard.css'

class TrsCard extends Component {
  constructor(props) {
    super(props);

    this.resolveTransaction = this.resolveTransaction.bind(this);
  }

  async resolveTransaction(e) {
    e.preventDefault();

    let result = await fetch("api/resolve-transaction", {
      method: "POST",
      body: JSON.stringify({
        id: this.props.id,
        status: e.target.value
      })
    });
    result = await result.json();

    if ( result.success ) {
      this.props.updateApp()
    }
  }

  render() {
    return (
      <div id={ this.props.id } className='trs-card'>
        <p>Transaction Id: <span>{ this.props.id }</span></p>
        <p>From user: <span>{ this.props.from }</span></p>
        <p>To user: <span>{ this.props.to }</span></p>
        <p>Amount: <span>${ this.props.amount }</span></p>
        <button
          value='blocked'
          onClick={ this.resolveTransaction }>Block</button>
        <button
          value='allowed'
          onClick={ this.resolveTransaction }>Allow</button>
      </div>
    );
  }
}

export default TrsCard;