import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { FitLogProvider } from "./components/FitLogContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Inter, Oswald } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata = {
  title: "FitLog",
  description: "Workout Library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${oswald.variable}`}>
        <FitLogProvider>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer position="top-right" theme="dark" />
        </FitLogProvider>
      </body>
    </html>
  );
}