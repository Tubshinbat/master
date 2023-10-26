"use client";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import { redirect } from "next/navigation";
import base from "lib/base";
import { postRate } from "lib/check";
import { getMember } from "lib/getFetchers";
import { toastControl } from "lib/toastControl";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import gsap from "gsap";
import Physics2DPlugin from "gsap/Physics2DPlugin";

export default function Page({ params }) {
  const [data, setData] = useState(null);
  const [alternativeMembers, setAlternativeMembers] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const [rate, setRate] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const { member, alternativeMembers } = await getMember(params.id);
      setData(member);
      setAlternativeMembers(alternativeMembers);
      setLoading(false);
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  const handlePhone = (e) => {
    if (e.target.value.length >= 0 && e.target.value.length <= 8) {
      setPhoneNumber(e.target.value);
    }
  };

  const handleRate = async () => {
    const isRate = cookies[params.id];

    if (!rate) {
      toastControl("error", "Үнэлгээ өгнө үү");
    } else if (!phoneNumber) {
      toastControl("error", "Утасны дугаараа оруулна уу");
    } else if (phoneNumber.length !== 8 && rate) {
      toastControl("error", "Утасны дугаар буруу байна");
    } else {
      const data = { phoneNumber, rate, member: params.id };
      const { error, result } = await postRate(data);
      if (result) {
        toastControl("success", `Үнэлгээг хүлээн авлаа. `);
        var now = new Date();
        var time = now.getTime();
        var expireTime = time + 1000 * 36000;
        now.setTime(expireTime);

        // setCookie(params.id, true, [{ expires: "2024-09-24T04:49:03.404Z" }]);
        window.location.replace(`/members/${params.id}`);
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

  gsap.registerPlugin(Physics2DPlugin);
  const emitters = document.querySelectorAll(".emitter");
  const turn = 360;
  const sample = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  const makeParticles = (
    emitter,
    quantity,
    x,
    y,
    minAngle,
    maxAngle,
    minVelocity,
    maxVelocity,
    gravity
  ) => {
    let colors = ["#4ec0e9", "#ffce52", "#ed5464", "#8e44ad", "#2ecc71"];
    for (let i = quantity - 1; i >= 0; i--) {
      const angle = gsap.utils.random(minAngle, maxAngle);
      const velocity = gsap.utils.random(minVelocity, maxVelocity);
      const particle = document.createElement("div");
      particle.style.setProperty("--particle-color", sample(colors));
      emitter.appendChild(particle);
      gsap.set(particle, {
        opacity: 0,
        scale: gsap.utils.random(0.3, 0.8),
        x,
        y,
      });
      const t1 = gsap.timeline({
        onComplete() {
          particle.remove();
        },
      });
      t1.to(
        particle,
        {
          opacity: 1,
          duration: 0.05,
        },
        0
      )
        .to(
          particle,
          {
            rotationX: `+=${gsap.utils.random(2 * turn, 4 * turn)}`,
            rotationZ: `+=${gsap.utils.random(2 * turn, 4 * turn)}`,
            physics2D: {
              angle,
              velocity,
              gravity,
            },
            duration: 2,
          },
          0
        )
        .to(
          particle,
          {
            opacity: 0,
            duration: 1,
          },
          0.8
        );
    }
  };

  const start = async () => {
    for (const emitter of emitters) {
      makeParticles(emitter, 100, -4, 6, 0, 360, 60, 120, 60);
      await sleep(500);
    }
  };

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
        <div className="main">
          <div>
            <div className="backdrop" />
            <div className="dialog w-70 text-center">
              <div className="relative z-10086 flex justify-between w-full space-x-12">
                <div className="emitter order-1" />
                <div className="emitter order-3" />
                <div className="emitter order-2 -top-6" />
              </div>
              <div className="text-lg font-bold">Congratulations!</div>
              <div className="mt-4">You win the game!</div>
              <button className="mt-4 btn btn-primary" onClick={start()}>
                Again
              </button>
            </div>
          </div>

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
                        <Image
                          className="profile-img"
                          width="0"
                          height="0"
                          sizes="100vw"
                          quality="100"
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
