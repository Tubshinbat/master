import News from "components/News/News";
import Link from "next/link";
import React from "react";

const HomeNews = ({ news }) => {
  return (
    <>
      <div className="section">
        <div className="container">
          <div className="section__header">
            <h4>Нийтлэлүүд</h4>
            <Link href="/news">Цааш харах</Link>
          </div>
          <div className="section__body">
            <div className="row g-4">
              {news &&
                news.map((item) => (
                  <div
                    className="col-xl-4 col-lg-4 col-md-6 col-sm-6 col-12"
                    key={item._id}
                  >
                    <News data={item} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeNews;
