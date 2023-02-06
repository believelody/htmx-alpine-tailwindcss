export const retrieveAppropriateBackUrl = (backURL, backupURL) => {
  if (!backURL) {
    return backupURL;
  }
  const backURLObject = new URL(backURL);
  return backURLObject.pathname.startsWith(`${backupURL}?`) ? `${backURLObject.pathname}${backURLObject.search}` : backupURL;
}

export const port = 8000;

export const baseUrl = `http://localhost:${port}`;