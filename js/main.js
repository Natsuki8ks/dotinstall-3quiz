'use strict'

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([
    { q: '世界で一番大きな湖は?', c: ['カスピ海', 'カリブ海', '琵琶湖'] },
    { q: '2の8乗は?', c: ['256', '64', '1024'] },
    { q: 'What is C?', c: ['C0', 'C1', 'C2'] },
  ]);
// これらの問題の出題をシャッフルしたい時はsuffle()でオブジェクトを囲む

  let currentNum = 0;
  let isAnswered;
  let score = 0;


  function shuffle(arr) {

    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      //分割代入
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) {
    // if (isAnswered === true) {
    if (isAnswered) {
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
      score++;
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled');
  }

  function setQuiz() {
    //1度しか回答できなくする↓
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;

    //次の問題に進む設定
    while (choices.firstChild) {
      choices.removeChild(choices.firstChild);
    }


    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // console.log(quizSet[currentNum].c);
    // 元の配列を崩さないために[...スプレッド演算子]でかこう


    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      })
      choices.appendChild(li);
    });

    if (currentNum === quizSet.length -1) {
      btn.textContent = 'show score';
    } 
  }

  setQuiz();

  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    }
    btn.classList.add('disabled');

    if (currentNum ===quizSet.length - 1) {
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }

  })

}