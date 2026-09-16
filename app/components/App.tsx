'use client';

import { useEffect, useMemo, useState } from 'react';
import type { AssetProps } from '../types';
import { categoryNames } from '../lib/shared';
import Icon from './Icon';
import { Gallery } from './Gallery';
import { Sidebar } from './Sidebar';
import { Toolbar } from './Toolbar';

export default function App() {
  const [assets, setAssets] = useState<AssetProps[]>([]);
  const [category, setCategory] = useState('All creations');
  const [collapsed, setCollapsed] = useState(false);
  const [faves, setFaves] = useState<any[]>([]);
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
    <div className={`wrapper ${collapsed ? 'sidebar-collapsed' : ''}`}>
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
        faves={faves}
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
          <Toolbar
            query={query}
            setQuery={setQuery}
            filtered={filtered}
            sortOldest={sortOldest}
            setSortOldest={setSortOldest}
          />
          {filtered.length ? (
            <Gallery
              filtered={filtered}
              faves={faves}
              setFaves={setFaves}
              setToast={setToast}
            />
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
          <span className="mono">IMAGINE LIBRARY · v1.0</span>
        </footer>
      </main>
    </div>
  );
}
