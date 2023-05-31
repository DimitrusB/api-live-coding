import { login } from "../api.js";
import { fetchTodosAndRender } from "../main.js";

export function renderLoginComponent({appEl, setToken}) {
    const appHtml = `<h1>Список задач</h1>
    <div  class="form">
      <h3 class="form-title">Форма авторизации</h3>
      <div class="form-row">
        Логин <input 
          type="text"
          id="login-input"
          class="input"
          placeholder="введите логин" />
        Пароль <input 
          type="text"
          id="password-input"
          class="input"
          placeholder="введите пароль"/>
      </div>
      <br />
      <button class="button" id="login-button">Авторизация</button>
    <br />`
;

appEl.innerHTML = appHtml;

document.getElementById("login-button").addEventListener("click", () => {
  login({
    login: "admin",
    password: "admin",
  }).then((user) => {
    setToken(`Bearer ${user.user.token}`);
    fetchTodosAndRender();
  });
});
}