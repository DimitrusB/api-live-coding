const host = 'https://webdev-hw-api.vercel.app/api/v2/todos';

export function getTodos (token) {
    return fetch(host, {
        method: "GET",
        headers: {
          Authorization : token,
        }
      })
        .then((response) => {
          if (response.status === 401){
            // token = prompt('Пароль не верный, повторите попытку');
            // fetchTodosAndRender();
            throw new Error ('Нет авторизации');
          }
          return response.json();
        });
}

export function delTodos(token, id) {
    return fetch("https://webdev-hw-api.vercel.app/api/v2/todos/" + id, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        });
}

export function postTodos (text, token) {
    return fetch(host , {
        method: "POST",
        body: JSON.stringify({
          text,
        }),
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          return response.json();
        });
}

export function loginUser ({login, password}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
      method: "POST",
      body: JSON.stringify({
       login,
       password,
      }),

    })
      .then((response) => {
        if (response.status === 400){
        throw new Error('Неверный логин или пароль');
        }
        return response.json();
      });
}

export function regUser ({login, password, name}) {
  return fetch("https://webdev-hw-api.vercel.app/api/user", {
      method: "POST",
      body: JSON.stringify({
       login,
       password,
       name,
      }),

    })
      .then((response) => {
        if (response.status === 400){
        throw new Error('Пользователь уже существует');
        }
        return response.json();
      });
}