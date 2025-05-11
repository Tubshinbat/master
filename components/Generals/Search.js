import { Button, Drawer, Input, Space, Tree } from "antd";
import useMemberCategories from "hooks/useMemberCategories";
import { SearchIcon, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Search = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const activeLink = pathname.split("/")[2] || "members";
  const { menus: treeData } = useMemberCategories();
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [searchText, setSearchText] = useState("");

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSelect = (keys, info) => {
    const selectedCategory = info.node?._id;
    if (selectedCategory) {
      router.push(`/${activeLink}?categories=${selectedCategory}`);
      setOpen(false);
    }
  };

  const filterTree = (inputValue, tree) => {
    if (!Array.isArray(tree)) return [];

    return tree
      .map((node) => {
        const children = filterTree(inputValue, node.children || []);
        if (
          node.title.toLowerCase().includes(inputValue.toLowerCase()) ||
          children.length
        ) {
          return { ...node, children };
        }
        return null;
      })
      .filter(Boolean);
  };

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      router.push(`/${activeLink}?q=${encodeURIComponent(searchText.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <div className="search-box">
        <div className="container-fluid">
          <div className="search-inner">
            <div className="search-filter" onClick={showDrawer}>
              <div className="search-filter-icon">
                <SlidersHorizontal />
              </div>
              <span>Шүүлтүүр</span>
            </div>

            <div className="search-input">
              <div className="search-button" onClick={handleSearch}>
                <SearchIcon />
              </div>
              <Input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Үсчин, Гоо сайхан, Сувилагч, Багш, Мэргэжилтэн...."
                className="search-input-field"
              />
              <div className="search-types">
                <div className="search-type">
                  <Link
                    href="/members"
                    className={
                      "search-type-link" +
                      (activeLink === "members" ? " active" : "")
                    }
                  >
                    Гишүүн
                  </Link>
                </div>
                <div className="search-type">
                  <Link
                    href="/partners"
                    className={
                      "search-type-link" +
                      (activeLink === "organization" ? " active" : "")
                    }
                  >
                    Байгууллага
                  </Link>
                </div>

                <div className="search-type">
                  <Link
                    href="/products"
                    className={
                      "search-type-link" +
                      (activeLink === "products" ? " active" : "")
                    }
                  >
                    Бүтээгдэхүүн
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Drawer
        placement="left"
        width={500}
        title="Хайлт хийх"
        onClose={onClose}
        open={open}
      >
        <div className="search-drawer">
          <div className="search-drawer-item">
            <div className="search-drawer-form">
              <div className="search-drawer-label">Төрөл</div>
              <div className="search-types">
                <div className="search-type">
                  <Link
                    href="/members"
                    className={
                      "search-type-link" +
                      (activeLink === "members" ? " active" : "")
                    }
                  >
                    Гишүүн
                  </Link>
                </div>
                <div className="search-type">
                  <Link
                    href="/partners"
                    className={
                      "search-type-link" +
                      (activeLink === "partners" ? " active" : "")
                    }
                  >
                    Байгууллага
                  </Link>
                </div>

                <div className="search-type">
                  <Link
                    href="/products"
                    className={
                      "search-type-link" +
                      (activeLink === "products" ? " active" : "")
                    }
                  >
                    Бүтээгдэхүүн
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="search-drawer-item">
            <div className="search-drawer-form">
              <label className="search-drawer-label">Ажил, мэргэжил</label>
              <div className="search-drawer-input">
                <SearchIcon />
                <Input
                  placeholder="Гоо сайханч, програмист, тогооч..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="search-company-list">
              <Tree
                treeData={filterTree(searchTerm, treeData)}
                onSelect={onSelect}
                defaultExpandAll
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Search;
