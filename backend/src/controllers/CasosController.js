const cnn = require('../db/cnn');

module.exports = {
    async list(request, response) {
        const { page = 1 } = request.query;
        
        const [total] = await cnn('casos')
            .count();

        console.log(total);

        const ongs = await cnn('casos')
            .join('ongs', 'ongs.id', '=', 'casos.ong_id')
            .limit(5)
            .offset((page - 1 ) * 5)
            .select([
                'casos.*',
                'ongs.name',
                'ongs.email',
                'ongs.whatsapp',
                'ongs.cidade',
                'ongs.uf']);
        
        response.header('X-Total-Count', total['count(*)']);
        return response.json(ongs);
    },

    async create(request, response) {
        const { titulo, descricao, valor } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await cnn('casos').insert({
            titulo, descricao, valor, ong_id
        });

        return response.json({ id });
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const caso = await cnn('casos')
            .where('id', id)
            .select('ong_id')
            .first();

        if (ong_id != caso.ong_id) {
            return response.status(401).json({ error: 'Operacao nao permitida.'});
        }

        await cnn('casos').where('id', id).delete();

        return response.status(204).send();
    }
};