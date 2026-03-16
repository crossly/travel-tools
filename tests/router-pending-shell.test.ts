// @vitest-environment jsdom
import { createElement } from 'react'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { getRouter } from '@/router'

describe('router pending shell', () => {
  it('provides a non-empty global pending component for lazy route transitions', () => {
    const PendingComponent = getRouter().options.defaultPendingComponent

    expect(PendingComponent).toBeTypeOf('function')

    const view = render(createElement(PendingComponent!))

    expect(view.container.querySelector('[data-route-pending-shell="true"]')).toBeTruthy()
  })
})
