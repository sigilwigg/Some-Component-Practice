// ========== [///// DEPENDENCIES /////] ==========
// ----- libraries -----
const _ = require('lodash');

// ----- local files -----
const users = require('../fake_db/users.json');
const { BadRequestError, NotFoundError } = require("../expressError");

// ========== [///// CONFIG /////] ==========
let curId = _.size(users);


// ========== [///// CLASS /////] ==========
class User {
    // ----- REGISTER new user -----
    static async register(user) {
        user.id = curId++;

        if (!user.state) user.state = 'pending';
        if (!user.isAdmin) user.isAdmin = false;

        users[user.id] = user;
        console.log('Created user:', user);
        return user;
    }

    // ----- AUTHENTICATE user -----
    static async authenticate(name, password) {
        let user
        for (let key in users) {
            if (users[key].name === name) {
                user = users[key];
                break
            }
        }

        if (!user) throw new NotFoundError();

        if (password == user.password) {
            return user;
        }

        throw new UnauthorizedError("Invalid name/password");
    }

    // ----- GET by id -----
    static async get(id) {
        let user = users[id];
        if (!user) throw new NotFoundError();
        return users[id];
    }

    // ----- GET all -----
    static async getAll() {
        let userArr = _.toArray(users);
        return userArr;
    }

    // ----- UPDATE by id -----
    static async update(user, id) {
        if (user.id != id) throw new BadRequestError('ID paramter does not match body');
        if (!users[user.id]) throw new NotFoundError();

        let dbUser = users[user.id];
        for (let item in user) {
            dbUser[item] = user[item];
        }

        console.log('Updating user', dbUser);
        return dbUser;
    }

    // ----- DELETE by id -----
    static async remove(id) {
        let user = users[id];
        if (!users[user.id]) throw new NotFoundError();
        delete users[id];
        console.log('Deleted user', user);
        return user;
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = User;