import '../styles/style.css';
import { getPokeList, getPokemonData, getTypeList } from './modules/HttpRequest';
import { extractParams, showPokeData } from './modules/PokemonData';
import { addIdToPokeList, addIdToTypeList, showTypeList } from './modules/PreLoad';
import { searchPokemon, showSearchResult } from './modules/SearchPokemon';

let pokeListWithId = [];

const loadHandler = async () => {
  const pokemonList = await getPokeList();
  // 以降の処理のためにポケモン一覧にPokemonIDを追加
  pokeListWithId = addIdToPokeList(pokemonList.results);

  const pokeTypeList = await getTypeList();
  // 以降の処理のためにタイプ一覧にTypeIDを追加
  const typeListWithId = addIdToTypeList(pokeTypeList.results);
  // TypeIDが10001以上のものは不使用なのでそれ未満を抽出
  const validTypeList = typeListWithId.filter((type) => type.id < 10001);
  // タイプ一覧を表示
  showTypeList(validTypeList);
};

const inputHandler = (e) => {
  const inputText = e.target.value;
  const searchResult = searchPokemon(inputText, pokeListWithId);

  showSearchResult(searchResult);
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
