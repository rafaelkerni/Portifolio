export default class Config{
    static schema = {
        name: 'config',
        primaryKey: 'id',
        properties:{
            id: { type: 'int', indexed: true },
            usarCategoria: {type: 'int', optional: true},
            imagens: {type: 'string', optional: true},
            created_at: {type: 'string', optional: true},
            updated_at: {type: 'string', optional: true},
            delete_at: {type: 'string', optional: true}
        }
    }
}