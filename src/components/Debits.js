/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import {Link} from 'react-router-dom';
import { useState } from 'react';

const Debits = (props) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  // Create the list of Debit items
  let debitsView = () => {
    const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date ? debit.date.slice(0, 10) : "No date available";
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }
  // Handle the debit submit
  const HandleSubmit = (e) =>{
    e.preventDefault();
    let date = new Date().toISOString().slice(0,10);
    //create debit
    const debitList = {
      amount,
      description,
      date
    }
    
    //add debit

    console.log("New Debit", debitList);

    if(props.addDebit){
      props.addDebit(debitList)
    }
  }
  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

      <hr></hr>
      <div>
        Balance: {props.accountBalance}
      </div>

      {debitsView()}

      <form onSubmit={HandleSubmit}>
        <input type="text" name="description" placeholder="description" value={description} onChange={(e) => {setDescription(e.target.value)}}/>
        <input type="number" name="amount" placeholder='amount' value={amount} onChange={(e) => {setAmount(e.target.value)}}/>
        <button type="submit">Add Debit</button>
      </form>
      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Debits;