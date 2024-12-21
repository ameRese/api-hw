export const searchPokemon = (keyword, pokeListWithId) => {
  const result = [];
  if (keyword.length > 0) {
    pokeListWithId.forEach((pokemon) => {
      if (pokemon.name.startsWith(keyword)) {
        result.push({
          name: pokemon.name,
          id: pokemon.id,
        });
      }
    });
  }
  return result;
};

export const showSearchResult = (searchResults) => {
  const frag = document.createDocumentFragment();
  searchResults.forEach((searchResult) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'js-button';
    button.textContent = searchResult.name;
    button.setAttribute('data-id', searchResult.id);

    li.append(button);
    frag.append(li);
  });

  // 既存の子ノードを削除してから検索結果を追加
  const ul = document.getElementById('js-search-list');
  while (ul.firstChild) { ul.removeChild(ul.firstChild) }
  ul.append(frag);
};
