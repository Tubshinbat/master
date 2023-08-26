import Loader from "components/Generals/Loader";
import NewsList from "components/News/NewsList";
import Side from "components/News/Side";

import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className="main">
          <section>
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                  <Side />
                </div>
                <div className="col-lg-9">
                  <NewsList />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
