import { ProtectedRoute } from "../components/ProtectedRoute";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        <h1 className="text-3xl font-bold p-6">Dashboard</h1>
        <p className="text-center text-gray-600">Dashboard content will go here</p>
      </div>
    </ProtectedRoute>
  )
}
