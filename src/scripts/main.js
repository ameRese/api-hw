import axios from 'axios';
import '../styles/style.css';

const extractParams = (pokemonData) => {
  const id = pokemonData.id;
    const name = pokemonData.name;
    const img = pokemonData.sprites.front_default;
    const types = [];
    pokemonData.types.forEach(typeItem => {
      types.push(typeItem.type.name);
    });
    return {id, name, img, types};
};

const showData = (data) => {
  const htmlData = `<dl>
    <dt>Name: ${data.name}</dt>
    <dd><img src="${data.img}" alt="" /></dd>
    <dd>ID: ${data.id}</dd>
    <dd>Type: ${data.types.join(',')}</dd>
    </dl>`;
  document.getElementById('js-result').innerHTML = htmlData;
};

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/pokemon/',
  timeout: 1000,
});

const submitHandler = async (e) => {
  e.preventDefault();

  // テキストボックス入力値を取得
  const form = new FormData(e.target);
  const pokeName = form.get('pokeName');

  try {
    // テキストボックス入力値をもとにGETリクエストを送信
    const response = await instance.get(pokeName);

    // レスポンスを抽出して表示
    const extractData = extractParams(response.data);
    showData(extractData);

  } catch (error) {
    console.error(error);
    alert('Pokemon not found');
  }
};

document.getElementById('js-form').addEventListener('submit', (e) => submitHandler(e)); 
