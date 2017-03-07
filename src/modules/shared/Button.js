import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

export default function(props) {
  return (
    <BootstrapButton
      className={"w3-btn w3-safety-green w3-ripple w3-padding-tiny w3-round-large " + props.className}
      bsStyle="primary"
      bsSize="small"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </BootstrapButton>
  )
}
