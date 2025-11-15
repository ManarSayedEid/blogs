export default function Loader() {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3 animate-spin">
                    <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full"></div>
                </div>
                <p className="text-gray-600 font-medium">Loading news...</p>
            </div>
        </div>
    )
}