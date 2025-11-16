import { render, screen, waitFor } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { fetchNews } from '../../data/fetchNews'
import News from './News'

vi.mock('../../data/fetchNews', () => ({
    fetchNews: vi.fn(),
}))

const fetchNewsMocked = vi.mocked(fetchNews)

const MOCK_ARTICLES = [
    {
        source: { id: null, name: 'Source A' },
        author: 'Author A',
        title: 'Article A',
        description: 'Desc A',
        url: 'https://a.example',
        urlToImage: null,
        publishedAt: new Date().toISOString(),
        content: null,
    },
    {
        source: { id: null, name: 'Source B' },
        author: 'Author B',
        title: 'Article B',
        description: 'Desc B',
        url: 'https://b.example',
        urlToImage: null,
        publishedAt: new Date().toISOString(),
        content: null,
    },
]

describe('News component', () => {
    beforeEach(() => {
        vi.resetAllMocks()
    })

    it('shows loader then renders articles on success', async () => {
        fetchNewsMocked.mockResolvedValueOnce({ status: 'ok', articles: MOCK_ARTICLES })

        render(<News />)

        expect(screen.getByText(/Loading/i)).toBeInTheDocument()

        await waitFor(() => {
            expect(screen.getByText('Article A')).toBeInTheDocument()
            expect(screen.getByText('Article B')).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /Previous/i })).toBeDisabled()
            expect(screen.getByRole('button', { name: /Next/i })).toBeEnabled()
        })
    })

    it('renders error state when API returns error', async () => {
        fetchNewsMocked.mockResolvedValueOnce({ status: 'error', message: 'Bad request' })

        render(<News />)

        await waitFor(() => {
            expect(screen.getByText(/Failed to Load News/i)).toBeInTheDocument()
            expect(screen.getByText(/Bad request/i)).toBeInTheDocument()
        })
    })
})
