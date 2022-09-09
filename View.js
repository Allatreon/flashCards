const { EventEmitter } = require('events');
const readlineSync = require('readline-sync');

class View extends EventEmitter {
  #model;

  constructor(model) {
    super();
    this.#model = model;

    // каждый раз когда модель изменяется обновляем отображение
    this.#model.on('update', () => this.render());
  }

  render() {
    console.clear();
    // отображаем ту страницу, на которой мы сейчас находимся
    switch (this.#model.getPage()) {
      case 'start':
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
    let topic = readlineSync.question("Напишите свою тему: \n ");
    this.emit("topicChosen", topic);
  }

  // страница отображения топиков
  renderQuestion() {

    let question = this.#model.getQuestion();
    let answer = this.#model.getAnswer();
    let topic = readlineSync.question(question);
    if (topic === answer) {
      console.log('правильно')
    } else {
      console.log('ложно')
    }
    readlineSync.question()
    this.emit("answer1", topic);
  }


  static #printTopics(topic) {
    console.log(topic);

  }
}

module.exports = View;
