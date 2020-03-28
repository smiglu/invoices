<template>
    <v-container
        fluid
    >
        <h1>{{$t('services.headerList')}}</h1>
        <ServiceList v-on:edit="editService"></ServiceList>
        <ServiceInsert></ServiceInsert>
        <ServiceEdit
                v-if="edit"
                v-bind:service="edit"
                v-on:cancel="edit=null"
                v-on:submit="edit=null"
        ></ServiceEdit>
    </v-container>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import {RxServiceDocument} from '@/RxDB';

    import ServiceInsert from '../components/service/ServiceInsert.vue';
    import ServiceList from '@/components/service/ServiceList.vue';
    import ServiceEdit from '@/components/service/ServiceEdit.vue';

    @Component({
        components: {
            ServiceList,
            ServiceInsert,
            ServiceEdit
        }
    })
    export default class Services extends Vue {
        private edit: RxServiceDocument | null = null;

        private editService(service: RxServiceDocument) {
            this.edit = service;
        }
    }
</script>
