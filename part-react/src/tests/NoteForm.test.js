import {fireEvent, render} from '@testing-library/react'
import '@testing-library/jest-dom'
import NoteForm from '../components/NoteForm'
import React, {useState} from 'react'

test('<NoteForm /> calls a function on submit', () => {
    const noteCreate = jest.fn()
    const comp = render(
        <NoteForm createNote={noteCreate}/>
    )
    const input = comp.container.querySelector('input')
    const form = comp.container.querySelector('form')

    fireEvent.change(input, {
        target: {value: 'Testing forms...'}
    })
    fireEvent.submit(form)

    expect(noteCreate.mock.calls).toHaveLength(1)
    expect(noteCreate.mock.calls[0][0].content).toBe('Testing forms...')

})