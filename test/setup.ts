import { afterEach, beforeAll } from 'vite-plus/test'
import fetchMock from 'fetch-mock'

// Mock global fetch before all tests
beforeAll(() => {
  fetchMock.mockGlobal()
})

// Clear routes and history after each test
afterEach(() => {
  fetchMock.removeRoutes()
  fetchMock.clearHistory()
})
