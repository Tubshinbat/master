import base from "lib/base";
import { getPartner } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { partner } = await getPartner(params.id);
  let title = `"Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв `;

  if (partner) {
    title = partner.name + " - " + title;
  }

  let openGraph = {
    images:
      partner && partner.logo
        ? `${base.cdnUrl}/${partner.logo}`
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
