const BASE_URL = 'https://newsapi.org/v2/everything'
const API_KEY = import.meta.env.VITE_NEWSAPI_KEY

export type Article = {
    source: { id: string | null; name: string }
    author: string | null
    title: string
    description: string | null
    url: string
    urlToImage: string | null
    publishedAt: string
    content: string | null
}

export type NewsApiResponse = {
    status?: 'ok' | 'error'
    code?: string
    message?: string
    totalResults?: number
    articles?: Partial<Article>[]
}

export async function fetchNews(
    page: number = 1,
): Promise<NewsApiResponse> {

    const params = new URLSearchParams({
        q: 'politics OR economy OR technology OR environment OR health OR religion',
        apiKey: API_KEY,
        language: 'en',
        page: page.toString(),
        pageSize: '10',
    })


    const response = await fetch(`${BASE_URL}?${params}`)
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
    }

    return response.json()

}