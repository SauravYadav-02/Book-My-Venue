

const requests = [
  { id: 1, name: "Sarah Jenkins", event: "Wedding Reception", date: "Oct 24, 2025", status: "Pending" },
  { id: 2, name: "Michael Chen", event: "Corporate Retreat", date: "Nov 12, 2025", status: "Approved" },
  { id: 3, name: "Emma Davis", event: "Birthday Party", date: "Nov 05, 2025", status: "Pending" },
  { id: 4, name: "James Wilson", event: "Networking Event", date: "Oct 30, 2025", status: "Declined" },
]

const BookingRequests = () => {
    return (
        <div className="bg-white rounded-xl shadow-md p-5 w-full h-full flex flex-col min-h-[300px]">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-base font-semibold leading-tight text-gray-800">Recent Requests</h2>
                <button className="text-xs font-medium text-green-600 hover:text-green-800">View All</button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1">
                <div className="flex flex-col gap-3">
                    {requests.map((req) => (
                        <div key={req.id} className="p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="font-semibold text-sm text-gray-800">{req.name}</h3>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                    req.status === 'Approved' ? 'bg-green-100 text-green-700' : 
                                    req.status === 'Declined' ? 'bg-red-100 text-red-700' : 
                                    'bg-yellow-100 text-yellow-700'
                                }`}>{req.status}</span>
                            </div>
                            <p className="text-xs text-gray-500">{req.event}</p>
                            <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1.5">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                                {req.date}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BookingRequests