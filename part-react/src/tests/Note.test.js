import React from "react";
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import { prettyDOM } from "@testing-library/react";
import Note from '../components/Note'

test('render content', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const component = render(<Note note={note}/>)
    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    const elem = component.getByText('Component testing is done with react-testing-library')
    expect(elem).toBeDefined()
    const div = component.container.querySelector('.note')
    const li = component.container.querySelector('li')
    console.log(prettyDOM(li))
    expect(div).toHaveTextContent('Component testing is done with react-testing-library')
})

test('clicking in a note calls to the controller', () => {
    const note = {
        content: 'Component testing is done with react-testing-library',
        important: true
    }
    const mockHandler = jest.fn()
    const component = render(
        <Note note={note} toggleImportance={mockHandler}/>
    )
    const button = component.container.querySelector('button')
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(1)
})