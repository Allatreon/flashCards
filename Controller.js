class Controller {
  #model;

  #view;

  constructor(model, view) {
    this.#model = model;
    this.#view = view;

    // здесь будем ловить события View и соответственно изменять Model
    //comment
    //never mind

    this.#view.on('topicChosen', (topic) => this.#model.chooseTopic(topic));
    this.#view.on('answer1', (topic) => this.#model.chooseTopic(topic));
  }

  run() {
    // попросим View отобразить первоначальный экран
    this.#view.render();
  }
}

module.exports = Controller;
