"use client";
import { getPartners } from "lib/getFetchers";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlockLoad from "./Generals/BlockLoad";
import NotFound from "./Generals/Notfound";
import Partner from "./Partner";

const Partners = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(null);

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
    const fetchData = async () => {
      const { partners, pagination } = await getPartners(`status=true`);
      if (partners) setData(partners);
      if (pagination) setPaginate(pagination);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const qry = queryBuild();

    const fetchData = async (query) => {
      const { partners, pagination } = await getPartners(query);
      setPaginate(pagination);
      setData(partners);
      setLoading(false);
    };

    setLoading(true);
    fetchData(qry).catch((error) => console.log(error));
  }, [searchParams]);

  const nextpage = () => {
    const qry = queryBuild();

    const next = async () => {
      setLoading(true);
      const { partners, pagination } = await getPartners(
        `${qry}page=${paginate.nextPage}`
      );
      setData((bs) => [...bs, ...partners]);
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
      <div className="partner-list">
        <div className="row gy-4">
          {data &&
            data.length > 0 &&
            data.map((el) => (
              <div className="col-lg-3 col-md-3 col-sm-4 col-6" key={el._id}>
                <Partner data={el} />
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

export default Partners;
