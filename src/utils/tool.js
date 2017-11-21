const tool = {
  formatData(data) {
    data.forEach((item) => {
      Object.assign(...item, { key: item.id });
    });
    return data;
  },
  getCookie(name) {
    const reg = new RegExp(`(^| )${name}=([^;]*)(;|$)`);
    const arr = document.cookie.match(reg);
    if (arr) {
      return decodeURIComponent(arr[2]);
    } else {
      return null;
    }
  },
  delCookie({ name, domain, path }) {
    if (tool.getCookie(name)) {
      document.cookie = `${name}=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=${path}; domain=${domain}`;
    }
  },
  getIndex(id, arr) {
    let num;
    arr.forEach((item, index) => {
      if (item.id === id) {
        num = index;
      }
    });
    return num;
  },
};
export default tool;
