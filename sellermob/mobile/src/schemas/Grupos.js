export default class Grupos{
    static schema = {
        name: 'grupos',
        primaryKey: 'id',
        properties:{
            id: { type: 'int', indexed: true },
            nome: 'string',
            categoria_id: {type: 'int', optional: true},
            imagem: {type: 'string', optional: true},
            created_at: {type: 'string', optional: true},
            updated_at: {type: 'string', optional: true},
            delete_at: {type: 'string', optional: true}
        }
    }
}