import _ from "lodash";

function except(item, allConditions) {
    console.log(item)
    for (let value of item) {
        console.log(value)
    }
    // console.log(_.isEqual(condition, object2))
    return true
}

export function makeStrCondition(condition) {
    return {name: `${ condition.condition_name }: ${ condition.selected_values.map((item) => 
            (item.name)).join('; ') }`};
}

export function makeStrConditionSaved(condition, allConditions) {
    console.log(condition)

    let res
    if (condition.selected_operation.name == "кроме") {
        console.log(allConditions)
        let filtered_values = condition.selected_values.filter((item) => except(item, allConditions))
        console.log(filtered_values)
        let mapped_values = filtered_values.map((item) => (item.name)).join(`, `)
        console.log(mapped_values)
        res = {name: `${condition.condition_name}: ${condition.selected_operation.name} ${mapped_values}`};
    }
    else
        res = {name: `${ condition.condition_name }: ${ condition.selected_values.map((item) => 
                (item.name)).join(` ${condition.selected_operation.name} `) }`};
    return res
}