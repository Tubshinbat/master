import base from "lib/base";
import { getIdNews } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { news } = await getIdNews(params.id);
  let title = `"Шилдэг мастер” сургалт, судалгаа, үнэлгээний төв `;

  if (news) {
    title = news.name + " - " + title;
  }

  let openGraph = {
    images:
      news && news.pictures && news.pictures[0]
        ? `${base.cdnUrl}/${news.pictures[0]}`
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
