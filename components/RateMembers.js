"use client";
import { getRateMembers } from "lib/getFetchers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlockLoad from "./Generals/BlockLoad";
import NotFound from "./Generals/Notfound";
import RateColMember from "./RateColMember";
import RateMember from "./RateMember";

const RateMembers = ({ plusQuery = "plus=none" }) => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { members } = await getRateMembers(`${plusQuery}`);
      if (members) setData(members);
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
      const { members, pagination } = await getRateMembers(query);

      setData(members);
      setLoading(false);
    };

    setLoading(true);
    fetchData(qry).catch((error) => console.log(error));
  }, [searchParams]);

  if (loading === true && data.length <= 0) {
    return <BlockLoad />;
  }

  if (data && data.length <= 0) {
    return <NotFound />;
  }

  return (
    <>
      <div className="member-winer-list">
        <div className="row gy-4">
          {data && data[1] && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <RateMember data={data[1]} number={2} />
            </div>
          )}
          {data && data[0] && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <RateMember data={data[0]} number={1} />
            </div>
          )}
          {data && data[2] && (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-12">
              <RateMember data={data[2]} number={3} />
            </div>
          )}
        </div>
      </div>
      <div className="member-col-list row gy-4 mt-4">
        {data &&
          data.map(
            (el, index) =>
              index > 2 && (
                <div
                  className="col-lg-6 col-md-12 col-sm-12 col-12"
                  key={index}
                >
                  <RateColMember data={el} />{" "}
                </div>
              )
          )}
      </div>
    </>
  );
};

export default RateMembers;
