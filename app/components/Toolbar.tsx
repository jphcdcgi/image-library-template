'use client';

import type { ToolbarProps } from '../types';
import Icon from './Icon';

export function Toolbar({
  filtered,
  query,
  setQuery,
  setSortOldest,
  sortOldest
}: ToolbarProps) {
  return (
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
          {filtered.length} {filtered.length === 1 ? 'creation' : 'creations'}
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
  );
}
