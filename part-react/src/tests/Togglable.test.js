import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import {render, fireEvent} from '@testing-library/react'
import { prettyDOM } from '@testing-library/react'
import Togglable from '../components/Togglable'

describe('<Togglable />', () => {
    let component
    beforeEach(() => {
        component = render(
            <Togglable buttonLabel="show...">
                <div className='divTest'/>
            </Togglable>
        )
    })

    test('render its children', () => {
        expect(component.container.querySelector('.divTest')).toBeDefined()
    })

    test('at start the children are not displayed', () => {
        const elem = component.container.querySelector('.togglableContent')
        console.log(prettyDOM(elem))
        expect(elem).toHaveStyle('display: none')
    })

    test('after clicking the button, children are displayed', () => {
        const button = component.getByText('show...')
        fireEvent.click(button)
        const elem = component.container.querySelector('.togglableContent')
        expect(elem).not.toHaveStyle('display: none')
    })

})