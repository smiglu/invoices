import {
    RxJsonSchema
} from 'rxdb';
const schemaService: RxJsonSchema = {
    title: 'service schema',
    description: 'describes a contractor',
    version: 0,
    keyCompression: false,
    type: 'object',
    properties: {
        name: {
            type: 'string',
            default: ''
        },
        price: {
            type: 'string',
            default: ''
        },
        unit: {
            type: 'string',
            default: ''
        }
    },
    required: ['name', 'price', 'unit']
};

export default schemaService;
