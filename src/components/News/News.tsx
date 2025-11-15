import { useEffect, useState } from "react"
import Loader from "../Loader/Loader"
import ErrorFB from "../ErrorFB/ErrorFB"
import ArticleCard from "../ArticleCard/ArticleCard"
import { fetchNews, type NewsApiResponse, type Article } from "../../data/fetchNews"

export default function News() {
    const [news, setNews] = useState<NewsApiResponse | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await fetchNews(page)
                if (data?.status === 'error') {
                    setError(data.message!)
                } else {
                    setNews(data)
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Network error')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, [page])

    if (loading) {
        return <Loader />
    }

    if (error) {
        return <ErrorFB error={error} />
    }

    const articles = news?.articles ?? []

    if (articles.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>No articles found. Try again later.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {articles.map((article) => (
                    <ArticleCard key={article.url} article={article as Article} />
                ))}
            </div>

            <div className="flex justify-center gap-4 mt-8">
                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition cursor-pointer"
                >
                    Previous
                </button>
                {/* // TODO: next button should be disabled when there are no more articles, this is tricky because the API doesn't provide total pages and this is enough for demo purposes */}
                <button
                    onClick={() => setPage(page + 1)}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition cursor-pointer"
                >
                    Next
                </button>
            </div>
        </div>
    )
}
