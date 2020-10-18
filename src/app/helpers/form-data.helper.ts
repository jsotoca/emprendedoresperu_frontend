export function createFormData(object:object){
    const formData = new FormData();
    for (const index in object['tags']) 
    {
        formData.append(`tags[${index}]`,object['tags'][index].toString());
    }
    delete object['tags'];
    for(let campo in object){
        formData.append(`${campo}`,object[campo]);
    }
    return formData;
}