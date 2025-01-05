let score = 0;
let itemsLeft = 5; // Количество элементов для сортировки

const scoreElement = document.getElementById('score');
const winMessage = document.getElementById('win-message');
const itemsContainer = document.getElementById('items-container'); // Контейнер для элементов отходов

const initialItemsHTML = `
    <div class="item-box" id="newspaper-item" draggable="true" ondragstart="drag(event)">
        <div class="item-content">Газета</div>
    </div>
    <div class="item-box" id="cardboard-box-item" draggable="true" ondragstart="drag(event)">
        <div class="item-content">Коробка</div>
    </div>
    <div class="item-box" id="glass-bottle-item" draggable="true" ondragstart="drag(event)">
        <div class="item-content">Бутылка</div>
    </div>
    <div class="item-box" id="magazines-item" draggable="true" ondragstart="drag(event)">
        <div class="item-content">Журнал</div>
    </div>
    <div class="item-box" id="plastic-bottle-item" draggable="true" ondragstart="drag(event)">
        <div class="item-content">Бутылка ПЭТ</div>
    </div>
`;

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const droppedElement = document.getElementById(data);

    // Получаем правильный контейнер
    const correctBin = getCorrectBin(droppedElement);

    if (event.target === correctBin) {
        score += 10;  // Увеличиваем очки на 10 за каждый правильно отсортированный элемент
        scoreElement.textContent = score;

        // Добавляем анимацию исчезновения
        droppedElement.classList.add('fade-out');

        // После завершения анимации убираем элемент
        setTimeout(() => {
            droppedElement.style.display = 'none'; // Скрываем элемент
            correctBin.appendChild(droppedElement); // Добавляем в контейнер
            droppedElement.classList.remove('fade-out');

            // Уменьшаем количество оставшихся элементов
            itemsLeft--;

            // Проверка на завершение игры
            if (itemsLeft === 0) {
                showWinMessage();
            }
        }, 300); // Время для анимации исчезновения (сокращено)
    }
}

function getCorrectBin(item) {
    switch (item.id) {
        case 'newspaper-item':
            return document.getElementById('paper-bin');
        case 'cardboard-box-item':
            return document.getElementById('cardboard-bin');
        case 'glass-bottle-item':
            return document.getElementById('glass-bin');
        case 'magazines-item':
            return document.getElementById('magazines-bin');
        case 'plastic-bottle-item':
            return document.getElementById('plastic-bin');
        default:
            return null;
    }
}

function showWinMessage() {
    winMessage.classList.remove('hidden');
}

function restartGame() {
    // Сбрасываем очки и количество элементов
    score = 0;
    scoreElement.textContent = score;
    itemsLeft = 5;

    // Скрываем сообщение и кнопку
    winMessage.classList.add('hidden');

    // Восстанавливаем элементы
    itemsContainer.innerHTML = initialItemsHTML; // Возвращаем исходные элементы обратно в контейнер

    // Восстанавливаем обработчики перетаскивания
    const items = itemsContainer.querySelectorAll('.item-box');
    items.forEach(item => {
        item.setAttribute('draggable', 'true');
        item.addEventListener('dragstart', drag);
    });

    // Сбрасываем контейнеры
    const bins = document.querySelectorAll('.bin');
    for (let bin of bins) {
        bin.innerHTML = `<div class="bin-label">${bin.querySelector('.bin-label').textContent}</div>`; // Очищаем контейнеры
    }
}
