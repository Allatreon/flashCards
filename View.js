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
      case "question":
        return this.renderQuestion();
      default:
        throw new Error("Wrong page");
    }
  }

  renderStartPage() {
    this.#model.getTopics().forEach(View.#printTopics); // поправить когда у нас будут данные
    console.log();
    const topic = readlineSync.question(
      "Нажмите цифру от 1-го до 3-х, для выбора темы"
    );
    this.emit("topicChosen", topic);
  }

  // страница отображения топиков
  renderQuestion() {
    View.#printTopics(this.#model.getTopics()); // отобразить выбранную тему
    console.log();
    const topicC = readlineSync.question(" ");
    if (topicC) {
      this.emit("answer1", answer1);
    }
  }

  static #printTopics(topic) {
    console.log(topic);
  }
}

module.exports = View;
