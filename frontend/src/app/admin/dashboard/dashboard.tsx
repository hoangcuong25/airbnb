const Dashboard = () => {
    return (
        <>
            {/* Top Navigation */}
            <nav className="bg-white dark:bg-gray-800 shadow-lg transition-shadow duration-300 hover:shadow-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900 dark:text-white transition-colors duration-200">Dashboard</h1>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Dashboard Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Dashboard Cards */}
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate transition-colors duration-200">Tổng số người dùng</dt>
                                            <dd className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">0</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate transition-colors duration-200">Tổng số phòng</dt>
                                            <dd className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">0</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg transition-all duration-300 hover:shadow-xl hover:scale-105 transform cursor-pointer">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 transition-transform duration-300 hover:rotate-12">
                                        <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate transition-colors duration-200">Doanh thu</dt>
                                            <dd className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">0 VNĐ</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Dashboard;
