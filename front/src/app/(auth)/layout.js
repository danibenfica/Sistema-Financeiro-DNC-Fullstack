import { Inter } from "next/font/google";
import "../globals.css";
import Menu from '../../components/Menu';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "YOURfinance.IO",
    description: "Sistema financeiro",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={ inter.className }>
                <Menu>{ children }</Menu>
            </body>
        </html>
    );
}
