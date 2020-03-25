const cnn = require('../db/cnn');

module.exports = {
    // async create(request, response) {
    //     const { titulo, descricao, valor } = request.body;
    //     const ong_id = request.headers.authorization;

    //     const [id] = await cnn('casos').insert({
    //         titulo, descricao, valor, ong_id
    //     });

    //     return response.json({ id });
    // },

    async list(request, response) {
        const ong_id = request.headers.authorization;

        const casos = await cnn('casos')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(casos);
    }
};