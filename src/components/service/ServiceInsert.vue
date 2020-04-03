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
                        {{$t('services.createService')}}
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
                                            v-model="formData.name"
                                            v-bind:placeholder="$t('services.name')"
                                    />
                                </v-row>
                            </v-col>
                            <v-row>
                                <v-col cols="4">
                                    <v-text-field
                                            v-model="formData.netAmount"
                                            v-bind:placeholder="$t('services.netAmount')"
                                            type="number"
                                    />
                                </v-col>
                                <v-col cols="3">
                                    <v-text-field
                                            v-model="formData.vat"
                                            v-bind:placeholder="$t('services.vat')"
                                            type="number"
                                    />
                                </v-col>
                                <v-col cols="5">
                                    <v-select
                                            :items="unitTypes"
                                            v-model="formData.unit"
                                            v-bind:label="$t('services.unit')"
                                    ></v-select>
                                </v-col>
                            </v-row>
                        </v-row>
                    </v-container>
                    <v-card-actions>
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
            </form>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DatabaseService from '../../services/Database.service';
    import {RxServiceDocumentType, RxServicesDatabase} from '@/RxDB';

    @Component({})
    export default class ServiceInsert extends Vue {
        private name: string = '';
        private formData: RxServiceDocumentType = {
            name: '',
            netAmount: 0,
            vat: 0,
            unit: ''
        };
        private dialog: boolean = false;
        private unitTypes = [
            {
                text: `${this.$root.$t('services.units.mb')}`,
                value: 'mb'
            },
            {
                text: `${this.$root.$t('services.units.m2')}`,
                value: 'm2'
            },
            {
                text: `${this.$root.$t('services.units.szt')}`,
                value: 'szt'
            },
            {
                text: `${this.$root.$t('services.units.kpl')}`,
                value: 'kpl'
            },
            {
                text: `${this.$root.$t('services.units.rG')}`,
                value: 'r-g'
            },
            {
                text: `${this.$root.$t('services.units.km')}`,
                value: 'km'
            }
        ];

        public async onSubmit() {
            const db: RxServicesDatabase = await DatabaseService.getServices();

            this.formData.netAmount = Number(this.formData.netAmount);
            this.formData.vat = Number(this.formData.vat);

            await db.services.insert(this.formData);

            this.name = '';
            this.dialog = false;
        }
    }
</script>

<style scoped lang="less">
</style>
