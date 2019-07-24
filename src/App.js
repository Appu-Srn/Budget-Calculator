import React, {Fragment, useState, useEffect} from 'react';

import ExpenseList from './components/ExpenseList'
import ExpenseForm from './components/ExpenseForm'
import Alert from './components/Alert'
import uuid from 'uuid/v4'
import './App.css';

// const initialExpenses = [
//   {id:uuid(), charge:"rent", amount:1600},
//   {id:uuid(), charge:"car payment", amount:400},
//   {id:uuid(), charge:"credit card beliil", amount:1200}
// ]



// localStorage.getItem()
// localStorage.setItem()

const initialExpenses = localStorage.getItem('expenses')? JSON.parse(localStorage.getItem("expenses")) : []


function App() {

// ****************** state values ***************
// all expenses , add expenses

const [expenses, setExpenses]=useState(initialExpenses);
// single expense
const [charge, setCharge] = useState('');

// single amount
const [amount, setAmount] = useState('');

//alert
const [alert, setAlert] = useState({show:false})

//edit
const [edit, setEdit] = useState(false);

// edit item
const [id, setId] = useState(0);

// ****************** here use effect ***************
useEffect(()=>{
  console.log('we called useEffect');
  localStorage.setItem('expenses',JSON.stringify(expenses));
},[expenses]);




// ****************** functionality ***************
// handle charge
const handleCharge = e => {
  setCharge(e.target.value)
}

// handle amount
const handleAmount = e => {
  setAmount(e.target.value)
}

// handle alert
const handleAlert = ({type, text})=>{
  setAlert({show:true, type, text});
  setTimeout(()=>{
    setAlert({show:false})
  },3000);
}

// handle submit
const handleSubmit = e => {
  e.preventDefault();

if(charge !== ' ' && amount>0){

  if(edit){
let tempExpenses = expenses.map(item => {
  return item.id === id? {...item, charge,amount}
   :item;
});
setExpenses(tempExpenses);
setEdit(false);
handleAlert({type:"success", text:"Item edited"})
  }
else{
  const singleExpense = {id:uuid(), charge, amount}
  setExpenses([...expenses, singleExpense])
  handleAlert({type:"success", text:"Item added"})

}



setCharge('');
setAmount('');

}else{
  handleAlert({type:`danger`, text:`charge cant be empty value and 
  amount value has to be bigger than zero`})
  setCharge('');
setAmount('');
  
}}

// clear all items
const clearItems = () => {
  setExpenses([]);
  handleAlert({type:'danger', text:'all items deleted'})
};

//handle delete
const handleDelete = (id) => {
 let tempExpenses = expenses.filter(item => item.id !== id);

 setExpenses(tempExpenses);
 handleAlert({type:'danger', text:'item deleted'})
};

//handle Edit
const handleEdit = (id) => {

let expense = expenses.find((item)=>{
 return (item.id === id)
})

let {charge, amount}=  expense;
setCharge(charge);
setAmount(amount);

setEdit(true);
setId(id)

};





  return (
    <Fragment>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

    <h1>budget calculator</h1>
    <main className="App">





    <ExpenseForm charge={charge} amount={amount}
     handleAmount={handleAmount}
     handleCharge={handleCharge}
     handleSubmit={handleSubmit}
     edit={edit}
     
     />

     <ExpenseList
     expenses={expenses}
     handleDelete={handleDelete}
     handleEdit={handleEdit}
     clearItems={clearItems}
     />
    </main>
   <h1>
     total spending : <span className="total">

     $ {expenses.reduce((acc,curr)=>{
       return (acc += parseInt(curr.amount));
     },0)}
     </span>
   
   </h1>
   

    </Fragment>

  );
}

export default App;
