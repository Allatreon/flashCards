const { EventEmitter } = require("events");
const readlineSync = require("readline-sync");

class View extends EventEmitter {
  #model;

  constructor(model) {
    super();
    this.#model = model;

    // каждый раз когда модель изменяется обновляем отображение
    this.#model.on("update", () => this.render());
  }

  render() {
    console.clear();
    // отображаем ту страницу, на которой мы сейчас находимся
    switch (this.#model.getPage()) {
      case "start":
        return this.renderStartPage();
      case "choose-topics":
        return this.#renderChooseTopic();
      default:
        throw new Error("Wrong page");
    }
  }

  renderStartPage() {
    if (this.#model.getTopics().length) {
      console.log("Животные");
      this.#model.getTopics().forEach(View.#printTopics); // поправить когда у нас будут данные
      console.log();
    }
    readlineSync.question("Нажмите любую клавишу, для выбора темы");
    // здесь попросим у модели список тем и предоставим пользователю выбор
    // ...
    // теперь уведомим контроллер о том что пользователь выбрал тему

    this.emit("topicChosen", topic);
  }

  //страница отображения топиков
  // renderChooseTopic() {
  //     // Отображаем текущий бургер
  //     View.#printTopics(this.#model.getCurrentBurger());
  //     console.log();

  //     console.log('Введите название нового ингридиента или оставьте пустым, чтобы закончить');
  //     // считываем следующий ингридиент из командной строки
  //     const ingridient = readlineSync.question('> ');

  //     // генерируем событие addIngridient если пользователь хочет добавить ингридиент
  //     // и stopMakeBurger если хочет закончить создание бургера
  //     if (ingridient) {
  //       this.emit('addIngridient', ingridient);
  //     } else {
  //       this.emit('stopMakeBurger');
  //     }

  // }

  static #printTopics(topic) {
    console.log(`[${topic.join(" | ")}]`);
  }
}

module.exports = View;
