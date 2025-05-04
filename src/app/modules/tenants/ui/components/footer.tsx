import { Poppins } from "next/font/google"
import Link from "next/link";

const poppins = Poppins({
    subsets: ["latin"],
    weight: ["700"],
});

export const Footer = () => {
    return (
        <footer className="border-t font-medium bg-white">
            <div className="max-w-(--breakpoint-xl) mx-auto h-full flex items-center gap-2 py-6 px-4 lg:px-10">
                <p className="text-2xl font-medium text-gray-800">
                    Powered by <Link href={'/'}><span className={poppins.className}>Poppins</span></Link>
                </p>
            </div>
        </footer>
    )
}