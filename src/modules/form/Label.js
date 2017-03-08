import React from 'react'

export default function Label( props ) {
  return (
    <label style={{
      width: props.labelWidth || 120
    }}>
      {props.placeholder + ':'}
    </label>
  )
}
