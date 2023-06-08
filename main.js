import { delTodos, getTodos, postTodos } from "./api.js";
import { renderLoginComponent } from "./components/login-component.js";
// import { formatDateToRu, formatDateToUs } from "./lib/formatDate/formatDate.js"
import { format } from "date-fns";

let tasks = [];
let token = "Bearer bgc0b8awbwas6g5g5k5o5s5w606g37w3cc3bo3b83k39s3co3c83c03ck";
token = null;

export const fetchTodosAndRender = () => {
 return getTodos(token)
     .then((responseData) => {
      tasks = responseData.todos;
      renderApp();
    });
};

    const renderApp = () => {
      const appEl = document.getElementById('app');
      if (!token){
        renderLoginComponent ({appEl, 
            setToken: (newToken) =>{
            token  = newToken;
        }, 
        fetchTodosAndRender,
    });
  return;
      }
      const country = "ru"; 
      const tasksHtml = tasks
    .map((task) => {
      const createDate = format(new Date(task.created_at), 'yyyy-MM-dd hh:mm');
      return `
      <li class="task">
        <p class="task-text">
          ${task.text} (Создал: ${task.user?.name ?? 'Неизвестно'})
          <button data-id="${task.id}" class="button delete-button">Удалить</button>
        </p>
        <p><i>Задача создана: ${createDate}</i></p>
      </li>`;
    })
    .join("");

 const appHtml = `
        <ul class="tasks" id="list">
          ${tasksHtml}
        </ul>
        <div class="form">
          <h3 class="form-title">Форма добавления</h3>
          <div class="form-row">
            Что нужно сделать:
            <input
              type="text"
              id="text-input"
              class="input"
              placeholder="Выпить кофе"
            />
          </div>
          <br />
          <button class="button" id="add-button">Добавить</button>
        </div>`


  appEl.innerHTML = appHtml;

  const buttonElement = document.getElementById("add-button");
  const listElement = document.getElementById("list");
  const textInputElement = document.getElementById("text-input");
  const deleteButtons = document.querySelectorAll(".delete-button");

  for (const deleteButton of deleteButtons) {
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();

      const id = deleteButton.dataset.id;

      // Подписываемся на успешное завершение запроса с помощью then
 delTodos(token, id)
        .then((responseData) => {
          // получили данные и рендерим их в приложении
          tasks = responseData.todos;
          renderApp();
        });
    });
  }
  buttonElement.addEventListener("click", () => {
  if (textInputElement.value === "") {
    return;
  }

  buttonElement.disabled = true;
  buttonElement.textContent = "Задача добавляется...";

     postTodos(textInputElement.value,
         token,
        )
    .then(() => {
      // TODO: кинуть исключение
      textInputElement.value = "";
    })
    .then(() => {
      return fetchTodosAndRender();
    })
    .then(() => {
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
    })
    .catch((error) => {
      console.error(error);
      alert("Кажется, у вас проблемы с интернетом, попробуйте позже");
      buttonElement.disabled = false;
      buttonElement.textContent = "Добавить";
    });

  renderApp();
});
};

// fetchTodosAndRender();
renderApp();

