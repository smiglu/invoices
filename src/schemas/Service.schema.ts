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
        netAmount: {
            type: 'number',
            default: 0
        },
        vat: {
            type: 'number',
            default: 0,
            minimum: 0,
            maximum: 23
        },
        unit: {
            type: 'string',
            default: ''
        }
    },
    required: ['name', 'netAmount', 'unit']
};

export default schemaService;
