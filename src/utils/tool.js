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
  getTreeDataLevel1(data) {
    const arr = [];
    data.forEach((item) => {
      const parentNode = item.parentNode;
      if (parentNode === null) { // 筛选一级菜单
        arr.push({
          label: item.name,
          value: '0-' + item.id, // 0-0 第一个数字是parentID， 第二个是ID
          key: item.id,
          children: [],
        });
      }
    });
    return arr;
  },
  getTreeDataLevel2(data) {
    const level1 = this.getTreeDataLevel1(data);
    data.forEach((item) => {
      const parentNode = item.parentNode;
      if (parentNode !== null) {
        level1.forEach((params) => {
          if (parentNode.id === params.key) {
            params.children.push({
              label: item.name,
              value: params.key + '-' + item.id,
              key: item.id,
              children: [],
            });
          }
        });
      }
    });
    return level1;
  },
  getTreeDataLevel3(data) {
    const level2 = this.getTreeDataLevel2(data);
    data.forEach((item) => {
      const parentNode = item.parentNode;
      if (parentNode !== null) {
        level2.forEach((params) => {
          if (params.children.length > 0) {
            params.children.forEach((key) => {
              if (parentNode.id === key.key) {
                key.children.push({
                  label: item.name,
                  value: key.key + '-' + item.id,
                  key: item.id,
                });
              }
            });
          }
        });
      }
    });
    return level2;
  },
};
export default tool;
