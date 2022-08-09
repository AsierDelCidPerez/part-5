import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Agregar from '../components/Agregar'
import '@testing-library/jest-dom'
import { prettyDOM } from '@testing-library/dom'

test('BlogForm calls the controller', () => {
    const blogs = [
        {
            title: "Daret y Xu",
            Author: "Marxelu",
            likes: "272",
            url: "mimarxelu.com"
        }
    ]

    const addBlog = jest.fn()

    const component = render(
        <Agregar blogs={blogs} setBlogs={() => {}} notifications={() => {}} testing={addBlog}/>
    )

    console.log(prettyDOM(component.container))

    const title = component.container.querySelector('#blogTitleAddBlogForm')
    const author = component.container.querySelector('#blogAuthorAddBlogForm')
    const url = component.container.querySelector('#blogUrlAddBlogForm')

    fireEvent.change(title, {
        target: {value: 'Mi título favorito'}
    })

    fireEvent.change(author, {
        target: {value: 'Michell Gorvbachov'}
    })

    fireEvent.change(url, {
        target: {value: 'milibro.com'}
    })

    const form = component.container.querySelector('form')

    fireEvent.submit(form)

    console.log(prettyDOM(form))

    expect(addBlog.mock.calls).toHaveLength(1)
    console.log(addBlog.mock.calls)
    expect(addBlog.mock.calls[0][0].title).toBe('Mi título favorito')

})