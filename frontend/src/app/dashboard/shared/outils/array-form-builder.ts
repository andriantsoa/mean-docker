import { FormGroup, FormBuilder } from '@angular/forms';

const formBuilder = new FormBuilder();

// export const createArrayFormulaireFromSourceObject = (defaultValue: any, sourceObject: any, ObjectKey?: string, optFunction:() FormGroup): FormGroup => {
//   const list = [];
//   sourceObject = Object.assign({}, { ...sourceObject });
//   if (!ObjectKey) {
//     return optFunction;
//   }
//   (sourceObject[ObjectKey] || []).forEach((value: any) => list.push(formBuilder.group({ ...defaultValue, ...value })));
//   return formBuilder.group({
//     [ObjectKey]: formBuilder.array(list),
//   });
// }
