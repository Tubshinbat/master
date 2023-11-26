import base from "lib/base";
import { getProduct } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { product } = await getProduct(params.slug);
  let title = `"Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв `;

  if (product) {
    title = product.name + " - " + title;
  }

  let openGraph = {
    images:
      product && product.pictures && product.pictures[0] !== ""
        ? `${base.cdnUrl}/${product.pictures[0]}`
        : `/images/no-data.jpg`,
  };

  return {
    title,
    openGraph,
  };
}

export default function RootLayout({ children }) {
  return <>{children}</>;
}
