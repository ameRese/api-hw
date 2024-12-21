import '../styles/style.css';
import { getPokeList, getPokemonData, getTypeList } from './modules/HttpRequest';
import { extractParams, showPokeData } from './modules/PokemonData';
import { addIdToPokeList, addIdToTypeList, showTypeList } from './modules/PreLoad';
import { searchPokemon, showSearchResult } from './modules/SearchPokemon';

let pokeListWithId = [];

// ページロード時の処理
const loadHandler = async () => {
  // ポケモン一覧を取得
  const pokemonList = await getPokeList();
  pokeListWithId = addIdToPokeList(pokemonList.results);

  // タイプ一覧を取得して表示
  const pokeTypeList = await getTypeList();
  const typeListWithId = addIdToTypeList(pokeTypeList.results);
  // TypeIDが10001以上のものは不使用
  const validTypeList = typeListWithId.filter((type) => type.id < 10001);
  showTypeList(validTypeList);
};

// インプットボックス入力・変更時の処理
const inputHandler = (e) => {
  // インプットボックスの内容に応じた検索結果を表示
  const inputText = e.target.value;
  const searchResult = searchPokemon(inputText, pokeListWithId);
  showSearchResult(searchResult);

  // インプットボックスに文字が入力されている場合のみjs-buttonクラスの要素が出現するのでinputHandler内で処理
  const jsButtons = document.querySelectorAll('.js-button');
  if (jsButtons) {
    for (let jsButton of jsButtons) {
      jsButton.addEventListener('click', (e) => clickHandler(e));
    }
  }
};

// 検索結果クリック時の処理
const clickHandler = async (e) => {
  // クリックされたボタンに紐づいたIDのポケモンデータを表示
  const pokeId = e.target.getAttribute('data-id');
  const pokemonData = await getPokemonData(pokeId);
  const extractData = extractParams(pokemonData);
  showPokeData(extractData);
};

const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get('pokeName').toLowerCase();
  return pokeName;
}

const submitHandler = async (e) => {
  e.preventDefault();
  // テキストボックス入力値をもとにGETリクエストを送信
  const inputName = getInputName(e);
  const pokemonData = await getPokemonData(inputName);
  // レスポンスを抽出して表示
  const extractData = extractParams(pokemonData);
  showPokeData(extractData);
};

window.addEventListener('load', () => loadHandler());
document.getElementById('js-input').addEventListener('input', (e) => inputHandler(e));
document.getElementById('js-form').addEventListener('submit', (e) => submitHandler(e)); 
