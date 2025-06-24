import "./globals.css";
import "./App.scss";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./NavBar";
import { ReduxProvider } from "./ReduxProvider";
import { ThemeProvider } from "./ThemeContext";
import Footer from "./components/Footer";

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
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ThemeProvider> {/* Keep your ThemeProvider here if it wraps the whole app */}
            <div className="d-flex flex-column min-vh-100">
              <NavBar />
              <main className="flex-grow-1">
                {children} {/* This is where your page content will be rendered */}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
