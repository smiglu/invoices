<template>
    <div class="service-list">
        <v-card-title>
            {{$t('services.header')}}
            <v-spacer></v-spacer>
            <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    v-bind:label="$t('common.search')"
                    single-line
                    hide-details
                    clearable
            ></v-text-field>
        </v-card-title>
        <v-data-table
                :headers="headers"
                :items="services"
                :search="search"
                :loading="loading"
                loading-text="Loading... Please wait"
                :footer-props="{
                showFirstLastPage: true,
                itemsPerPageText: 'Liczba elementów na stronie:'
        }">
            >
            <template v-slot:item.vat="{ item }">
                {{ item.vat }}%
            </template>
            <template v-slot:item.grossAmount="{ item }">
                {{ item.grossAmount() }}
            </template>
            <template v-slot:item.actions="{ item }">
                <v-icon
                        small
                        class="mr-2"
                        @click="editService(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                        small
                        @click="removeService(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary">Reset</v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import DatabaseService from '../../services/Database.service';
    import {RxServiceDocument} from '@/RxDB';
    import {Subscription} from 'rxjs';

    @Component({})
    export default class ServiceList extends Vue {
        private loading: boolean = true;
        private services: RxServiceDocument[] = [];
        private sub: Subscription | null = null;
        private search: string = '';
        private headers = [
            {text: `${this.$root.$t('services.name')}`, value: 'name'},
            {text: `${this.$root.$t('services.netAmount')}`, value: 'netAmount'},
            {text: `${this.$root.$t('services.vat')}`, value: 'vat'},
            {text: `${this.$root.$t('services.grossAmount')}`, value: 'grossAmount'},
            {text: `${this.$root.$t('services.unit')}`, value: 'unit'},
            {text: `${this.$root.$t('common.action')}`, value: 'actions', sortable: false}
        ];

        public async mounted() {
            const db = await DatabaseService.getServices();
            this.sub = db.services
                .find()
                .$.pipe(
                )
                .subscribe((services: RxServiceDocument[]) => {
                    this.loading = false;
                    this.services = services;
                });
        }

        public beforeDestroy() {
            if (this.sub) {
                this.sub.unsubscribe();
            }
        }

        private removeService(service: RxServiceDocument) {
            service.remove();
        }

        private editService(service: RxServiceDocument) {
            this.$emit('edit', service);
        }
    }
</script>


<style scoped lang="less">
</style>
