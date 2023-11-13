"use client";
import { getMembers } from "lib/getFetchers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlockLoad from "./Generals/BlockLoad";
import NotFound from "./Generals/Notfound";
import Member from "./Member";

const MemberList = ({ plusQuery = "plus=none" }) => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const qry = queryBuild();
      const { members, pagination } = await getMembers(`${qry}&${plusQuery}`);

      if (members) setData(members);

      if (pagination) setPaginate(pagination);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const queryBuild = () => {
    let query = "";
    let fields = [];

    const searchFields = ["categories", "name"];

    searchFields.map((field) => {
      if (searchParams.get(field)) {
        query += `${field}=${searchParams.get(field)}&`;
        if (
          searchParams.get(field) &&
          searchParams.get(field).split(",").length > 0
        ) {
          searchParams
            .get(field)
            .split(",")
            .map((el) => fields.push({ name: field, data: el }));
        } else {
          query += `${field}=&`;
        }
      }
    });

    return query;
  };

  useEffect(() => {
    const qry = queryBuild();

    const fetchData = async (query) => {
      const { members, pagination } = await getMembers(query + "&" + plusQuery);
      setPaginate(pagination);
      setData(members);
      setLoading(false);
    };

    setLoading(true);
    fetchData(qry).catch((error) => console.log(error));
  }, [searchParams]);

  const nextpage = () => {
    const qry = queryBuild();

    const next = async () => {
      setLoading(true);
      const { members, pagination } = await getMembers(
        `${qry}page=${paginate.nextPage}&${plusQuery}`
      );
      setData((bs) => [...bs, ...members]);
      setPaginate(pagination);
      setLoading(false);
    };

    if (paginate && paginate.nextPage) {
      next().catch((error) => console.log(error));
    }
  };

  if (loading === true && data.length <= 0) {
    return <BlockLoad />;
  }

  if (data && data.length <= 0) {
    return <NotFound />;
  }

  return (
    <>
      <div className="member-list">
        <div className="row gy-4">
          {data &&
            data.map((el) => (
              <div className="col-lg-4 col-md-4 col-sm-6 col-12" key={el._id}>
                <Member data={el} />
              </div>
            ))}
        </div>
      </div>
      {loading === true && <BlockLoad />}
      {paginate && paginate.nextPage && (
        <div className="pagination">
          <button className="more-page" onClick={() => nextpage()}>
            Дараагийн хуудас
          </button>
        </div>
      )}
    </>
  );
};

export default MemberList;
