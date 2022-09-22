
export const defaultFieldValues = {
    conditionDefaultValues:
        [
            {name: 'Теги', value: null},
            {name: 'Ответственный', value: null},
            {name: 'Бюджет', value: null},
            {name: 'Источник', value: null},
        ],
    performConditionDefaultValues:
        [
            {name: 'при входящем звонке'},
            {name: 'при входящем письме'},
            {name: 'при входящем сообщении в чате'},
            {name: 'при заходе на сайт'},
            {name: 'по ключевому действию'},
            {name: 'при заполнении анкеты'},
            {name: 'при смене ответственного'}
        ],
    performTimeDefaultValues:
        [
            {name: 'в момент создания'},
            {name: 'Конец дня'},
            {name: 'Через день'},
            {name: 'Через 3 дня'},
            {name: 'В течение недели'}
        ],
    taskTypeDefaultValues:
        [
            {name: 'Звонок', task_type_id: 1},
            {name: 'Встреча', task_type_id: 2},
            {name: 'Максим Разработч', task_type_id: 2599750},
            {name: 'Взаимодействие', task_type_id: 2599585},
            {name: 'Связь, важно', task_type_id: 2599588},
            {name: '123', task_type_id: 2601037},
            {name: 'Контроль', task_type_id: 2628379}
        ],
    logicalDefaultValues:
        [
            {name: 'и'},
            {name: 'или'},
            {name: 'кроме'}
        ]
}