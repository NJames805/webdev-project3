/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import { useState } from 'react';

const Credits = (props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  if (props.isLoading) {
    return (
      <div>
        <h1>Credits</h1>
        <p>Loading credits...</p>
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
  const submitCredit = (e) => {
    e.preventDefault();
    console.log(description,amount);
    //create credit
    const newCredit = {
      description,
      amount: parseFloat(amount),
      date: new Date().toISOString(),
    };

    //add credit
    console.log("New Credit:", newCredit);

    //call parent function to update credit list
    if (props.addCredit) {
      props.addCredit(newCredit);
    }

  }

  return (
    <div>
      <h1>Credits</h1>
      <hr></hr>
      <div>
        Balance: {props.accountBalance}
      </div>
      <form onSubmit={submitCredit}>
        <input placeholder='description' value={description} onChange={(e)=>{setDescription(e.target.value)}}>
        </input>
        <input placeholder='amount' value={amount} type="number" step="0.01" onChange={(e)=>{setAmount(e.target.value)}}>
        </input>
        <button type='submit'>
          Submit Credit
        </button>
      </form>
      {props.credits.map((credit, index) => (
        <div key={index} style={{ fontSize: "small", marginBottom: "1rem" }}>
          <p><strong>Description:</strong> {credit.description}</p>
          <p><strong>Amount:</strong> ${Number(credit.amount || 0).toFixed(2)}</p>
          <p><strong>Date:</strong> {credit.date ? credit.date.slice(0, 10) : "No date available"}</p>
          <hr />
        </div>
      ))}
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;