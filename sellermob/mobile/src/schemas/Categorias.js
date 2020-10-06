export default class Categorias{
    static schema = {
        name: 'categorias',
        primaryKey: 'id',
        properties:{
            id: { type: 'int', indexed: true },
            nome: 'string',
            imagem: {type: 'string', optional: true},
            created_at: {type: 'string', optional: true},
            updated_at: {type: 'string', optional: true},
            delete_at: {type: 'string', optional: true}
        }
    }
}