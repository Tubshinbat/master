"use client";

import { getMembers } from "lib/getFetchers";
import { useEffect, useState } from "react";
import BlockLoad from "./Generals/BlockLoad";
import NotFound from "./Generals/Notfound";
import Member from "./Member";

const MemberList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { members, pagination } = await getMembers(`status=true`);
      if (members) setData(members);
      if (pagination) setPaginate(pagination);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  if (loading === true && data.length <= 0) {
    return <BlockLoad />;
  }

  if (data.length <= 0) {
    return <NotFound />;
  }

  return (
    <>
      <div className="member-list">
        <div className="row">
          {data &&
            data.map((el) => (
              <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={el._id}>
                <Member data={el} />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MemberList;
