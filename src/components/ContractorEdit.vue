<template>
  <div id="edit-box" class="contractor-edit box">
    <h4>Edit</h4>
    <div class="alert" v-if="!synced">
      <h4>Warning:</h4>
      <p>
        Someone else has
        <b>changed</b> this document. If you click save, you will overwrite the changes.
      </p>
      <button v-on:click="resync()">resync</button>
    </div>
    <div class="alert deleted" v-if="contractor.deleted">
      <h4>Error:</h4>
      <p>
        Someone else has
        <b>deleted</b> this document. You can not save anymore.
      </p>
    </div>
    <h5>
      {{contractor.companyName}}
    </h5>HP:
    <input
      type="text"
      v-model="formData"
      v-bind:max="contractor.companyName"
      name="nazwa"
    >
    <br>
    <button v-on:click="cancel()">cancel</button>
    <button id="edit-submit-button" v-on:click="submit()" v-if="!contractor.deleted">submit</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import DatabaseService from '../services/Database.service';
import { RxContractorDocument, RxContractorsDatabase } from '../RxDB';
import { skip, map, first } from 'rxjs/operators';

@Component({})
export default class ContractorEdit extends Vue {
  @Prop() private contractor!: RxContractorDocument;

  private synced: boolean = true;
  private deleted: boolean = false;
  private formData: string = '';

  public async mounted() {
    this.formData = this.contractor.companyName;
    this.contractor.$.pipe(
      skip(1),
      first(),
      map(() => false)
    )
      .toPromise()
      .then((v) => (this.synced = v));

    this.contractor.deleted$
      .pipe(first())
      .toPromise()
      .then(() => (this.deleted = true));
  }

  public async submit() {
    await this.contractor.atomicSet('companyName', this.formData);
    this.$emit('submit');
  }
  public resync() {
    this.formData = this.contractor.companyName;
    this.synced = true;
  }
  public cancel() {
    this.$emit('cancel');
  }
}
</script>


<style scoped lang="less">
.contractor-edit {
  position: fixed;
  z-index: 10;
  width: 70%;
  margin-left: 10%;
  min-height: 200px;
  margin-top: -5px;
  padding: 20px;
}

.alert {
  border-style: solid;
  border-width: 2px;
  border-radius: 10px;
  padding: 8px;
  border-color: #e0e021;

  &.deleted {
    border-color: red;
  }

  h4 {
    padding: 0;
    margin: 0;
  }
}

.color-box {
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 11px;
  border-radius: 2px;
  border-width: 1px;
  border-style: solid;
  border-color: grey;
}
</style>
