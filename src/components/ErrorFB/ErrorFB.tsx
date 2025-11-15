export default function ErrorFB({ error }: { error: string }) {
        return (
            <div className="p-6 text-center">
                <h3 className="text-lg font-semibold text-red-600 mb-1">Failed to Load News</h3>
                <p className="text-red-600 mb-4">{error}</p>
            </div>
        )
}