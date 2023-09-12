import base from "lib/base";
import Link from "next/link";
import { htmlToText } from "html-to-text";

const News = ({ data }) => {
  return (
    <div className="serivce-col">
      <Link href={`/news/${data._id}`}>
        <div className="service-col-img">
          {data.pictures && data.pictures[0] ? (
            <img src={`${base.cdnUrl}/450/${data.pictures[0]}`} />
          ) : (
            <img src={`/images/not-found.jpg`} />
          )}
        </div>
      </Link>
      <div className="service-col-content">
        <Link href={`/news/${data._id}`} className="col-service-title">
          {data.name.length > 43 ? data.name.substr(0, 43) + "..." : data.name}
        </Link>
        <p>
          {htmlToText(data.details, {
            limits: 10,
          }).length > 160
            ? htmlToText(data.details, {
                limits: 10,
              }).substr(0, 160) + "..."
            : htmlToText(data.details, {
                limits: 10,
              })}
        </p>
      </div>
    </div>
  );
};

export default News;
