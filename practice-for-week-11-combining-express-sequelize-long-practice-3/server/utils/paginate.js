function paginate(req, res, next) {
    let page = parseInt(req.query.page) || 1;
    let size = parseInt(req.query.size) || 10;

    if(isNaN(page)){
        page = 1;
    }
    if(isNaN(size)) {
        size = 10;
    }

    let offset = (page - 1) * size;

    if (page != 0 || size != 0) {
        req.query.offset = offset;
        req.query.limit = size;
    } else {
        req.query.limit = null;
    }

    next();
}

module.exports = paginate;