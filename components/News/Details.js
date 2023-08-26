import base from "lib/base";
import Image from "next/image";
import moment from "moment";

const NewsDetails = ({ data }) => {
  return (
    <div className="news-main">
      <div className="news-main-head">
        <h2> {data.name} </h2>
        <span>
          {moment(data.createAt)
            .utcOffset("+0800")
            .format("YYYY-MM-DD HH:mm:ss")}
        </span>
      </div>
      <div className="news-main-img-box">
        {data.pictures && data.pictures[0] && (
          <Image
            className="news-img"
            width="0"
            height="0"
            sizes="100vw"
            quality="100"
            src={`${base.cdnUrl}/${data.pictures[0]}`}
          />
        )}
      </div>
      <div
        className="description"
        dangerouslySetInnerHTML={{
          __html: data.details,
        }}
      ></div>
    </div>
  );
};

export default NewsDetails;
