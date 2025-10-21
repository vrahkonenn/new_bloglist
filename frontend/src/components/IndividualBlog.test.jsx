import { render, screen } from '@testing-library/react'
import IndividualBlog from './IndividualBlog'
import userEvent from '@testing-library/user-event'

test('renders content', () => {
  const blog = {
    title: "Vamma testaus",
    author: "Veeti",
    url: "testivamma.com",
    likes: 1,
    user: {username: 'testi'}
  }

  render(<IndividualBlog blog={blog} />)

  const element = screen.getByText('Vamma testaus')
	
  expect(element).toBeDefined()
})

test('after clicking the button, "url", "likes" and "added user" displayed', async () => {
    const blog = {
    title: "Vamma testaus",
    author: "Veeti",
    url: "testivamma.com",
    likes: 1,
    user: {username: 'testi'}
  }

  render(<IndividualBlog blog={blog} />)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const urlElement = screen.getByText('testivamma.com')
  const likeElement = screen.getByText('1')
  const userElement = screen.getByText('testi')

  expect(urlElement).toBeVisible()
  expect(likeElement).toBeVisible()
  expect(userElement).toBeVisible()

})

test('after clicking like twice, like operation happens twice', async () => {
  const blog = {
    title: "Vamma testaus",
    author: "Veeti",
    url: "testivamma.com",
    likes: 1,
    user: {username: 'testi'}
  }

  const mockHandler = vi.fn()
  render(<IndividualBlog blog={blog} likeBlog={mockHandler}/>)

  const user = userEvent.setup()
  const showButton = screen.getByText('show')
  await user.click(showButton)

  const likeButton = screen.getByText('Like')
  await user.click(likeButton) 
  await user.click(likeButton) 

  expect(mockHandler.mock.calls).toHaveLength(2)
})