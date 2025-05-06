import { Input } from "antd";
import { SearchCheck, SearchIcon, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import React from "react";

const Search = () => {
  return (
    <div className="search-box">
      <div className="container-fluid">
        <div className="search-inner">
          <div className="search-filter">
            <div className="search-filter-icon">
              <SlidersHorizontal />
            </div>
            <span>Шүүлтүүр</span>
          </div>

          <div className="search-input">
            <div className="search-button">
              <SearchIcon />
            </div>
            <Input
              type="text"
              placeholder="Үсчин, Гоо сайхан, Сувилагч, Багш, Мэргэжилтэн...."
              className="search-input-field"
            />
            <div className="search-types">
              <div className="search-type">
                <Link href="/search/members" className="search-type-link">
                  Гишүүн
                </Link>
              </div>
              <div className="search-type">
                <Link href="/search/organization" className="search-type-link">
                  Байгууллага
                </Link>
              </div>

              <div className="search-type">
                <Link href="/search/products" className="search-type-link">
                  Бүтээгдэхүүн
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
