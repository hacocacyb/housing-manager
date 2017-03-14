import React from 'react'

export default function(props) {
  return <div style={{height:'100%'}}>
    {props.masked ? <div className="mask" ></div> : null}
    {props.children}
  </div>
}
