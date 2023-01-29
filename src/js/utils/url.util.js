export const retrieveAppropriateBackUrl = (backURL, backupURL) => {
  if (!backURL) {
    return backupURL;
  }
  const backURLObject = new URL(backURL);
  return backURLObject.pathname.startsWith(`${backupURL}?`) ? `${backURLObject.pathname}${backURLObject.search}` : backupURL;
}