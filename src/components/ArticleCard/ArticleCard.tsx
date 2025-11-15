import type { Article } from "../../data/fetchNews"

export default function ArticleCard({ article }: { article: Article }) {

    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col h-full bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
        >
            <div className="h-48 overflow-hidden bg-gray-200 flex items-center justify-center">
                {article.urlToImage ? (
                    <img src={article.urlToImage} alt={article.title} className="w-full h-full object-cover" />
                ) : (
                    <div className="text-gray-400 text-4xl">📰</div>
                )}
            </div>

            <div className="flex flex-col grow p-5">
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {article.title}
                </h3>
                {article.description && (
                    <p className="text-sm text-gray-600 grow">
                        {article.description}
                    </p>
                )}
            </div>
        </a>
    )
}