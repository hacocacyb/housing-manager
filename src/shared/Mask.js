import React from 'react'

export default function(props) {
  console.log('ias masked ? ', props.masked)
  return <div style={{height:'100%'}}>
    {props.masked ? <div className="mask" ></div> : null}
    {props.children}
  </div>
}
