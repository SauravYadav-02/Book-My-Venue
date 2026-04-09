type Props = {
    name: string;
    reset: () => void;
};

export default function SuccessScreen({ name, reset }: Props) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-100 to-green-200">
            <div className="bg-white p-10 rounded-2xl shadow-xl text-center space-y-4">

                <h2 className="text-2xl font-bold text-green-700">Success 🎉</h2>

                <p className="text-slate-600">
                    {name} registered successfully
                </p>

                <button
                    onClick={reset}
                    className="mt-4 bg-green-600 hover:bg-green-700 transition text-white px-5 py-2 rounded-xl"
                >
                    Register Again
                </button>

            </div>
        </div>
    );
}