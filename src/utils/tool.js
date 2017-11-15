export default {
  formatData(data) {
    data.forEach((item) => {
      Object.assign(...item, { key: item.id });
    });
    return data;
  },
};
