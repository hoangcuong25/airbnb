// /api/report.api.ts
import axiosClient from '@/lib/axiosClient'

export const reportApi = async (payload: { listingId: number, reason: string }) => {
    const response = await axiosClient.post('/api/v1/report', payload)
    return response.data
}

// Fetch danh sách report
export const fetchReports = async () => {
    const response = await axiosClient.get('/api/v1/report')
    return response.data.data
}

// Delete report by ID
export const deleteReport = async (id: number) => {
    const response = await axiosClient.delete(`/api/v1/report/${id}`)
    return response.data
}