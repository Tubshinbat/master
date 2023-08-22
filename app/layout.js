import "bootstrap/dist/css/bootstrap.css";
import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "animate.css";
import "aos/dist/aos.css";
import Script from "next/script";
import Header from "components/Generals/Header";
import Footer from "components/Generals/Footer";
import { Suspense } from "react";
import Loader from "components/Generals/Loader";

export const metadata = {
  title: `Гермон Дентал” шүдний эмнэлэг `,
  description: "Гермон Дентал” шүдний эмнэлэг",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loader />}>
          <Header />
          {children}
          <Footer />
        </Suspense>
      </body>
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></Script>
    </html>
  );
}
