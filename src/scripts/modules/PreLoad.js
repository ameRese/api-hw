export const addIdToTypeList = (typeList) => {
  const START_ID_POS = 31;
  return typeList.map((type) => {
    return {
      name: type.name,
      url: type.url,
      id: type.url.slice(START_ID_POS, -1),
    };
  });
};

export const showTypeList = (typeList) => {
  const frag = document.createDocumentFragment();
  typeList.forEach((type) => {
    const label = document.createElement('label');
    label.textContent = type.name;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = 'type';
    input.value = type.id;
    input.setAttribute('data-url', type.url);

    label.append(input);
    frag.append(label);
  });

  const div = document.getElementById('js-type-list');
  div.append(frag);
};
