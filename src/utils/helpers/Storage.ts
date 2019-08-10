export const changeLoaclStorageData = <Type>(keyName:string ,data: object):Type => {
    const oldItem = JSON.parse(localStorage.getItem(keyName) || '{}'),
        newItem = { ...oldItem, ...data};
    localStorage.setItem(keyName, JSON.stringify({ ...newItem, ...data}));
    return newItem
}