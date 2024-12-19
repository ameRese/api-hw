import '../styles/style.css';
import { getPokemonData } from './modules/HttpRequest';
import { extractParams, showData } from './modules/PokemonData';

const getInputName = (e) => {
  const form = new FormData(e.target);
  const pokeName = form.get('pokeName').toLowerCase();
  return pokeName;
}

const submitHandler = async (e) => {
  e.preventDefault();

  // テキストボックス入力値を取得
  const inputName = getInputName(e);

  // テキストボックス入力値をもとにGETリクエストを送信
  const pokemonData = await getPokemonData(inputName);

  // レスポンスを抽出して表示
  const extractData = extractParams(pokemonData);
  showData(extractData);
};

document.getElementById('js-form').addEventListener('submit', (e) => submitHandler(e)); 
