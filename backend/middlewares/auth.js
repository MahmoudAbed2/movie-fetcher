import keys from '../config/keys.js';

const authenticate = (req, res, next) => {
    const { key } = req.query;
    if (!key) {
        const response = {
            success : false,
            status : 401,
            error : 'Unauthorized'
        }
        return res.status(401).send(response);
    }
    if (!keys.includes(key)) {
        const response = {
            success : false,
            status : 403,
            error : 'Forbidden'
        }
        return res.status(403).send(response);
    }
    next();
}

export default authenticate;