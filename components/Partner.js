import base from "lib/base";
import Link from "next/link";
import Image from "./Generals/Image";

const Partner = ({ data }) => {
  return (
    <>
      <div className="company-item">
        <Link href={`/partners/${data._id}`} className="company-item__link">
          <div className="company-item__inner">
            <div
              className="company-item__header"
              style={{
                backgroundImage: `url(${
                  data.cover
                    ? base.cdnUrl + "/" + data.cover
                    : "/images/cover-bg.jpg"
                })`,
              }}
            >
              <div className="company-item__body">
                <div className="company-item__logo-bg">
                  <Image
                    image={data.logo}
                    alt={data.name}
                    className="company-item__logo"
                  />
                </div>
                <h5 className="company-item__title">{data.name}</h5>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Partner;
