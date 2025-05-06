"use client";
import { getPartners } from "lib/getFetchers";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Tag } from "antd";
import BlockLoad from "./Generals/BlockLoad";
import NotFound from "./Generals/Notfound";
import Partner from "./Partner";

const Partners = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginate, setPaginate] = useState(null);
  const loadMoreRef = useRef(null);

  const queryBuild = () => {
    let query = "status=true&";
    const searchFields = ["categories", "name", "q"];

    searchFields.forEach((field) => {
      if (searchParams.get(field)) {
        query += `${field}=${searchParams.get(field)}&`;
      }
    });

    return query;
  };

  const fetchData = async (queryStr) => {
    const { partners, pagination } = await getPartners(queryStr);
    setData(partners || []);
    setPaginate(pagination || null);
    setLoading(false);
  };

  const nextpage = () => {
    const qry = queryBuild();
    if (paginate && paginate.nextPage) {
      setLoading(true);
      getPartners(`${qry}page=${paginate.nextPage}`)
        .then(({ partners, pagination }) => {
          setData((prev) => [...prev, ...partners]);
          setPaginate(pagination);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const qry = queryBuild();
    setLoading(true);
    fetchData(qry).catch((err) => console.log(err));
  }, [searchParams]);

  // Infinite scroll observer
  useEffect(() => {
    if (!paginate?.nextPage || loading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          nextpage();
        }
      },
      { rootMargin: "100px" }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [paginate, loading]);

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const removeFilter = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get(key)?.split(",") || [];

    const updated = current.filter((item) => item !== value);
    if (updated.length > 0) {
      params.set(key, updated.join(","));
    } else {
      params.delete(key);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  if (loading && data.length === 0) return <BlockLoad />;
  if (!loading && data.length === 0) return <NotFound />;

  return (
    <>
      {/* ✅ FILTER HEADER */}
      <div className=" mb-3">
        <div className="d-flex flex-wrap align-items-center gap-2">
          <div>
            <strong>{paginate?.total || data.length}</strong> байгууллага байна
          </div>

          {["categories", "name", "q"].map((key) => {
            const val = searchParams.get(key);
            if (!val) return null;

            return val.split(",").map((v) => (
              <Tag
                key={`${key}-${v}`}
                closable
                onClose={() => removeFilter(key, v)}
                color="green"
              >
                {v}
              </Tag>
            ));
          })}

          {(searchParams.get("categories") || searchParams.get("name")) && (
            <button
              onClick={clearAllFilters}
              className="btn btn-sm btn-outline-danger"
            >
              Цэвэрлэх
            </button>
          )}
        </div>
      </div>

      {/* ✅ MAIN LIST */}
      <div className="partner-list">
        <div className="row gy-5">
          {data.map((el) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-12" key={el._id}>
              <Partner data={el} />
            </div>
          ))}
        </div>
      </div>

      {/* ✅ LOADING BLOCK */}
      {loading && <BlockLoad />}

      {/* ✅ SCROLL REF */}
      {paginate?.nextPage && (
        <div ref={loadMoreRef} style={{ height: 1 }}></div>
      )}

      {/* ✅ Fallback button */}
      {paginate?.nextPage && (
        <div className="pagination">
          <button className="more-page" onClick={nextpage}>
            Дараагийн хуудас
          </button>
        </div>
      )}
    </>
  );
};

export default Partners;
