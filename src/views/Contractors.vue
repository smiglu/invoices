<template>
    <v-container>
        <h1>{{$t('contractors.headerList')}}</h1>
        <ContractorList v-on:edit="editContractor"></ContractorList>
        <ContractorInsert></ContractorInsert>
        <ContractorEdit v-if="edit" v-bind:contractor="edit" v-on:cancel="edit=null" v-on:submit="edit=null"></ContractorEdit>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {RxContractorDocument} from '@/RxDB';

    import ContractorInsert from '../components/ContractorInsert.vue';
    import ContractorList from '@/components/ContractorList.vue';
    import ContractorEdit from '@/components/ContractorEdit.vue';

    @Component({
        components: {
            ContractorList,
            ContractorInsert,
            ContractorEdit
        }
    })
    export default class Home extends Vue {
        private edit: RxContractorDocument | null = null;
        private dialog: boolean = false;

        private editContractor(contractor: RxContractorDocument) {
            this.edit = contractor;
        }
    }
</script>
