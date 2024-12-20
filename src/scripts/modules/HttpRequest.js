import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 1000,
});

export const getPokemonData = async (pokeName) => {
  try {
    const response = await instance.get(`pokemon/${pokeName}`);
    return response.data;
  } catch (error) {
    console.error(error);
    alert('Pokemon not found');
  }
};

export const getTypeList = async () => {
  try {
    const LIMIT_COUNTS = 60;
    const response = await instance.get(`type/?limit=${LIMIT_COUNTS}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
