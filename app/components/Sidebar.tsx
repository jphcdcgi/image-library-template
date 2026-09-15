"use client";

import { SidebarTypes } from "../types";
import Icon from "./Icon";
import { categoryIcons, categoryNames } from "../lib/shared";

export function Sidebar({
  assets,
  category,
  collapsed,
  countFor,
  favorites,
  setCategoryAndScroll,
  setCollapsed,
  setToast,
}: SidebarTypes) {
  return (
    <aside className="sidebar" aria-label="Library navigation">
      <div className="sidebar-top">
        <a className="logo" href="#">
          <span className="logo-mark">𝕏</span>
          <span>imagine</span>
        </a>
        <button
          className="sidebar-collapse"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Collapse sidebar"
        >
          ‹
        </button>
      </div>
      <button
        className="create-button"
        onClick={() => setToast("Creation studio is ready for your next idea")}
      >
        <span className="create-plus">+</span>
        <span>New creation</span>
        <kbd>⌘ K</kbd>
      </button>
      <nav className="main-nav" aria-label="Primary">
        <a href="#" className="nav-link active">
          <Icon name="grid" />
          <span>All creations</span>
          <span className="nav-count">{assets.length || 48}</span>
        </a>
        <a
          href="#"
          className="nav-link"
          onClick={(event) => {
            event.preventDefault();
            setToast("Favorites are coming into focus soon");
          }}
        >
          <span className="nav-symbol">✦</span>
          <span>Favorites</span>
          <span className="nav-count">{favorites.length}</span>
        </a>
      </nav>
      <div className="side-rule" />
      <div className="section-label">
        <span>Collections</span>
        <button
          onClick={() => setToast("Create a collection from your library")}
        >
          +
        </button>
      </div>
      <nav className="category-nav" aria-label="Filter by category">
        {categoryNames.map((name, index) => (
          <button
            key={name}
            className={`category-link ${category === name ? "selected" : ""}`}
            onClick={() => setCategoryAndScroll(name)}
          >
            <span className="category-symbol">
              {category === name ? categoryIcons[index] : categoryIcons[index]}
            </span>
            <span>{name}</span>
            <span className="category-count">{countFor(name)}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="storage">
          <div className="storage-head">
            <span>Library storage</span>
            <span>2.4 / 10 GB</span>
          </div>
          <div className="storage-bar">
            <i />
          </div>
        </div>
        <button className="account">
          <span className="avatar">JP</span>
          <span className="account-copy">
            <b>James Pickering</b>
            <small>Personal workspace</small>
          </span>
          <Icon name="chevron" />
        </button>
      </div>
    </aside>
  );
}
