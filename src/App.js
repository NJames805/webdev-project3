/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';

// Import other components
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Credits from './components/Credits';
import Debits from './components/Debits';
import axios from 'axios';

class App extends Component {
  constructor() {  // Create and initialize state
    super(); 
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: 'Joe Smith',
        memberSince: '11/22/99',
      },
      isLoading: true
    };
  }

  //Update Credit List
  addCredit = (credit) =>{
    const NewCreditList = [...this.state.creditList, credit];
    console.log(NewCreditList);
    //update balance
    const NewBalance = Number(credit.amount) + this.state.accountBalance;
    console.log(NewBalance);
    //set changes
    this.setState({
      accountBalance: NewBalance,
      creditList: NewCreditList
    })
  }

  //Update Debit List
  addDebit = (debit) =>{
    //add debit to debit list
    const newDebitlist = [...this.state.debitList, debit];
    console.log(newDebitlist)
    //update account balance
    const newbalance = this.state.accountBalance - Number(debit.amount);
    console.log(newbalance)
    //setState
    this.setState({
      accountBalance: newbalance,
      debitList: newDebitlist
    })
  }

  //Fetch Data from api
  async componentDidMount(){
    try {
      //fetch credits
      const credits = await axios.get("https://johnnylaicode.github.io/api/credits.json")
      let credit = 0,debit = 0, clist = [], dlist = [];
      for( let i = 0; i < credits.data.length; i++){
        credit += Number(credits.data[i].amount);
        clist.push(credits.data[i])
      }
      //fetch debits
      const debits =  await axios.get("https://johnnylaicode.github.io/api/debits.json")
      for( let i = 0; i < debits.data.length; i++){
        debit += Number(debits.data[i].amount);
        dlist.push(debits.data[i])
      }
      //update balance
      this.setState({
        accountBalance: credit - debit,
        creditList: clist,
        debitList: dlist,
        isLoading: false 
      }, () => {
        console.log("Updated values:", this.state.accountBalance, this.state.creditList, this.state.debitList);
      })
    } catch (error) {
      console.log("Error is:",error)
    }
  }

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {  
    const newUser = {...this.state.currentUser};
    newUser.userName = logInInfo.userName;
    this.setState({currentUser: newUser})
  }

  // Create Routes and React elements to be elemented using React components
  render() {  
    // Create React elements and pass input props to components
    const HomeComponent = () => (<Home accountBalance={this.state.accountBalance} />)
    const UserProfileComponent = () => (
      <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />
    )
    const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />)
    const CreditsComponent = () => (<Credits accountBalance={this.state.accountBalance} credits={this.state.creditList} isLoading={this.state.isLoading} addCredit={this.addCredit} />) 
    const DebitsComponent = () => (<Debits accountBalance={this.state.accountBalance} debits={this.state.debitList} isLoading={this.state.isLoading} addDebit={this.addDebit}/>) 

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      //Bring basename page when deploying to github pages
      <Router basename="/webdev-project3">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/userProfile" element={<UserProfileComponent />} />
          <Route path="/login" element={<LogInComponent />} />
          <Route path="/credits" element={<CreditsComponent />} />
          <Route path="/debits" element={<DebitsComponent />} />
        </Routes>
      </Router>
    );
  }
}

export default App;