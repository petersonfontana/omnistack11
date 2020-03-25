const cnn = require('../db/cnn');

module.exports = {
    async create(request, response) {
        const { name, email, whatsapp, cidade, uf } = request.body;

        const id = uf + '_' + name;

        await cnn('ongs').insert({
            id, name, email, whatsapp, cidade, uf
        });

        return response.json({ id });
    },

    async list(request, response) {
        const ongs = await cnn('ongs').select('*');

        return response.json(ongs);
    }
};