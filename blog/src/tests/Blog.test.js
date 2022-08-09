import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Blog from '../components/Blog'
import '@testing-library/jest-dom/extend-expect'

let component;

const blogs = [
    {
        title: "Daret y Xu",
        Author: "Marxelu",
        likes: "272",
        url: "mimarxelu.com"
    }
]

beforeEach(() => {
    component = render(<Blog blog={blogs[0]} blogs={blogs} setBlogs={() => {}} notifications={() => {}}/>)
})

test('firstly all info is NOT shown', () => {
    const elem = component.container.querySelector('.blogCompletxum')
    expect(elem).toHaveStyle('display: none')
})

test('all info is shown when the button is clicked', () => {
    const button = component.container.querySelector('.showButton')
    fireEvent.click(button)
    const elem = component.container.querySelector('.blogCompletxum')
    expect(elem).not.toHaveStyle('display: none')
})

test('two clicks button = 2 function calls', () => {
    const addLikes = jest.fn()
    const myComponent = render(<Blog blog={blogs[0]} blogs={blogs} setBlogs={() => {}} notifications={() => {}} addLikes={addLikes}/>)
    const button = myComponent.container.querySelector('#likesButtonViewBlog')
    for(let i=0;i<2;i++) fireEvent.click(button)
    expect(addLikes.mock.calls).toHaveLength(2)
})

