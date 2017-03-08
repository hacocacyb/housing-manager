import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

export default function(props) {
  return (
    <BootstrapButton
      bsStyle="primary"
      bsSize="xsmall"
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.text || props.children}
    </BootstrapButton>
  )
}
