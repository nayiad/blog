const getYearByTimeStamp = (ts) => {
    const data = new Data(ts);

    return data.getFullYear();
};

module.exports = getYearByTimeStamp;