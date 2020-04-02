<template>
    <v-app id="inspire">
        <v-navigation-drawer
            v-model="drawer"
            :clipped="$vuetify.breakpoint.lgAndUp"
            app
        >
            <v-list dense>
                <template v-for="item in items">
                    <v-row
                        v-if="item.heading"
                        :key="item.heading"
                        align="center"
                    >
                        <v-col cols="6">
                            <v-subheader v-if="item.heading">
                                {{ item.heading }}
                            </v-subheader>
                        </v-col>
                        <v-col
                            cols="6"
                            class="text-center"
                        >
                            <a href="#!" class="body-2 black--text">EDIT</a>
                        </v-col>
                    </v-row>
                    <v-list-group
                        v-else-if="item.children"
                        :key="item.text"
                        v-model="item.model"
                        :prepend-icon="item.model ? item.icon : item['icon-alt']"
                        append-icon=""
                    >
                        <template v-slot:activator>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ item.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </template>
                        <v-list-item
                            v-for="(child, i) in item.children"
                            :key="i"
                            link
                        >
                            <v-list-item-action v-if="child.icon">
                                <v-icon>{{ child.icon }}</v-icon>
                            </v-list-item-action>
                            <v-list-item-content>
                                <v-list-item-title>
                                    {{ child.text }}
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-group>
                    <v-list-item v-else :key="item.text" :to="item.link" link>
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>
                                {{ item.text }}
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
            :clipped-left="$vuetify.breakpoint.lgAndUp"
            app
            color="blue darken-3"
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <v-toolbar-title
                style="width: 300px"
                class="ml-0 pl-4"
            >
                <span class="hidden-sm-and-down">Fakturki</span>
            </v-toolbar-title>
            <v-text-field
                flat
                solo-inverted
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Search"
                class="hidden-sm-and-down"
            />
            <v-spacer/>
            <v-btn icon>
                <v-icon>mdi-apps</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-bell</v-icon>
            </v-btn>
            <v-btn
                icon
                large
            >
                <v-avatar
                    size="32px"
                    item
                >
                    <v-img
                        src="https://cdn.vuetifyjs.com/images/logos/logo.svg"
                        alt="Vuetify"
                        @click="changeThemeColor"
                    />
                </v-avatar>
            </v-btn>
        </v-app-bar>
        <v-content>
            <v-container
                class="fill-height"
                fluid
            >
                <v-row
                    align="center"
                    justify="space-between"
                >
                    <router-view/>
                </v-row>
            </v-container>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'App',

        props: {
            source: String,
        },
        data: () => ({
            dialog: false,
            drawer: null,
            items: [
                {icon: 'mdi-contacts', text: 'Hero List', link: '/'},
                {icon: 'mdi-account', text: 'Kontrahenci', link: '/contractors'},
                {icon: 'mdi-package-variant', text: 'Lista usług', link: '/services'},
                {icon: 'mdi-account', text: 'About', link: '/about'},
                {icon: 'mdi-content-copy', text: 'Duplicates'},
                {
                    'icon': 'mdi-chevron-up',
                    'icon-alt': 'mdi-chevron-down',
                    'text': 'More',
                    'model': false,
                    'children': [
                        {icon: 'mdi-plus', text: 'Import'},
                        {icon: 'mdi-plus', text: 'Export'},
                        {icon: 'mdi-plus', text: 'Print'},
                        {icon: 'mdi-plus', text: 'Undo changes'},
                        {icon: 'mdi-plus', text: 'Other contacts'},
                    ],
                },
                {icon: 'mdi-settings', text: 'Ustawienia'},
                {icon: 'mdi-message', text: 'Wyślij feedback'},
                {icon: 'mdi-help-circle', text: 'Pomoc'},
            ],
        }),
        methods: {
            changeThemeColor() {
                this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
            }
        }
    });
</script>
