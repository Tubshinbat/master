import base from "lib/base";
import { getProduct } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { product } = await getProduct(params.id);
  let title = `"Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв `;

  if (product) {
    title = product.name + " - " + title;
  }

  let openGraph = {
    images:
      product && product.picture
        ? `${base.cdnUrl}/${product.picture}`
        : `${base.baseUrl}/images/header.jpg`,
  };

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
