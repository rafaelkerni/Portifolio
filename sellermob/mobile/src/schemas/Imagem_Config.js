export default class Imagem_Config{
    static schema = {
        name: 'imagem_config',
        primaryKey: 'id',
        properties:{
            id: { type: 'int', indexed: true },
            imagem: {type: 'string', optional: true},
            created_at: {type: 'string', optional: true},
            updated_at: {type: 'string', optional: true},
            delete_at: {type: 'string', optional: true}
        }
    }
}