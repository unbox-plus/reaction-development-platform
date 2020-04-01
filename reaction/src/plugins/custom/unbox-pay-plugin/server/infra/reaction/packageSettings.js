export const getPackageSettings = async (context, shopId) => {
  const settings = await context.queries.appSettings(context, shopId);
  return settings;
};
