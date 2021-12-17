// ========== [///// DEPENDENCIES /////] ==========
// ----- libraries -----
const _ = require('lodash');

// ----- local files -----
const musics = require('../fake_db/musics.json');
const { BadRequestError, NotFoundError } = require("../expressError");

// ========== [///// CONFIG /////] ==========
let curId = _.size(musics);


// ========== [///// CLASS /////] ==========
class Music {
    // ----- CREATE new -----
    static async create(music) {
        music.id = curId++;
        musics[music.id] = music;
        console.log('Created music', music);
        return music;
    }

    // ----- GET by id -----
    static async get(id) {
        let music = musics[id];
        if (!music) throw new NotFoundError();
        return musics[id];
    }

    // ----- GET all -----
    static async getAll() {
        let musicArr = _.toArray(musics);
        return musicArr;
    }

    // ----- UPDATE by id -----
    static async update(music, id) {
        if (music.id != id) throw new BadRequestError('ID paramter does not match body');
        if (!musics[music.id]) throw new NotFoundError();

        let dbMusic = musics[music.id];
        for (let item in music) {
            dbMusic[item] = music[item];
        }

        console.log('Updating music', dbMusic);
        return dbMusic;
    }

    // ----- DELETE by id -----
    static async remove(id) {
        let music = musics[id];
        if (!musics[music.id]) throw new NotFoundError();
        delete musics[id];
        console.log('Deleted music', music);
        return music;
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = Music;