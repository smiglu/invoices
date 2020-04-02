// import typings
import {
    RxHeroDocument,
    RxHeroesDatabase,
    RxHeroesCollections,
    RxHeroDocumentType,
    RxContractorDocumentType,
    RxContractorDocument,
    RxContractorsDatabase,
    RxContractorsCollections, RxServicesDatabase, RxServicesCollections, RxServiceDocumentType, RxServiceDocument
} from '@/RxDB';

import heroSchema from '../schemas/Hero.schema';
import contractorSchema from '../schemas/Contractor.schema';

// batteries-included
// import RxDB from 'rxdb';

/**
 * custom build
 */
import RxDB from 'rxdb/plugins/core';

// import modules
import RxDBSchemaCheckModule from 'rxdb/plugins/schema-check';
import RxDBErrorMessagesModule from 'rxdb/plugins/error-messages';

if (process.env.NODE_ENV === 'development') {
    // in dev-mode we show full error-messages
    RxDB.plugin(RxDBErrorMessagesModule);

    // schema-checks should be used in dev-mode only
    RxDB.plugin(RxDBSchemaCheckModule);
}

import RxDBValidateModule from 'rxdb/plugins/validate';

RxDB.plugin(RxDBValidateModule);

import RxDBLeaderElectionModule from 'rxdb/plugins/leader-election';

RxDB.plugin(RxDBLeaderElectionModule);

import RxDBReplicationModule from 'rxdb/plugins/replication';

RxDB.plugin(RxDBReplicationModule);
// always needed for replication with the node-server
import * as PouchdbAdapterHttp from 'pouchdb-adapter-http';

RxDB.plugin(PouchdbAdapterHttp);


import * as PouchdbAdapterIdb from 'pouchdb-adapter-idb';
import schemaService from '@/schemas/Service.schema';

RxDB.plugin(PouchdbAdapterIdb);
const useAdapter = 'idb';


const collections = [
    {
        name: 'heroes',
        schema: heroSchema,
        methods: {
            hpPercent(this: RxHeroDocument): number {
                return this.hp / this.maxHP * 100;
            }
        },
        sync: true
    }
];
const contractorCollections = [
    {
        name: 'contractors',
        schema: contractorSchema,
        sync: true,
        migrationStrategies: {
            // 1 means, this transforms data from version 0 to version 1
            1(oldDoc: any) {
                return {
                    name: oldDoc.name,
                    companyName: '',
                    pesel: '',
                    zipCode: '',
                    placeOfMail: '',
                    address: '',
                    nipNumber: '',
                    representation: '',
                    documentName: '',
                    seriesAndNumber: '',
                    documentReleaseDate: '',
                    nameOfTheAuthority: '',
                    bankName: '',
                    accountNumber: ''
                };
            }
        }
    }
];

const serviceCollections = [
    {
        name: 'services',
        schema: schemaService,
        sync: true,
        methods: {
            grossAmount(this: RxServiceDocument): number {
                return this.netAmount * (1 + (this.vat / 100));
            }
        }
    }
];

console.log('hostname: ' + window.location.hostname);
const syncURL = 'http://' + window.location.hostname + ':10101/';

let doSync = true;
if (window.location.hash === '#nosync') {
    doSync = false;
}

/**
 * creates the database
 */
async function _create(): Promise<RxHeroesDatabase> {
    console.log('DatabaseService: creating database..');
    const db = await RxDB.create<RxHeroesCollections>({
        name: 'heroes',
        adapter: useAdapter,
        queryChangeDetection: true
        // password: 'myLongAndStupidPassword' // no password needed
    });
    console.log('DatabaseService: created database');
    (window as any).db = db; // write to window for debugging

    // show leadership in title
    db.waitForLeadership()
        .then(() => {
            console.log('isLeader now');
            document.title = '♛ ' + document.title;
        });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(collections.map((colData) => db.collection(colData)));

    // hooks
    console.log('DatabaseService: add hooks');
    db.collections.heroes.preInsert((docObj: RxHeroDocumentType) => {
        const color = docObj.color;
        return db.collections.heroes.findOne({color}).exec()
            .then((has: RxHeroDocument | null) => {
                if (has != null) {
                    alert('another hero already has the color ' + color);
                    throw new Error('color already there');
                }
                return db;
            });
    }, true);

    // sync with server
    console.log('DatabaseService: sync');
    await db.heroes.sync({
        remote: syncURL + '/hero'
    });

    return db;
}

/**
 * creates the database
 */
async function _createContractors(): Promise<RxContractorsDatabase> {
    console.log('DatabaseService: creating database..');
    const db = await RxDB.create<RxContractorsCollections>({
        name: 'contractors',
        adapter: useAdapter,
        queryChangeDetection: true
        // password: 'myLongAndStupidPassword' // no password needed
    });
    console.log('DatabaseService: created database');
    (window as any).db = db; // write to window for debugging

    // show leadership in title
    db.waitForLeadership()
        .then(() => {
            console.log('isLeader now');
            document.title = '♛ ' + document.title;
        });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(contractorCollections.map((colData) => db.collection(colData)));

    // hooks
    console.log('DatabaseService: add hooks');
    db.collections.contractors.preInsert((docObj: RxContractorDocumentType) => {
        const name = docObj.name;
        return db.collections.contractors.findOne({name}).exec()
            .then((has: RxContractorDocument | null) => {
                if (has != null) {
                    alert('another hero already has the color ' + name);
                    throw new Error('color already there');
                }
                return db;
            });
    }, false);

    // sync with server
    console.log('DatabaseService: sync');
    await db.contractors.sync({
        remote: syncURL + '/contractors'
    });

    return db;
}

/**
 * creates the database
 */
async function _createServices(): Promise<RxServicesDatabase> {
    console.log('DatabaseService: creating database..');
    const db = await RxDB.create<RxServicesCollections>({
        name: 'services',
        adapter: useAdapter,
        queryChangeDetection: true
        // password: 'myLongAndStupidPassword' // no password needed
    });
    console.log('DatabaseService: created database');
    (window as any).db = db; // write to window for debugging
    // show leadership in title

    db.waitForLeadership()
        .then(() => {
            console.log('isLeader now');
            document.title = '♛ ' + document.title;
        });

    // create collections
    console.log('DatabaseService: create collections');
    await Promise.all(serviceCollections.map((colData) => db.collection(colData)));

    // hooks
    console.log('DatabaseService: add hooks');
    db.collections.services.preInsert((docObj: RxServiceDocumentType) => {
        const name = docObj.name;
        return db.collections.services.findOne({name}).exec()
            .then((has: RxServiceDocument | null) => {
                if (has != null) {
                    alert('another hero already has the color ' + name);
                    throw new Error('color already there');
                }
                return db;
            });
    }, false);

    // sync with server
    console.log('DatabaseService: sync');
    await db.services.sync({
        remote: syncURL + '/service'
    });

    return db;
}

const DatabaseService = {
    DB_CREATE_PROMISE: _create(),
    get(): Promise<RxHeroesDatabase> {
        return this.DB_CREATE_PROMISE;
    },
    DB_CONTRACTORS_CREATE_PROMISE: _createContractors(),
    getContractors(): Promise<RxContractorsDatabase> {
        return this.DB_CONTRACTORS_CREATE_PROMISE;
    },
    DB_SERVICES_CREATE_PROMISE: _createServices(),
    getServices(): Promise<RxServicesDatabase> {
        return this.DB_SERVICES_CREATE_PROMISE;
    }
};

export default DatabaseService;
