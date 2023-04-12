function paginate(sqlObj, query) {
    const page = query.page || 1;
    let size = query.size || 5;
    let offset = (page - 1) * size;
    if (page == 0) {
        size = null;
        offset = null;
    }

    sqlObj.limit = size;
    sqlObj.offset = offset

    return sqlObj
}

module.exports = paginate