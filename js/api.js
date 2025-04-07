const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Route = {
  GET: '/data',
  POST: ''
};

const Method = {
  GET: 'GET',
  POST: 'POST'
};

const ErrorText = {
  GET: 'При загрузке данных с сервера произошла ошибка',
  POST: 'При отправке данных произошла ошибка'
};


const loadData = (route, method = Method.GET, body = null) => fetch(`${BASE_URL}${route}`, {method, body})
  .then((response) =>
    response.ok ? response.json() : Promise.reject(ErrorText[method]));

const getData = () => loadData(Route.GET);

const sendData = (body) => loadData(Route.POST, Method.POST, body);


export { getData, sendData };
