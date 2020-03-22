import {
    RxJsonSchema
} from 'rxdb';
const schemaContractor: RxJsonSchema = {
    title: 'contractor schema',
    description: 'describes a contractor',
    version: 1,
    keyCompression: false,
    type: 'object',
    properties: {
        name: {
            type: 'string',
            primary: true,
            default: ''
        },
        companyName: {
            type: 'string',
            default: ''
        },
        pesel: {
            type: 'string',
            default: ''
        },
        zipCode: {
            type: 'string',
            default: ''
        },
        placeOfMail: {
            type: 'string',
            default: ''
        },
        address: {
            type: 'string',
            default: ''
        },
        nipNumber: {
            type: 'string',
            default: ''
        },
        representation: {
            type: 'string',
            default: ''
        },
        documentName: {
            type: 'string',
            default: ''
        },
        seriesAndNumber: {
            type: 'string',
            default: ''
        },
        documentReleaseDate: {
            type: 'string',
            default: ''
        },
        nameOfTheAuthority: {
            type: 'string',
            default: ''
        },
        bankName: {
            type: 'string',
            default: ''
        },
        accountNumber: {
            type: 'string',
            default: ''
        },

    },
    required: ['name', 'companyName']
};

export default schemaContractor;
