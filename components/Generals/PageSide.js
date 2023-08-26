"use client";
import { Tree } from "antd";
import { getMemberCategories } from "lib/getFetchers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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

const PageSide = ({ slug = "/" }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [data, setData] = useState([]);
  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };
  const onCheck = (checkedKeysValue) => {
    queryBuild("categories", checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };
  const onSelect = (selectedKeysValue, info) => {
    setSelectedKeys(selectedKeysValue);
  };

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const removeQuery = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams);
      params.delete(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const queryBuild = (name, value, isSame = false) => {
    let query = "?";
    let params = "";
    if (isSame === false) {
      params = createQueryString(name, value);
    } else {
      params = removeQuery(name, value);
    }
    router.push(slug + query + params);
  };

  useEffect(() => {
    const fetchData = async () => {
      const { categories } = await getMemberCategories();
      if (categories) setData(menuGenerateData(categories));
    };

    fetchData().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const category = searchParams.get("categories");
    category && setCheckedKeys(category.split(","));
  }, [searchParams]);

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

export default PageSide;
