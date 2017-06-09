import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'MatchesPipe'
})
export class MatchesPipe implements PipeTransform {
    transform(items: Array<any>, values: string, type: string): string {
        var elementsArray = [values];
        var isMultiSelect = type === "multiselect";

        if (values == null){
            return "";
        }
        
        if (values.toString().indexOf(";") > -1) {
            elementsArray = values.split(";");
            var lists = items.filter(item => elementsArray.includes(isMultiSelect ? item.id.toString() : item.value.toString()));
        }
        else{
            elementsArray = elementsArray.map(value => value.toString())
        }

        var lists = items.filter(item => elementsArray.includes(isMultiSelect ? item.id.toString() : item.value.toString()));

        lists.forEach(list => elementsArray[lists.indexOf(list)] = isMultiSelect ? list.name : list.label)

        return elementsArray.join(", ");
    }
}