import React from 'react'
import { shallow } from 'enzyme'
import Resource from './Resource'

describe('Resource', () => {
  let wrapper

  const resource = {
    categories: ['category-one', 'category-two'],
    description: 'This is a really useful resource',
    name: 'My Cool Resource',
    url: 'http://example.org',
  }

  beforeEach(() => {
    wrapper = shallow(<Resource resource={resource}/>)
  })

  it('shows the resource name', () => {
    expect(wrapper.find('[data-qa="resource-name"]').text().trim())
      .toEqual(resource.name)
  })

  it('shows the resource description', () => {
    expect(wrapper.find('[data-qa="resource-description"]').text().trim())
      .toEqual(resource.description)
  })

  it('shows the resource URL', () => {
    expect(wrapper.find('[data-qa="resource-link"]').props().href)
      .toEqual(resource.url)
  })

  it('shows the resource categories', () => {
    const categories = wrapper.find('[data-qa="resource-category"]').map(el => el.text().trim())
    resource.categories.forEach(category => {
      expect(categories).toContain(category)
    })
  })
})
