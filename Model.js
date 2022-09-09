const { EventEmitter } = require('events');
const fs = require('fs');

class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';

  #score = 0;

  #topics = fs.readdirSync(`${__dirname}/topics`).map((element) => element.replace(/^(.*?)_.+/, '$1'));

  getPage() {
    return this.#page;
  }

  chooseTopic(topic) {
    this.page = 'question';
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
