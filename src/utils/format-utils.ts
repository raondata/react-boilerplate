const formatUtils = {
  price: (value?: number): string => {
    return (value || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
};

export default formatUtils;
