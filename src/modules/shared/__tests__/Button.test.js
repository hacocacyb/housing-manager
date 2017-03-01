import React from 'react'
import ReactDOM from 'react-dom'
import Button from '../Button'
import renderer from 'react-test-renderer'

describe('Button', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
  });


  it('has a default set of props', () => {
    let btn = renderer.create(<Button />)
    let tree = btn.toJSON();

    expect(tree.props.disabled).toEqual(undefined)
  })

  it('takes text from text property or children', () => {
    const text = "MyButtonText";
    let btn = renderer.create(
      <Button text={text}/>
    )
    let tree = btn.toJSON();
    expect(tree.children[0]).toEqual(text)

  })

  it('takes text from children', () => {
    const text = "MyButtonText";
    let btn = renderer.create(
      <Button>{text}</Button>
    )
    let tree = btn.toJSON();
    expect(tree.children[0]).toEqual(text)
  })

})
