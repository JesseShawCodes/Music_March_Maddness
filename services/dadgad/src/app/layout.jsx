import "./globals.css";
import "./App.scss";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import { ReduxProvider } from "./ReduxProvider";
import { ThemeProvider } from "./ThemeContext";
import Footer from "./components/Footer";
import { BracketContext } from "./context/BracketContext";
import BootstrapClient from "./components/BootstrapClient";
import MaintenancePageContent from "./components/MaintenancePageContent";

export const metadata = {
  title: "Dadgad",
  description: "Build the Ultimate Song Bracket for Your Favorite Artist. Pick your favorites, round by round. Crown your winner. Share your bracket with the world.",
  icons: {
    icon: [
      { url: 'icon.png', type: 'image/png' }
    ]
  }
};

export default function RootLayout({ children }) {
  const mainLayout = (
    <ReduxProvider>
      <BracketContext>
      <ThemeProvider> {/* Keep your ThemeProvider here if it wraps the whole app */}
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-grow-1 bg-my-gradient">
            {children}
          </main>
          <Footer />
        </div>
        <BootstrapClient />
      </ThemeProvider>
      </BracketContext>
    </ReduxProvider>
  )
  return (
    <html lang="en">
      <body>
        { process.env.NEXT_PUBLIC_MAINTENANCE_MODE ? <MaintenancePageContent /> : mainLayout}
      </body>
    </html>
  );
}
