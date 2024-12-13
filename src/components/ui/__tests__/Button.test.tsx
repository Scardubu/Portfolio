import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../shared/Button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toHaveTextContent('Click me')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('shows loading state', () => {
    render(<Button isLoading>Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('pointer-events-none')
  })

  it('applies variant styles correctly', () => {
    render(<Button variant="outline">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('border-primary-600')
  })

  it('applies size styles correctly', () => {
    render(<Button size="lg">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('h-12')
  })

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
