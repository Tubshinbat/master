import base from "lib/base";
import Image from "next/image";
import Link from "next/link";

const Partner = ({ data }) => {
  return (
    <>
      <div className="partner-item">
        <Link href={`/partners/${data._id}`} className="partner-box-logo">
          <Image
            className="partner-logo"
            width="0"
            height="0"
            sizes="100vw"
            quality="100"
            src={`${base.cdnUrl}/450/${data.logo}`}
          />
        </Link>
      </div>
    </>
  );
};

export default Partner;
