/**
 * custom typings so typescript knows about the schema-fields
 */

import { RxDocument, RxCollection, RxDatabase } from 'rxdb';
import { Observable } from 'rxjs';

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

// ORM methods
interface RxHeroDocMethods {
    hpPercent(): number;
}

export type RxHeroDocument = RxDocument<RxHeroDocumentType, RxHeroDocMethods>;
export type RxHeroCollection = RxCollection<RxHeroDocumentType, RxHeroDocMethods, {}>;

export type RxContractorDocument = RxDocument<RxContractorDocumentType>;
export type RxContractorCollection = RxCollection<RxContractorDocumentType, {}, {}>;

export interface RxHeroesCollections {
    heroes: RxHeroCollection;
}

export interface RxContractorsCollections {
    contractors: RxContractorCollection;
}

export type RxHeroesDatabase = RxDatabase<RxHeroesCollections>;

export type RxContractorsDatabase = RxDatabase<RxContractorsCollections>;
