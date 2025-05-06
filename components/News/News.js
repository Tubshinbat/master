import base from "lib/base";
import Link from "next/link";
import { htmlToText } from "html-to-text";
import Image from "components/Generals/Image";

const News = ({ data }) => {
  return (
    <div className="news-item">
      <Link href={`/news/${data._id}`}>
        <div className="news-item-img-box">
          {
            <Image
              image={data.pictures[0]}
              alt={data.name}
              className="news-item-img"
            />
          }
        </div>
      </Link>
      <div className="news-item-content">
        <Link href={`/news/${data._id}`} className="news-item-title">
          {data.name.length > 43 ? data.name.substr(0, 43) + "..." : data.name}
        </Link>
      </div>
    </div>
  );
};

export default News;
