type Props = {
    name: string;
    reset: () => void;
};

export default function SuccessScreen({ name, reset }: Props) {
    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white p-8 rounded-xl shadow text-center">
                <h2 className="text-xl font-semibold">Success 🎉</h2>
                <p>{name} registered successfully</p>

                <button
                    onClick={reset}
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
                >
                    Register Again
                </button>
            </div>
        </div>
    );
}