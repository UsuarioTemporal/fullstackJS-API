
const bcrypt = require('bcrypt');

const SALTS = 5;


/**
 *
 * @param password
 * @param cb
 */
module.exports.generateHash = (password, cb) => {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, SALTS, (err, generatedHash) => {
			if (err) {
				return reject(cb?cb(err):err);
			}

			resolve(cb?cb(null, generatedHash):generatedHash);
		});
	});
};

/**
 *
 * @param password
 * @param hash
 * @param cb
 */
module.exports.compareHash = (password, hash, cb) => {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, compareResult) => {
			if (err) {
				return reject(cb?cb(err):err);
			}

			resolve(cb?cb(null, compareResult):compareResult);
		});
	});
};
