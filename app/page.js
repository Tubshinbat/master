import Loader from "components/Generals/Loader";
import Side from "components/Generals/Side";
import MemberList from "components/MemberList";
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
                  <MemberList />
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
