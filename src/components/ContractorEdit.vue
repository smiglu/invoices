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
      v-bind:max="contractor.companyName"
      name="nazwa"
    >
    <br>
    <button v-on:click="cancel()">cancel</button>
    <button id="edit-submit-button" v-on:click="submit()" v-if="!contractor.deleted">submit</button>

    <v-dialog
            v-model="dialog"
            width="800px"
    >
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
                          v-model="formData.name"
                          v-bind:placeholder="$t('contractors.name')"
                  />
                </v-row>
              </v-col>
              <v-col
                      cols="12"
              >
                <v-text-field
                        v-model="formData.companyName"
                        v-bind:placeholder="$t('contractors.companyName')"
                />
              </v-col>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                          v-model="formData.zipCode"
                          v-bind:placeholder="$t('contractors.zipCode')"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                          v-model="formData.placeOfMail"
                          v-bind:placeholder="$t('contractors.placeOfMail')"
                  />
                </v-col>
              </v-row>
              <v-col cols="12">
                <v-text-field
                        v-model="formData.address"
                        v-bind:placeholder="$t('contractors.address')"
                />
              </v-col>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                          v-model="formData.nipNumber"
                          v-bind:placeholder="$t('contractors.nipNumber')"
                  />
                </v-col>
                <v-col cols="6">
                  <v-text-field
                          v-model="formData.representation"
                          v-bind:placeholder="$t('contractors.representation')"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-select
                          :items="documentsType"
                          v-model="formData.documentName"
                          v-bind:label="$t('contractors.documentName')"
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                          v-model="formData.seriesAndNumber"
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
                              v-model="formData.documentReleaseDate"
                              v-bind:label="$t('contractors.documentReleaseDate')"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="formData.documentReleaseDate" @input="menuDate = false"></v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="7">
                  <v-text-field
                          v-model="formData.nameOfTheAuthority"
                          v-bind:placeholder="$t('contractors.nameOfTheAuthority')"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="5">
                  <v-text-field
                          v-model="formData.bankName"
                          v-bind:label="$t('contractors.bankName')"
                  />
                </v-col>
                <v-col cols="7">
                  <v-text-field
                          v-model="formData.accountNumber"
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
                    @click="cancel"
            >{{ $t('common.cancel')}}
            </v-btn>
            <v-btn
                    text
                    @click="submit"
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
    </v-dialog>
  </div>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';
  import {RxContractorDocument} from '@/RxDB';
  import {first, map, skip} from 'rxjs/operators';
  import UpdatePlugin from 'rxdb/plugins/update';
  import RxDB from 'rxdb/plugins/core';

  RxDB.plugin(UpdatePlugin);

@Component({})
export default class ContractorEdit extends Vue {
  @Prop() private contractor!: RxContractorDocument;

  private synced: boolean = true;
  private deleted: boolean = false;
  private dialog: boolean = true;
  private dialog2: boolean = false;
  private formData = {
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

  public async mounted() {
    this.formData = {
      name :  this.contractor.name,
      companyName : this.contractor.companyName,
      pesel : this.contractor.pesel,
      zipCode : this.contractor.zipCode,
      placeOfMail : this.contractor.placeOfMail,
      address : this.contractor.address,
      nipNumber : this.contractor.nipNumber,
      representation : this.contractor.representation,
      documentName : this.contractor.documentName,
      seriesAndNumber : this.contractor.seriesAndNumber,
      documentReleaseDate : this.contractor.documentReleaseDate,
      nameOfTheAuthority : this.contractor.nameOfTheAuthority,
      bankName : this.contractor.bankName,
      accountNumber : this.contractor.accountNumber
    };
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
    this.dialog = true;
  }

  public async submit() {
    //await this.contractor.atomicSet('companyName', this.formData);
    await this.contractor.update({
      $set: {
        name :  this.formData.name,
        companyName : this.formData.companyName,
        pesel : this.formData.pesel,
        zipCode : this.formData.zipCode,
        placeOfMail : this.formData.placeOfMail,
        address : this.formData.address,
        nipNumber : this.formData.nipNumber,
        representation : this.formData.representation,
        documentName : this.formData.documentName,
        seriesAndNumber : this.formData.seriesAndNumber,
        documentReleaseDate : this.formData.documentReleaseDate,
        nameOfTheAuthority : this.formData.nameOfTheAuthority,
        bankName : this.formData.bankName,
        accountNumber : this.formData.accountNumber
      }
    });
    this.$emit('submit');
  }
  public resync() {
    this.formData = this.contractor;
    this.synced = true;
    this.dialog = true;
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
