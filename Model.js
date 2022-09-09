const { EventEmitter } = require('events');


class Model extends EventEmitter {
  // сначала приложение находится на стартовой странице (выбор темы)
  // подумай, какие ещё страницы будут в твоём приложении?
  #page = 'start';

  #score = 0;

  #questionCount = 0;

  #questionKey = '';

  #answerKey = '';

  getPage() {
    return this.#page;
  }
  getTopics() {
    const fs = require('fs');
    return fs.readdirSync(`${__dirname}/topics`).map((element) => element.replace(/^(.*?)_.+/, '$1'))
  }

  chooseTopic(topic) {
    const fs = require('fs');
    this.#page = 'question';

    this.#questionKey = fs.readFileSync(`${__dirname}/topics/nighthawk_.txt`, 'utf-8').split('\n')[this.#questionCount]
    this.#answerKey = fs.readFileSync(`${__dirname}/topics/nighthawk_.txt`, 'utf-8').split('\n')[this.#questionCount + 1]
    this.makeCountBigger()
    // тема выбрана, сделай необходимые изменения в модели (в т.ч. измени this.page)
    // ...
    // и теперь пора уведомить View об этих изменениях
    this.emit('update');
  }

  getQuestion() {
    return this.#questionKey
  }
  getAnswer() {
    return this.#answerKey
  }

  makeCountBigger() {
    this.#questionCount += 3;
  }
  getScore() {
    return this.#score;
  }
  getQuestionCount() {
    return this.#questionCount
  }

}

module.exports = Model;
