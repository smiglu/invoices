<template>
    <v-container>
        <h1>{{$t('contractors.headerList')}}</h1>
        <ContractorList v-on:edit="editContractor"></ContractorList>
        <ContractorInsert></ContractorInsert>
        <ContractorEdit
                v-if="edit"
                v-bind:contractor="edit"
                v-on:cancel="edit=null"
                v-on:submit="edit=null"
        ></ContractorEdit>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {RxContractorDocument} from '@/RxDB';

    import ContractorInsert from '../components/contractor/ContractorInsert.vue';
    import ContractorList from '@/components/contractor/ContractorList.vue';
    import ContractorEdit from '@/components/contractor/ContractorEdit.vue';

    @Component({
        components: {
            ContractorList,
            ContractorInsert,
            ContractorEdit
        }
    })
    export default class Contractors extends Vue {
        private edit: RxContractorDocument | null = null;

        private editContractor(contractor: RxContractorDocument) {
            this.edit = contractor;
        }
    }
</script>
