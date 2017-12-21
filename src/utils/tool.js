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
      const itemId = item.id + '';
      const ids = id + '';
      if (itemId === ids) {
        num = index;
      }
    });
    return num;
  },
  Filter(list, value, key) {
    let tmpProducts = [];
    if (!value) {
      tmpProducts = list;
    } else {
      tmpProducts = list.filter((item) => {
        return item[key] === value;
      });
    }
    return tmpProducts;
  },
  doFilter(products, conditions) {
    // 根据条件循环调用筛选器里的方法
    let list = products;
    for (const key in conditions) {
      // 判断是否有需要的过滤方法
      if (true) {
        list = this.Filter(list, conditions[key], key);
      }
    }
    return list;
  },
};
export default tool;
