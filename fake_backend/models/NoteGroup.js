// ========== [///// DEPENDENCIES /////] ==========
// ----- libraries -----
const _ = require('lodash');

// ----- local files -----
const noteGroups = require('../fake_db/note-groups.json');
const { BadRequestError, NotFoundError } = require("../expressError");

// ========== [///// CONFIG /////] ==========
let curId = _.size(noteGroups);


// ========== [///// CLASS /////] ==========
class NoteGroup {
    // ----- CREATE new -----
    static async create(noteGroup) {
        noteGroup.id = curId++;
        noteGroups[noteGroup.id] = noteGroup;
        console.log('Created noteGroup', noteGroup);
        return noteGroup;
    }

    // ----- GET by id -----
    static async get(id) {
        let noteGroup = noteGroups[id];
        if (!noteGroup) throw new NotFoundError();
        return noteGroups[id];
    }

    // ----- GET all -----
    static async getAll() {
        let noteGroupArr = _.toArray(noteGroups);
        return noteGroupArr;
    }

    // ----- UPDATE by id -----
    static async update(noteGroup, id) {
        if (noteGroup.id != id) throw new BadRequestError('ID paramter does not match body');
        if (!noteGroups[noteGroup.id]) throw new NotFoundError();

        let dbNoteGroup = noteGroups[noteGroup.id];
        for (let item in noteGroup) {
            dbNoteGroup[item] = noteGroup[item];
        }

        console.log('Updating noteGroup', dbNoteGroup);
        return dbNoteGroup;
    }

    // ----- DELETE by id -----
    static async remove(id) {
        let noteGroup = noteGroups[id];
        if (!noteGroups[noteGroup.id]) throw new NotFoundError();
        delete noteGroups[id];
        console.log('Deleted noteGroup', noteGroup);
        return noteGroup;
    }
}


// ========== [///// EXPORTS /////] ==========
module.exports = NoteGroup;