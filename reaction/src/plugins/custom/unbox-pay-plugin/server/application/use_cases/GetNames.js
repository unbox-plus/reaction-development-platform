const getNames = fullName => fullName.split(' ');

/**
 * Gets the first name
 * @param {String} fullName Person full name
 */
export const getFirstName = fullName => {
  const names = getNames(fullName);

  return names[0];
};

/**
 * Gets the last name
 * @param {String} fullName Person full name
 */
export const getLastName = fullName => {
  const names = getNames(fullName);

  const lastName = names.slice(1).join(' ');

  return lastName;
};
