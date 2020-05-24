window.onload = () => {

  const pathName = window.location.href;
  const part = pathName.substr(pathName.lastIndexOf('/') + 1);
  const target = part.substring(0, part.indexOf('.'));

  const ourSentences = {
    one: ['Малыш', 'живет', 'в', 'шведском', 'городе', 'Стокгольме.'],
    two: ['Друг', 'Малыша', '-', 'веселый', 'человечек', 'Карлсон.'],
    three: ['Карлсон', 'очень', 'любит', 'сладкое', 'варенье.'],
    four: ['У', 'Карлсона', 'есть', 'маленький', 'домик', 'на', 'крыше.'],
    five: ['По', 'вечерам', 'Карлсон', 'любит', 'смотреть', 'на', 'яркие', 'звездочки.'],
    six: ['Малышу', 'подарили', 'замечательного', 'щенка.'],
    seven: ['У', 'щенка', 'пушистая', 'шёрстка.'],
    eight: ['Щенок', 'любит', 'гулять', 'на', 'свежем', 'воздухе.'],
    nine: ['Малыш', 'построил', 'из', 'кубиков', 'высокую', 'башню.'],
    ten: ['Карлсон', 'ловит', 'золотую', 'рыбку', 'в', 'аквариуме.'],
    eleven: ['Малыш', 'любит', 'играть', 'с', 'плюшевым', 'мишкой.']
  };

  const targetWords = [
    'шведском', 'веселый', 'сладкое',
    'маленький', 'яркие', 'замечательного',
    'пушистая', 'свежем', 'высокую', 'золотую', 'плюшевым'
  ];

  let victoryTrigger = false;

  const carlsonRight = document.querySelector('.carlson-right');
  const carlsonLeft = document.querySelector('.carlson-left');
  const page = document.getElementById(`${target}`);

  const failSound = document.querySelector('.failSound');
  const victorySound = document.querySelector('.victorySound');
  const fullVictorySound = document.querySelector('.fullVictorySound');

  function checkLastLevel() {
    if (target === 'eleven') {
      carlsonDance();
    }
  }

  function carlsonDance() {
    fullVictorySound.play();
    setTimeout(() => {
      $('.victoryLeft').fadeOut();
      $('.bubbles').fadeOut();
      $('#eleven').fadeOut();
      carlsonRight.classList.add('carlsonDance');
    }, 3000);
    setTimeout(() => {
      $('.victoryTable').fadeIn(0).delay(5000).fadeOut();
    }, 13000);
    setTimeout(() => {
      $('.ball').fadeIn(0);
    }, 18000);
  }

  ourSentences[`${target}`].forEach(item => {
    const element = document.createElement('span');
    element.innerText = item + ' ';
    element.addEventListener('click', () => {
      if (targetWords.some(word => word.toLowerCase() === element.innerText.toLowerCase())) {
        element.style.backgroundColor = 'yellow';
        element.style.borderRadius = '10%';
        if (carlsonRight) {
          carlsonRight.style.right = '30%';
          carlsonRight.style.top = '5%';
          carlsonRight.style.transition = '2s';
          $('.victoryLeft').delay(2000).fadeIn(0);
          $('.bubbles').delay(2000).fadeIn(0);
          victorySound.play();
          victoryTrigger = true;
          checkLastLevel();
        } else if (carlsonLeft) {
          carlsonLeft.style.left = '10%';
          carlsonLeft.style.top = '5%';
          carlsonLeft.style.transition = '2s';
          $('.victoryRight').delay(2000).fadeIn(0);
          $('.bubbles').delay(2000).fadeIn(0);
          victorySound.play();
          victoryTrigger = true;
          checkLastLevel();
        }
      } else if (!victoryTrigger) {
        failSound.play();
        $('.hintLeft').length === 0 ? $('.hintRight').show().delay(2000).fadeOut() : $('.hintLeft').show().delay(2000).fadeOut();
      }
    });
    page.appendChild(element);
  });
};


