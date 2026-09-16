'use client';

import { useEffect, useMemo, useState } from 'react';
import { Asset } from '../types';
import { categoryNames } from '../lib/shared';
import Icon from './Icon';
import { Sidebar } from './Sidebar';

export default function AssetLibrary() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [collapsed, setCollapsed] = useState(false);
  const [category, setCategory] = useState('All creations');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOldest, setSortOldest] = useState(false);
  const [toast, setToast] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetch('/assets.json')
      .then((response) => response.json())
      .then(setAssets)
      .catch(() => setToast('Could not load assets.json'));
  }, []);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 2200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const result = assets.filter((asset) => {
      const matchesCategory =
        category === 'All creations' || asset.category === category;
      const haystack =
        `${asset.title} ${asset.prompt} ${asset.model} ${asset.category}`.toLowerCase();
      return matchesCategory && (!normalized || haystack.includes(normalized));
    });
    return sortOldest ? [...result].reverse() : result;
  }, [assets, category, query, sortOldest]);

  const setCategoryAndScroll = (next: string) => setCategory(next);
  const countFor = (name: string) =>
    name === 'All creations'
      ? assets.length || 48
      : assets.filter((asset) => asset.category === name).length;

  return (
    <div className={`app-shell ${collapsed ? 'sidebar-collapsed' : ''}`}>
      {toast && (
        <div
          className="toast"
          role="status"
        >
          {toast}
        </div>
      )}
      <Sidebar
        assets={assets}
        category={category}
        collapsed={collapsed}
        countFor={countFor}
        favorites={favorites}
        setCategoryAndScroll={setCategoryAndScroll}
        setCollapsed={setCollapsed}
        setToast={setToast}
      />
      <main className="content">
        <header className="topbar">
          <div className="mobile-brand">
            <span className="logo-mark">𝕏</span>
            <span>imagine</span>
          </div>
          <div className="breadcrumb">
            <span>Library</span>
            <span className="crumb-slash">/</span>
            <strong>{category}</strong>
          </div>
          <div className="topbar-actions">
            <button
              className="top-icon"
              aria-label="Notifications"
            >
              <Icon name="bell" />
              <i className="notification-dot" />
            </button>
            <button
              className="top-avatar"
              aria-label="Open profile"
            >
              JP
            </button>
          </div>
        </header>
        <section className="library-view">
          <div className="page-heading">
            <div>
              <div className="eyebrow">YOUR CREATIVE ARCHIVE</div>
              <h1>
                {category} <span>{countFor(category)}</span>
              </h1>
              <p>Every image starts with a thought.</p>
            </div>
            <button
              className="view-toggle"
              aria-label="Gallery view"
            >
              <Icon name="grid" />
              <span>Gallery</span>
            </button>
          </div>
          <div
            className="mobile-categories"
            aria-label="Categories"
          >
            {categoryNames.map((name) => (
              <button
                key={name}
                className={`mobile-chip ${category === name ? 'selected' : ''}`}
                onClick={() => setCategoryAndScroll(name)}
              >
                {name}
              </button>
            ))}
          </div>
          <div className="toolbar">
            <label className="search-box">
              <Icon name="search" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="search"
                placeholder="Search creations, prompts, models..."
                aria-label="Search creations"
              />
              <kbd>⌘ F</kbd>
            </label>
            <div className="toolbar-right">
              <span className="result-count">
                {filtered.length}{' '}
                {filtered.length === 1 ? 'creation' : 'creations'}
              </span>
              <button
                className="sort-button"
                onClick={() => setSortOldest(!sortOldest)}
              >
                <span>{sortOldest ? 'Oldest first' : 'Recently added'}</span>
                <Icon name="chevron" />
              </button>
            </div>
          </div>
          {filtered.length ? (
            <div className="gallery">
              {filtered.map((asset) => (
                <article
                  className="asset-card"
                  key={asset.id}
                  tabIndex={0}
                  onClick={() => setToast(`Opened ${asset.title}`)}
                >
                  <img
                    className="asset-image"
                    src={asset.src}
                    alt={asset.alt}
                    loading="lazy"
                  />
                  <div className="asset-overlay">
                    <div className="asset-top">
                      <span className="type-badge">
                        <Icon name={asset.type} />
                        {asset.type}
                      </span>
                      <div className="asset-actions">
                        <button
                          className={`asset-action ${favorites.includes(asset.id) ? 'liked' : ''}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setFavorites((current) =>
                              current.includes(asset.id)
                                ? current.filter((id) => id !== asset.id)
                                : [...current, asset.id]
                            );
                          }}
                          aria-label={`Like ${asset.title}`}
                        >
                          <Icon name="heart" />
                        </button>
                        <button
                          className="asset-action"
                          onClick={(event) => {
                            event.stopPropagation();
                            setToast(`Preparing ${asset.title} for download`);
                          }}
                          aria-label={`Download ${asset.title}`}
                        >
                          <Icon name="download" />
                        </button>
                      </div>
                    </div>
                    <div className="asset-info">
                      <h3>{asset.title}</h3>
                      <p>{asset.prompt}</p>
                      <span className="asset-model">{asset.model}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">⌕</div>
              <h2>No creations found</h2>
              <p>Try a different search term or category.</p>
              <button
                className="clear-button"
                onClick={() => {
                  setQuery('');
                  setCategory('All creations');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
        <footer className="content-footer">
          <span>
            Showing <b>{filtered.length}</b> of {assets.length || 48} creations
          </span>
        </footer>
      </main>
    </div>
  );
}
