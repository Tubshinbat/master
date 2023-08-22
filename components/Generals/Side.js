"use client";
import { Tree } from "antd";
import { getMemberCategories } from "lib/getFetchers";
import { useEffect, useState } from "react";

const menuGenerateData = (categories) => {
  let datas = [];
  if (categories) {
    categories.map((el) => {
      datas.push({
        title: el.name,
        key: el._id,
        children: el.children && menuGenerateData(el.children),
      });
    });
  }

  return datas;
};

const Side = () => {
  const [data, setData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    console.log("onCheck", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await getMemberCategories();
      if (categories) setData(menuGenerateData(categories));
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  return (
    <>
      <div className="sides">
        <div className="side">
          <div className="side-header">
            <h4> Ангилал </h4>
            <Tree
              defaultExpandAll
              checkable
              onExpand={onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onCheck={onCheck}
              checkedKeys={checkedKeys}
              onSelect={onSelect}
              selectedKeys={selectedKeys}
              treeData={data}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Side;
