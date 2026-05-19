// 游戏状态
let secretNumber;
let attempts;
let gameHistory;

// DOM元素
const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const resetBtn = document.getElementById('resetBtn');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const history = document.getElementById('history');

// 初始化游戏
function initGame() {
    secretNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    gameHistory = [];
    feedback.textContent = '';
    feedback.className = 'feedback';
    attemptsDisplay.textContent = '0';
    history.innerHTML = '';
    guessInput.value = '';
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessInput.focus();
}

// 获取提示级别（冷/暖/热）
function getHintLevel(difference) {
    if (difference <= 3) return 'hot';
    if (difference <= 10) return 'warm';
    return 'cold';
}

// 获取提示文字
function getHintText(guess, difference) {
    const level = getHintLevel(difference);
    let levelText = '';
    if (level === 'hot') levelText = '🔥 很热！';
    else if (level === 'warm') levelText = '🌡️ 有点暖！';
    else levelText = '❄️ 太冷了！';
    
    if (guess > secretNumber) {
        return `${levelText} 猜大了！`;
    } else {
        return `${levelText} 猜小了！`;
    }
}

// 处理猜测
function handleGuess() {
    const guess = parseFloat(guessInput.value);
    
    // 输入验证
    if (isNaN(guess) || !Number.isInteger(guess) || guess < 1 || guess > 100) {
        feedback.textContent = '请输入1-100之间的有效数字！';
        feedback.className = 'feedback';
        guessInput.value = '';
        guessInput.focus();
        return;
    }
    
    attempts++;
    attemptsDisplay.textContent = attempts;
    
    const difference = Math.abs(guess - secretNumber);
    
    // 判断结果
    if (guess === secretNumber) {
        feedback.textContent = `🎉 恭喜！你猜对了！答案就是 ${secretNumber}！用了 ${attempts} 次猜中！`;
        feedback.className = 'feedback correct';
        addHistoryItem(guess, 'correct', `🎉 猜中了！`);
        guessInput.disabled = true;
        guessBtn.disabled = true;
    } else {
        const hint = getHintText(guess, difference);
        feedback.textContent = hint;
        feedback.className = `feedback ${getHintLevel(difference)}`;
        
        const direction = guess > secretNumber ? 'high' : 'low';
        const directionText = guess > secretNumber ? '猜大了' : '猜小了';
        addHistoryItem(guess, direction, directionText);
    }
    
    guessInput.value = '';
    guessInput.focus();
}

// 添加历史记录
function addHistoryItem(guess, type, text) {
    const item = document.createElement('div');
    item.className = `history-item ${type}`;
    item.textContent = `${attempts}. ${guess} - ${text}`;
    history.insertBefore(item, history.firstChild);
}

// 事件监听
guessBtn.addEventListener('click', handleGuess);
resetBtn.addEventListener('click', initGame);

// 回车键提交
guessInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        handleGuess();
    }
});

// 页面加载时初始化游戏
document.addEventListener('DOMContentLoaded', initGame);