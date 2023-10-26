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
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: `"Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв `,
  description: `"Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв`,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="/js/scripts.js" />
      <body>
        <Suspense fallback={<Loader />}>
          <Header />
          {children}
          <Footer />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Suspense>
      </body>
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></Script>
    </html>
  );
}
