
export default function Requests() {

    const sampleRequests = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' },
        { id: 3, name: 'Emily Johnson' }
    ];

    return (
        <div className="flex h-screen font-mySans">

            <main className="flex-1 bg-background-950 p-12">
                <div className="space-y-4">
                        {sampleRequests.map((req, index) => (
                            <div key={req.id} className={`p-4 flex justify-between items-center ${index !== 0 ? 'border-t border-text-200' : ''}`}>
                                <h4 className="text-xl font-bold text-text-400">{req.name}</h4>
                                <div className="space-x-4">
                                    <button className="bg-primary-500 text-white py-2 px-4 rounded-full">Accept</button>
                                    <button className="bg-secondary-500 text-white py-2 px-4 rounded-full">Reject</button>
                                </div>
                            </div>
                        ))}
                    </div>
            </main>
        </div>
    );
}