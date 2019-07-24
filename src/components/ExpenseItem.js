import React from 'react'
import {MdEdit, MdDelete} from 'react-icons/md'

const ExpenseItem = ({expense, handleEdit, handleDelete}) => {
    // we can take values in two ways like this or in the bracket itself
    const {id, charge, amount} = expense
    return (
        <li className="item">
        <div className="info">
            <span className="expense">{charge}</span>
            <span className="amount">${amount}</span>
            
        </div>
<div>
    <button className="edit-btn"
    onClick={()=>{handleEdit(id)}} aria-label="edit button">
    <MdEdit/>
    </button>
    <button  onClick={()=>{handleDelete(id)}} className="clear-btn" aria-label="delete button">
    <MdDelete/>
    </button>
</div>


        </li>
    )
}

export default ExpenseItem
