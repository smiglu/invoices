<template>
    <div class="contractor-list">
        <v-card-title>
            {{$t('contractors.header')}}
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
                clearable
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="contractors"
            :search="search"
            :loading="loading"
            loading-text="Loading... Please wait"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    class="mr-2"
                    @click="editContractor(item)"
                >
                    mdi-pencil
                </v-icon>
                <v-icon
                    small
                    @click="removeContractor(item)"
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
    import {RxContractorDocument} from '@/RxDB';
    import {tap} from 'rxjs/operators';
    import {Subscription} from 'rxjs';

    @Component({})
    export default class ContractorList extends Vue {
        private loading: boolean = true;
        private contractors: RxContractorDocument[] = [];
        private sub: Subscription | null = null;
        private search: string = '';
        private headers = [
            {
                text: 'Name',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {text: 'Company name', value: 'companyName'},
            {text: 'Numer NIP', value: 'nipNumber'},
            {text: 'Actions', value: 'actions', sortable: false}
        ];
        public async mounted() {
            const db = await DatabaseService.getContractors();
            this.sub = db.contractors
                .find()
                .sort('name')
                .$.pipe(
                )
                .subscribe((contractors: RxContractorDocument[]) => {
                    this.loading = false;
                    this.contractors = contractors;
                });
        }

        public beforeDestroy() {
            if (this.sub) {
                this.sub.unsubscribe();
            }
        }

        private removeContractor(contractor: RxContractorDocument) {
            contractor.remove();
        }

        private editContractor(contractor: RxContractorDocument) {
            this.$emit('edit', contractor);
        }
    }
</script>


<style scoped lang="less">
</style>
