import axios from 'axios';

const url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=a4803bc0abfd4b0ebf740b8cb212cdb4";

export async function getNews() {
  const { data } = await axios.get(url);
  return data.articles;
}