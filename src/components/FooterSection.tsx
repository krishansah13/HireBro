export default function FooterSection() {
    return (
        <footer className="bg-white">
            <div className="container mx-auto px-4 py-8">
                <p className="text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Job Board. All rights reserved.
                </p>
            </div>
        </footer>
    );
}