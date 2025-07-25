export const transformPlayer = (doc, returnedObject) => {
  const fieldsToCapitalize = ['position', 'nationality', 'region', 'teams', 'world-cup', 'data'];

  fieldsToCapitalize.forEach(field => {
    if (returnedObject[field] && typeof returnedObject[field] === 'string') {
      returnedObject[field] = returnedObject[field].charAt(0).toUpperCase() + returnedObject[field].slice(1);
    }
  });

  let nameParts = returnedObject.name.split(' ');
  nameParts = nameParts.map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase());
  returnedObject.name = nameParts.join(' ');

  delete returnedObject._id;
  delete returnedObject.__v;
};
