import React from 'react'

export default function(props) {
  return (
    <button
      className={"w3-btn w3-padding-tiny w3-margin-right " + props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </button>
  )
}
