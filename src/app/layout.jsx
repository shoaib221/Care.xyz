

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import '@/buttons/buttons.css'
import '@/buttons/box.css'
import { Nav } from "@/Nav/Nav";
import { AuthProvider } from "./nextAuth";
import { Footer } from "@/Nav/Footer";
import { NavProvider } from "@/Nav/context";
import 'react-toastify/dist/ReactToastify.css';



const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});


export const metadata = {
	title: "Care.in",
	description: "For outstanding caregiving",
	icons: {
		icon: "/icon.jpg",
	},
};


export default function RootLayout({ children }) {
	return (

		<html lang="en">
			<AuthProvider>
				<NavProvider>
					<body className="min-h-screen flex flex-col">
						<Nav />
						{children}
						<Footer />
					</body>
				</NavProvider>
			</AuthProvider>
		</html>

	);
}
