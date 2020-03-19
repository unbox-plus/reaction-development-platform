import Reaction from '/imports/plugins/core/core/server/Reaction';

export const getPackageSettings = packageName => {
  const unboxpayPackage = Reaction.getPackageSettings(packageName);

  const { settings } = unboxpayPackage;

  return settings[packageName];
};
