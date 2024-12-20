import '../styles/style.css';
import { getPokemonData, getTypeList } from './modules/HttpRequest';
import { extractParams, showPokeData } from './modules/PokemonData';
import { addIdToTypeList, showTypeList } from './modules/PreLoad';

const loadHandler = async () => {
  // タイプ一覧を取得
  const pokeTypeList = await getTypeList();
  // 以降の処理のためにタイプ一覧にTypeIDを追加
  const typeListWithId = addIdToTypeList(pokeTypeList.results);
  // TypeIDが10001以上のものは不使用なのでそれ未満を抽出
  const validTypeList = typeListWithId.filter((type) => type.id < 10001);
  // タイプ一覧を表示
  showTypeList(validTypeList);
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
document.getElementById('js-form').addEventListener('submit', (e) => submitHandler(e)); 
