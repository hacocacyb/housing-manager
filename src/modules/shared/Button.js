import React from 'react'

export default function(props) {
  return (
    <button
      className={"w3-btn w3-safety-green w3-ripple w3-padding-tiny w3-round-large " + props.className}
      style={{marginRight:8}}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </button>
  )
}
