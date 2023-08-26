import base from "lib/base";
import { getMember } from "lib/getFetchers";

export async function generateMetadata({ params }) {
  const { member } = await getMember(params.id);
  let title = `"Шилдэг мастер” сургалт, судалгаа, үйлчилгээний төв `;

  if (member) {
    title = member.name + " - " + title;
  }

  let openGraph = {
    images:
      member && member.picture
        ? `${base.cdnUrl}/${member.picture}`
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
