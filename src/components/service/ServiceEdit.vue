<template>
    <div id="edit-box" class="service-edit box">
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
                                            v-bind:placeholder="$t('services.price')"
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
                                            :items="documentsType"
                                            v-model="formData.unit"
                                            v-bind:label="$t('services.documentName')"
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
                                @click="submit()"
                        >{{ $t('common.save')}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </form>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {RxServiceDocument, RxServiceDocumentType} from '@/RxDB';
    import {first, map, skip} from 'rxjs/operators';
    import UpdatePlugin from 'rxdb/plugins/update';
    import RxDB from 'rxdb/plugins/core';

    RxDB.plugin(UpdatePlugin);

    @Component({})
    export default class ServiceEdit extends Vue {
        @Prop() private service!: RxServiceDocument;

        private synced: boolean = true;
        private deleted: boolean = false;
        private dialog: boolean = true;
        private formData: RxServiceDocumentType = {
            name: '',
            netAmount: 0,
            vat: 0,
            unit: ''
        };
        private documentsType = [{
            text: `${this.$root.$t('services.idCard')}`,
            value: 'D'
            },
            {
                text: `${this.$root.$t('services.passport')}`,
                value: 'P'
            },
            {
                text: `${this.$root.$t('services.others')}`,
                value: 'O'
            }];

        public async mounted() {
            this.formData = {
                name: this.service.name,
                netAmount: Number(this.service.netAmount),
                vat: Number(this.service.vat),
                unit: this.service.unit,
            };
            this.service.$.pipe(
                skip(1),
                first(),
                map(() => false)
            )
                .toPromise()
                .then((v) => (this.synced = v));

            this.service.deleted$
                .pipe(first())
                .toPromise()
                .then(() => (this.deleted = true));
            this.dialog = true;
        }

        public async submit() {
            await this.service.update({
                $set: {
                    name: this.formData.name,
                    netAmount: Number(this.formData.netAmount),
                    vat: Number(this.formData.vat),
                    unit: this.formData.unit
                }
            });
            this.$emit('submit');
        }

        public resync() {
            this.formData = this.service;
            this.synced = true;
            this.dialog = true;
        }

        public cancel() {
            this.$emit('cancel');
        }
    }
</script>


<style scoped lang="less">
</style>
