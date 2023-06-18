import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Providers from "@/store/Provider";

export const metadata = {
  title: "Next Tour",
  description: "NextJS Project",
  icons: {
    icon: "/img/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
