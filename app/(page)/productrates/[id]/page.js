"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import { redirect } from "next/navigation";
import base from "lib/base";
import { postRate, productRate } from "lib/check";
import { getProduct } from "lib/getFetchers";
import { toastControl } from "lib/toastControl";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [cookies] = useCookies();
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { product } = await getProduct(params.id);
      setData(product);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const handlePhone = (e) => {
    if (e.target.value.length >= 0 && e.target.value.length <= 8) {
      setPhoneNumber(e.target.value);
    }
  };
  const timer = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleRate = async () => {
    const isRate = cookies[params.id];

    if (!rate) {
      toastControl("error", "Үнэлгээ өгнө үү");
    } else if (!phoneNumber) {
      toastControl("error", "Утасны дугаараа оруулна уу");
    } else if (phoneNumber.length !== 8 && rate) {
      toastControl("error", "Утасны дугаар буруу байна");
    } else {
      const data = { phoneNumber, rate, product: params.id };
      const { error, result } = await productRate(data);
      if (result) {
        // toastControl("success", `Үнэлгээг хүлээн авлаа. `);
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 36000;
        now.setTime(expireTime);
        setShow(true);
        await timer(1000 * 7);
        window.location.replace(`/products/${params.id}`);
      }
      if (error) {
        toastControl("error", "Та өмнө үнэлгээ өгсөн байна.");
      }
    }
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        autoDisplay: false,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  if (!data && loading) {
    return (
      <section>
        <div className="container">
          <Loader />
        </div>
      </section>
    );
  }

  return (
    <>
      <Suspense fallback={<Loader />}>
        <div className={`fireworkBg ${show === false && "displayNone"}`}>
          <div class="firework"></div>
          <div class="firework"></div>
          <div class="firework"></div>
          <div className="firework-text">
            <h4>Үнэлгээ өгсөнд баярлалаа</h4>
            <p> Тун удахгүй тухайн хуудаснаас шилжих болно</p>
          </div>
        </div>
        <div className="main">
          <section>
            <div className="container">
              <div className="translate-google">
                <div id="google_translate_element"></div>
              </div>
              <div className="row flex-column-reverse flex-lg-row">
                <div className="col-12">
                  <div className="member-profile-side rating-box">
                    <div className="profile-picture-box">
                      {data.picture && (
                        <img
                          className="profile-img"
                          src={`${base.cdnUrl}/350x350/${data.picture}`}
                        />
                      )}
                    </div>
                    <div className="profile-info">
                      <h6> {data.name} </h6>
                      <span>{data.position}</span>
                    </div>
                    <div className="profile-rating-box">
                      <div className="rating-input-box">
                        <input
                          type="number"
                          placeholder="Утасны дугаараа оруулна уу"
                          value={phoneNumber}
                          onChange={(e) => handlePhone(e)}
                        />
                      </div>
                      <div className="profile-rating">
                        <div className="member-rate">
                          <span> Үнэлгээ өгөх </span>
                          <div className="star-rating">
                            <input
                              id={`star-5-${data._id}`}
                              type="radio"
                              name={`rating-${data._id}`}
                              defaultValue={`star-5-${data._id}`}
                              checked={rate === 5}
                              onClick={() => setRate(5)}
                            />
                            <label
                              htmlFor={`star-5-${data._id}`}
                              title="5 stars"
                            >
                              <FontAwesomeIcon
                                className="active"
                                icon={faStar}
                                aria-hidden="true"
                              />
                            </label>
                            <input
                              id={`star-4-${data._id}`}
                              type="radio"
                              name={`rating-${data._id}`}
                              defaultValue={`star-4-${data._id}`}
                              checked={rate === 4}
                              onClick={() => setRate(4)}
                            />
                            <label
                              htmlFor={`star-4-${data._id}`}
                              title="4 stars"
                            >
                              <FontAwesomeIcon
                                className="active"
                                icon={faStar}
                                aria-hidden="true"
                              />
                            </label>
                            <input
                              id={`star-3-${data._id}`}
                              type="radio"
                              name={`rating-${data._id}`}
                              defaultValue={`star-3-${data._id}`}
                              checked={rate === 3}
                              onClick={() => setRate(3)}
                            />
                            <label
                              htmlFor={`star-3-${data._id}`}
                              title="3 stars"
                            >
                              <FontAwesomeIcon
                                className="active"
                                icon={faStar}
                                aria-hidden="true"
                              />
                            </label>
                            <input
                              id={`star-2-${data._id}`}
                              type="radio"
                              name={`rating-${data._id}`}
                              defaultValue={`star-2-${data._id}`}
                              checked={rate === 2}
                              onClick={() => setRate(2)}
                            />
                            <label
                              htmlFor={`star-2-${data._id}`}
                              title="2 stars"
                            >
                              <FontAwesomeIcon
                                className="active"
                                icon={faStar}
                                aria-hidden="true"
                              />
                            </label>
                            <input
                              id={`star-1-${data._id}`}
                              type="radio"
                              name={`rating-${data._id}`}
                              defaultValue={`star-1-${data._id}`}
                              checked={rate === 1}
                              onClick={() => setRate(1)}
                            />
                            <label
                              htmlFor={`star-1-${data._id}`}
                              title="1 star"
                            >
                              <FontAwesomeIcon
                                className="active"
                                icon={faStar}
                                aria-hidden="true"
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                      <button className="rating-btn" onClick={handleRate}>
                        Үнэлгээ өгөх{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Suspense>
    </>
  );
}
