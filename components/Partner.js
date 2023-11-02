import base from "lib/base";
import Image from "next/image";
import Link from "next/link";

const Partner = ({ data }) => {
  return (
    <>
      <div className="partner-item">
        <Link href={`/partners/${data._id}`} className="partner-box-logo">
          <img
            className="partner-logo"
            src={`${base.cdnUrl}/450/${data.logo}`}
          />
        </Link>
      </div>
    </>
  );
};

export default Partner;
