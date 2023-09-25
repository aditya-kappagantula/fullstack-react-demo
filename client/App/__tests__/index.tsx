import { render, screen } from '@testing-library/react'
import React from 'react'
import App from '../index'

describe('App tests', () => {
  it('should contains the heading 1', () => {
    render(<App />)
    const heading = screen.getByText(/Typescript is awesome!!/i)
    expect(heading).not.toBeInTheDocument()
  })
})
