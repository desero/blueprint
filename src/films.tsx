/*
 * Copyright 2017 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the terms of the LICENSE file distributed with this project.
 */

import { Menu, MenuItem } from '@blueprintjs/core';
import { ItemPredicate, ItemRenderer, ItemListRenderer } from '@blueprintjs/select';
import { Colors } from '@blueprintjs/core';
import * as React from 'react';

export interface IonFilm {
  /** Title of film. */
  title: string;
  /** Release organisation. */
  organisation: string;
  /** Project icon. */
  icon?: string;
  /** Project icon. */
  color?: string;
  /** IMDb ranking. */
  rank: number;
}

/** Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top */
export const TOP_100_FILMS: IonFilm[] = [
  { title: 'Presslabs.com', organisation: 'Presslabs', icon: 'desktop', color: Colors.GREEN2 },
  { title: 'Hostcamp.org', organisation: 'Presslabs', color: Colors.GOLD2 },
  { title: 'Hoststack.com', organisation: 'Presslabs', icon: 'panel-table', color: Colors.RED2 },
  { title: 'Stack.it', organisation: 'Presslabs', icon: 'layers' }
].map((m, index) => ({ ...m, rank: index + 1 }));

export const renderFilm: ItemRenderer<IonFilm> = (
  film,
  { handleClick, modifiers, query }
) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  const text = `${film.rank}. ${film.title}`;
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      // label={film.organisation.toString()}
      key={film.rank}
      onClick={handleClick}
      text={highlightText(text, query)}
    />
  );
};

export const renderMenu: ItemListRenderer<IonFilm> = ({ items, itemsParentRef, query, renderItem }) => {
    const renderedItems = items.map(renderItem).filter(item => item != null);
    return (
        <Menu ulRef={itemsParentRef} large={true}>
          <MenuItem
            disabled={true}
            text={query !== '' ?
              (renderedItems.length ?
              `Found ${renderedItems.length} items matching "${query}"` : `No matching results`) :
              `Found ${renderedItems.length} items`
            }
          />
          {renderedItems}
        </Menu>
    );
};

export const filterFilm: ItemPredicate<IonFilm> = (query, film) => {
  return (
    `${film.rank}. ${film.title.toLowerCase()} ${film.organisation}`.indexOf(
      query.toLowerCase()
    ) >= 0
  );
};

function highlightText(text: string, query: string) {
  let lastIndex = 0;
  const words = query
    .split(/\s+/)
    .filter(word => word.length > 0)
    .map(escapeRegExpChars);
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join('|'), 'gi');
  const tokens: React.ReactNode[] = [];
  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
}

function escapeRegExpChars(text: string) {
  return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, '\\$1');
}

export const filmSelectProps = {
  itemPredicate: filterFilm,
  itemRenderer: renderFilm,
  itemListRenderer: renderMenu,
  items: TOP_100_FILMS
};
