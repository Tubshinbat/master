"use client";
import { faArrowLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Loader from "components/Generals/Loader";
import NotFound from "components/Generals/Notfound";
import PageSide from "components/Generals/PageSide";
import Spinner from "components/Generals/Spinner";
import NewsDetails from "components/News/Details";
import Side from "components/News/Side";
import base from "lib/base";
import { getIdNews, getProduct } from "lib/getFetchers";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import QRCode from "react-qr-code";

export default function Page({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState([]);
  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      const { product } = await getProduct(params.id);
      if (product && product.pictures) {
        let img = [];
        product.pictures.map((picture) =>
          img.push({
            original: base.cdnUrl + "/" + picture,
            thumbnail: base.cdnUrl + "/150x150/" + picture,
          })
        );

        setImage(img);
      }

      setProduct(product);
      setLoading(false);
    };

    fetchData().catch((err) => console.log(err));
  }, []);

  if (loading && !product) {
    return (
      <div className="main">
        <section>
          <div className="container">
            <Loader />
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="main">
      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="page_detials_header">
                <div className="page_header_left">
                  <button className="page-back" onClick={() => router.back()}>
                    <FontAwesomeIcon icon={faArrowLeft} />
                  </button>
                  <div className="page-header-title">
                    <h2>{product.name}</h2>
                    <span>#{product.productCode}</span>
                  </div>
                </div>
              </div>
              <ImageGallery items={image} />
            </div>{" "}
            <div className="col-lg-4">
              <div className="product-side member-profile-side sticky-top">
                {product.isDiscount === false && (
                  <div className="price-box">
                    <span> Үндсэн үнэ: </span>
                    <h4> {new Intl.NumberFormat().format(product.price)}₮ </h4>
                  </div>
                )}
                {product.isDiscount === true && (
                  <div className="discount-box">
                    <div className="discount-price">
                      <span> Хямдралтай үнэ: </span>
                      <h4>
                        {new Intl.NumberFormat().format(product.discount)}₮{" "}
                      </h4>
                    </div>
                    <div className="init-price">
                      <span> Анхны үнэ: </span>
                      <h4>{new Intl.NumberFormat().format(product.price)}₮ </h4>
                    </div>
                  </div>
                )}
                <div className="divider-dashed" role="separator"></div>
                <div className="profile-rating">
                  <div className="member-rate">
                    <span> Зэрэглэл </span>
                    <div className="star-rating">
                      <input
                        id={`star-5-${product._id}`}
                        type="radio"
                        name={`rating-${product._id}`}
                        defaultValue={`star-5-${product._id}`}
                        checked={product.rating === 5}
                      />
                      <label htmlFor={`star-5-${product._id}`} title="5 stars">
                        <FontAwesomeIcon
                          className="active"
                          icon={faStar}
                          aria-hidden="true"
                        />
                      </label>
                      <input
                        id={`star-4-${product._id}`}
                        type="radio"
                        name={`rating-${product._id}`}
                        defaultValue={`star-4-${product._id}`}
                        checked={product.rating === 4}
                      />
                      <label htmlFor={`star-4-${product._id}`} title="4 stars">
                        <FontAwesomeIcon
                          className="active"
                          icon={faStar}
                          aria-hidden="true"
                        />
                      </label>
                      <input
                        id={`star-3-${product._id}`}
                        type="radio"
                        name={`rating-${product._id}`}
                        defaultValue={`star-3-${product._id}`}
                        checked={product.rating === 3}
                      />
                      <label htmlFor={`star-3-${product._id}`} title="3 stars">
                        <FontAwesomeIcon
                          className="active"
                          icon={faStar}
                          aria-hidden="true"
                        />
                      </label>
                      <input
                        id={`star-2-${product._id}`}
                        type="radio"
                        name={`rating-${product._id}`}
                        defaultValue={`star-2-${product._id}`}
                        checked={product.rating === 2}
                      />
                      <label htmlFor={`star-2-${product._id}`} title="2 stars">
                        <FontAwesomeIcon
                          className="active"
                          icon={faStar}
                          aria-hidden="true"
                        />
                      </label>
                      <input
                        id={`star-1-${product._id}`}
                        type="radio"
                        name={`rating-${product._id}`}
                        defaultValue={`star-1-${product._id}`}
                        checked={product.rating === 1}
                      />
                      <label htmlFor={`star-1-${product._id}`} title="1 star">
                        <FontAwesomeIcon
                          className="active"
                          icon={faStar}
                          aria-hidden="true"
                        />
                      </label>
                    </div>
                    <div className="member-count">
                      <span> Үнэлгээ өгсөн </span>
                      {product.ratingCount}
                    </div>
                  </div>
                </div>
                <div className="divider-dashed" role="separator"></div>
                <div className="member-side-head">
                  <h6> QR кодыг уншуулан үнэлгээ өгнө үү </h6>
                  <div className="product_qr__box">
                    <QRCode
                      size={256}
                      style={{
                        height: "auto",
                        maxWidth: "30%",
                        width: "30%",
                      }}
                      className="prd-qr"
                      value={`${base.baseUrl}/productrates/${product._id}`}
                      viewBox={`0 0 256 256`}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="product-more">
                <h5> Дэлгэрэнгүй мэдээлэл</h5>

                <div
                  className={`product-detials`}
                  dangerouslySetInnerHTML={{
                    __html: product.details,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
