'use client'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { searchListingApi } from '@/api/listing.api'
import ListingCard from '@/components/ListingCard'

const SearchPage = () => {
    const searchParams = useSearchParams()
    const keyword = searchParams.get('keyword') || ''
    const [results, setResults] = useState([])

    useEffect(() => {
        if (!keyword) return
        const fetchData = async () => {
            const data = await searchListingApi(keyword)
            setResults(data)
        }
        fetchData()
    }, [keyword])

    return (
        <div className='p-4'>
            <h1 className='text-xl font-semibold mb-4'>Kết quả cho: "{keyword}"</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-x-auto">
                {results.map((listing: any) => (
                    <ListingCard key={listing.id} listing={listing} />
                ))}
            </div>
        </div>
    )
}

export default SearchPage
