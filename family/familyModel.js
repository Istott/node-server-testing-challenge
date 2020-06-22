const db = require("../data/dbConfig.js");

module.exports = {
    insert,
    update,
    remove,
    getAll,
    findById,
};

function insert(familyName) {
    return db("family")
        .insert(familyName, "id")
        .then(([id]) => {
            return findById(id);
        });
}

async function update(id, changes) {
    return null;
}

function remove(id) {
    return null;
}

function getAll() {
    return db("family");
}

function findById(id) {
    return db("family").where({ id }).first();
}
