import React from 'react'
import { Button as BootstrapButton } from 'react-bootstrap'

export default function(props) {
  var {text, ...other} = props;
  return (
    <BootstrapButton
      bsStyle="primary"
      bsSize="xsmall"
      onClick={props.onClick}
      disabled={props.disabled}
      {...other}
    >
      {text || props.children}
    </BootstrapButton>
  )
}
