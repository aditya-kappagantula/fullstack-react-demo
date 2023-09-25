import { render, screen, waitFor } from '@testing-library/react'
import React from 'react'
import App from '../index'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ test: 100 })
  })
) as jest.Mock

describe('App tests', () => {
  it('should contains the heading 1', async () => {
    render(<App />)
    const heading = await waitFor(() => screen.getByText(/Energy Service App/i))
    expect(heading).toBeInTheDocument()
  })
})
