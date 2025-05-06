import { Input, Select } from "antd";
import { Option } from "antd/es/mentions";
import { Search } from "lucide-react";
import React from "react";

const HomeHeader = () => {
  return (
    <div className="home__header">
      <div className="container">
        <div className="home__header_wrapper">
          <h2>Шилдэг мастерууд</h2>
          <div className="home__search">
            <Select
              className="home__search_select"
              placeholder="Мэргэжил сонгох"
            >
              <Option>Үсчин</Option>
              <Option>Гоо зүй</Option>
              <Option>Загвар өмсөгч</Option>
              <Option>Төрийн байгууллагын удирдах албан тугаалтан</Option>
              <Option>Захирал</Option>
            </Select>

            <Input placeholder="Үсчин, цаг засварчин..." />
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
