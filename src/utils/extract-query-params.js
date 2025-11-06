export function extractQueryParams(queryString) {
  return queryString
    .substr(1)
    .split("&")
    .reduce((acc, param) => {
      const [key, value] = param.split("=");
      acc[key] = value;
      return acc;
    }, {});
}
