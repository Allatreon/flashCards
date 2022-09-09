const { EventEmitter } = require('events');


class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';

  #score = 0;

  #topic = '';

  #questionKey = '';

  getPage() {
    return this.#page;
  }
  getTopics() {
    const fs = require('fs');
    return fs.readdirSync(`${__dirname}/topics`).map((element) => element.replace(/^(.*?)_.+/, '$1'))
  }

  chooseTopic(topic) {
    this.#page = 'question';
    this.#questionKey = 'What shall I do?';
    this.#topic = topic;
    // тема выбрана, сделай необходимые изменения в модели (в т.ч. измени this.page)
    // ...
    // и теперь пора уведомить View об этих изменениях
    this.emit('update');
  }

  getScore() {
    return this.#score;
  }

}

module.exports = Model;
