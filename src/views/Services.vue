<template>
  <div class="home">
    <h1>Lista Kontrahentow</h1>
    <div id="list-box" class="box">
      <h3>Heroes</h3>
      <HeroList v-on:edit="editHero"></HeroList>
    </div>
    <ServiceInsert></ServiceInsert>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RxHeroDocument } from '../RxDB';

import HeroList from '../components/HeroList.vue';
import ServiceInsert from '../components/ServiceInsert.vue';

@Component({
  components: {
    HeroList,
    ServiceInsert,
  }
})
export default class Home extends Vue {
  private edit: RxHeroDocument | null = null;
  private dialog: boolean = false;

  private editHero(hero: RxHeroDocument) {
    this.edit = hero;
  }
}
</script>
