/**
 * custom typings so typescript knows about the schema-fields
 */

import {RxCollection, RxDatabase, RxDocument} from 'rxdb';

export interface RxHeroDocumentType {
    name: string;
    color: string;
    maxHP: number;
    hp: number;
    team?: string;
    skills: Array<{
        name?: string;
        damage?: string;
    }>;
}

export interface RxContractorDocumentType {
    name: string;
    companyName: string;
    pesel: string;
    zipCode: string;
    placeOfMail: string;
    address: string;
    nipNumber: string;
    representation: string;
    documentName: string;
    seriesAndNumber: string;
    documentReleaseDate: string;
    nameOfTheAuthority: string;
    bankName: string;
    accountNumber: string;
}

export interface RxServiceDocumentType {
    name: string;
    price: number;
    unit: string;
}

// ORM methods
interface RxHeroDocMethods {
    hpPercent(): number;
}

export type RxHeroDocument = RxDocument<RxHeroDocumentType, RxHeroDocMethods>;
export type RxHeroCollection = RxCollection<RxHeroDocumentType, RxHeroDocMethods, {}>;

export type RxContractorDocument = RxDocument<RxContractorDocumentType>;
export type RxContractorCollection = RxCollection<RxContractorDocumentType, {}, {}>;

export type RxServiceDocument = RxDocument<RxServiceDocumentType>;
export type RxServiceCollection = RxCollection<RxServiceDocumentType, {}, {}>;

export interface RxHeroesCollections {
    heroes: RxHeroCollection;
}

export interface RxContractorsCollections {
    contractors: RxContractorCollection;
}

export interface RxServicesCollections {
    services: RxServiceCollection;
}

export type RxHeroesDatabase = RxDatabase<RxHeroesCollections>;

export type RxContractorsDatabase = RxDatabase<RxContractorsCollections>;

export type RxServicesDatabase = RxDatabase<RxServicesCollections>;
