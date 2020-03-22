<template>
    <div class="insert">
        <v-btn
            color="pink"
            dark
            fab
            fixed
            right
            bottom
            @click="dialog = !dialog"
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-dialog
            v-model="dialog"
            width="800px"
        >
            <form v-on:submit.prevent="onSubmit" name="insertForm">
                <v-card>
                    <v-card-title class="grey darken-2">
                        {{$t('contractors.createContractor')}}
                    </v-card-title>
                    <v-container>
                        <v-row no-gutters>
                            <v-col
                                class="align-center justify-space-between"
                                cols="12"
                            >
                                <v-row
                                    align="center"
                                    class="mr-0"
                                >
                                    <v-avatar
                                        size="40px"
                                        class="mx-3"
                                    >
                                        <img
                                            src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png"
                                            alt=""
                                        >
                                    </v-avatar>
                                    <v-text-field
                                        v-model="formObject.name"
                                        v-bind:placeholder="$t('contractors.name')"
                                    />
                                </v-row>
                            </v-col>
                            <v-col
                                cols="12"
                            >
                                <v-text-field
                                    v-model="formObject.companyName"
                                    v-bind:placeholder="$t('contractors.companyName')"
                                />
                            </v-col>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="formObject.zipCode"
                                        v-bind:placeholder="$t('contractors.zipCode')"
                                    />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="formObject.placeOfMail"
                                        v-bind:placeholder="$t('contractors.placeOfMail')"
                                    />
                                </v-col>
                            </v-row>
                            <v-col cols="12">
                                <v-text-field
                                    v-model="formObject.address"
                                    v-bind:placeholder="$t('contractors.address')"
                                />
                            </v-col>
                            <v-row>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="formObject.nipNumber"
                                        v-bind:placeholder="$t('contractors.nipNumber')"
                                    />
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="formObject.representation"
                                        v-bind:placeholder="$t('contractors.representation')"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="6">
                                    <v-select
                                        :items="documentsType"
                                        v-model="formObject.documentName"
                                        v-bind:label="$t('contractors.documentName')"
                                    ></v-select>
                                </v-col>
                                <v-col cols="6">
                                    <v-text-field
                                        v-model="formObject.seriesAndNumber"
                                        v-bind:placeholder="$t('contractors.seriesAndNumber')"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-menu
                                        v-model="menuDate"
                                        :close-on-content-click="false"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                    >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                                v-model="formObject.documentReleaseDate"
                                                v-bind:label="$t('contractors.documentReleaseDate')"
                                                prepend-icon="mdi-calendar"
                                                readonly
                                                v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="formObject.documentReleaseDate" @input="menuDate = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field
                                        v-model="formObject.nameOfTheAuthority"
                                        v-bind:placeholder="$t('contractors.nameOfTheAuthority')"
                                    />
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-col cols="5">
                                    <v-text-field
                                        v-model="formObject.bankName"
                                        v-bind:label="$t('contractors.bankName')"
                                    />
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field
                                        v-model="formObject.accountNumber"
                                        v-bind:placeholder="$t('contractors.accountNumber')"
                                    />
                                </v-col>
                            </v-row>
                            <v-col cols="12" class="d-none">
                                <v-text-field
                                    prepend-icon="mdi-mail"
                                    placeholder="Email"
                                />
                            </v-col>
                            <v-col cols="12" class="d-none">
                                <v-text-field
                                    type="tel"
                                    prepend-icon="mdi-phone"
                                    placeholder="(+48) 000 - 0000"
                                />
                            </v-col>
                            <v-col cols="12" class="d-none">
                                <v-text-field
                                    prepend-icon="mdi-text"
                                    placeholder="Notes"
                                />
                            </v-col>
                        </v-row>
                    </v-container>
                    <v-card-actions>
                        <v-btn
                            text
                            color="primary"
                            @click="dialog2 = true"
                        >{{ $t('common.additional')}}
                        </v-btn>
                        <v-spacer/>
                        <v-btn
                            text
                            color="primary"
                            @click="dialog = false"
                        >{{ $t('common.cancel')}}
                        </v-btn>
                        <v-btn
                            text
                            @click="onSubmit()"
                        >{{ $t('common.save')}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <v-dialog
                    v-model="dialog2"
                    width="800px"
                >
                    <v-card>
                        <v-card-title class="grey darken-2">
                            {{$t('contractors.createContractor')}}
                        </v-card-title>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-text-field
                                        prepend-icon="mdi-mail"
                                        placeholder="Email"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        type="tel"
                                        prepend-icon="mdi-phone"
                                        placeholder="(+48) 000 - 0000"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        prepend-icon="mdi-text"
                                        placeholder="Notes"
                                    />
                                </v-col>
                            </v-row>
                        </v-container>
                        <v-card-actions>
                            <v-spacer/>
                            <v-btn
                                text
                                color="primary"
                                @click="dialog2 = false"
                            >{{ $t('common.back')}}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </form>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DatabaseService from '../services/Database.service';
    import {RxContractorsDatabase} from '@/RxDB';

    @Component({})
    export default class ContractorInsert extends Vue {
        private name: string = '';
        private formObject = {
            name : '',
            companyName : '',
            pesel : '',
            zipCode : '',
            placeOfMail : '',
            address : '',
            nipNumber : '',
            representation : '',
            documentName : '',
            seriesAndNumber : '',
            documentReleaseDate : '',
            nameOfTheAuthority : '',
            bankName : '',
            accountNumber : ''
        };
        private dialog: boolean = false;
        private dialog2: boolean = false;
        private menuDate: boolean =  false;
        private documentsType = [{
            text: `${this.$root.$t('contractors.idCard')}`,
            value: 'D'
        },
        {
            text: `${this.$root.$t('contractors.passport')}`,
            value: 'P'
        },
        {
            text: `${this.$root.$t('contractors.others')}`,
            value: 'O'
        }];

        public async onSubmit() {
            const db: RxContractorsDatabase = await DatabaseService.getContractors();
            await db.contractors.insert(this.formObject);

            this.name = '';
            this.dialog = false;
        }
    }
</script>

<style scoped lang="less">
</style>
