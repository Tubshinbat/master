// CSS Styles
import "bootstrap/dist/css/bootstrap.css";
import "styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "animate.css";
import "aos/dist/aos.css";

//
import Script from "next/script";
import { Suspense } from "react";
import { ToastContainer } from "react-toastify";

//Components
import Header from "components/Generals/Header";
import Footer from "components/Generals/Footer";
import Loader from "components/Generals/Loader";

//Context
import { AuthProvider } from "context/authContext";
import { NotificationProvider } from "context/notificationContext";
import { getWebInfo } from "lib/getFetchers";
import base from "lib/base";

export async function generateMetadata({ params }) {
  const { info } = await getWebInfo();

  let title = `Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв`;
  let description = `"Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв`;

  if (info) {
    const data = info;
    title = data.name;
  }

  let images = `${base.baseUrl}/images/about_img.png`;

  let openGraph = {
    images,
  };

  return {
    title,
    description,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Script src="/js/scripts.js" />
      <body>
        <NotificationProvider>
          <AuthProvider>
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
          </AuthProvider>
        </NotificationProvider>
      </body>
      <Script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></Script>
    </html>
  );
}
