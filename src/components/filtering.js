import {createComparison, defaultRules} from "../lib/compare.js";

export function initFiltering(elements, indexes) {
    Object.keys(indexes)                                    // Получаем ключи из объекта
          .forEach((elementName) => {                        // Перебираем по именам
            elements[elementName].append(                    // в каждый элемент добавляем опции
                ...Object.values(indexes[elementName])        // формируем массив имён, значений опций
                          .map(name => {                        // используйте name как значение и текстовое содержимое
                            const option = document.createElement('option');
                            option.value = name;
                            option.textContent = name;
                            return option;
                          })
            )
         });

    const compare = createComparison(defaultRules);

    return (data, state, action) => {
        if (action && action.name === 'clear') {
            const input = action.parentElement.querySelector('input');
            if (input) {
                input.value = '';
                state[action.dataset.field] = '';
            }
        }

        return data.filter(row => compare(row, state));
    }
}
