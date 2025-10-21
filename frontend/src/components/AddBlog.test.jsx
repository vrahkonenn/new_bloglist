import { render, screen } from '@testing-library/react'
import AddBlog from './AddBlog'
import userEvent from '@testing-library/user-event'
import { expect } from 'vitest'

test('Adding blog with correct information', async () => {
	const user = userEvent.setup()
	const mockHandler = vi.fn()

	render(
  	<AddBlog
  	  addBlog={mockHandler}
  	  updateBlog={() => {}}
  	  blogs={[]}
  	  errorMessageSetter={() => {}}
  	/>
	)

	const title = screen.getByPlaceholderText('title')
	const author = screen.getByPlaceholderText('author')
	const url = screen.getByPlaceholderText('url')
	const likes = screen.getByPlaceholderText('likes')
	const button = screen.getByText('Add')

	await user.type(title, 'Mursujen kasvatus')
	await user.type(author, 'Tarmo Mursuvaara')
	await user.type(url, 'mursu.com')
	await user.type(likes, '1000')
	await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)
	expect(mockHandler.mock.calls[0][0]).toEqual({
		title: 'Mursujen kasvatus',
		author: 'Tarmo Mursuvaara',
		url: 'mursu.com',
		likes: '1000'
	})
	
})
