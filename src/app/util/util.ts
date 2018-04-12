const utils ={
  parseParam(obj) {
    if (!obj) {
      return '';
    }
    const pair = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        pair.push(`${encodeURIComponent(key)}=${obj[key]}`);
      }
    }
    return pair.join('&');
  },
};
export default utils;
