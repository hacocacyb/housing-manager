import React from 'react'
import currency from '../fn/formatCurrency'

export default (props) => {
  return (
    <div key={props.key} className="w3-row">
      <div className="w3-quarter" >{props.date}</div>
      <div className="w3-quarter w3-right-align w3-padding-right">{props.cost ? currency(props.cost) : '-'}</div>
      <div className="w3-quarter w3-right-align w3-padding-right">{props.payment ? currency(props.payment) : '-'}</div>
      <div className="w3-quarter w3-right-align w3-padding-right">{currency(props.balance)}</div>
    </div>
  )
}
