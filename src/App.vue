<template>
    <div id="app">


        <div class="wrapper">
            <div  class="sidebar" data-color="azure" data-image="src/assets/img/sidebar-5.jpg">

                <!--

                    Tip 1: you can change the color of the sidebar using: data-color="blue | azure | green | orange | red | purple"
                    Tip 2: you can also add an image using data-image tag

                -->

                <div class="sidebar-wrapper">
                    <div class="logo">
                        <router-link to="/" class="simple-text">
                            <i class="pe-7s-science"></i> Biblioteca
                        </router-link>
                    </div>

                    <ul class="nav">
                        <li>
                            <router-link to="/">
                                <i class="pe-7s-graph"></i>
                                <p>Dashboard</p>
                            </router-link>
                        </li>
                        <li v-if="user">
                            <router-link to="/users/list" v-if="user.Role == 1">
                                <i class="pe-7s-user"></i>
                                <p>Usuarios</p>
                            </router-link>
                        </li>

                        <li>
                            <router-link to="/books/list">
                                <i class="pe-7s-note2"></i>
                                <p>Libros</p>
                            </router-link>
                        </li>

                        <!--<li>-->
                            <!--<a href="#/users/rents/list">-->
                                <!--<i class="pe-7s-news-paper"></i>-->
                                <!--<p>Rentas</p>-->
                            <!--</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a href="icons.html">-->
                                <!--<i class="pe-7s-science"></i>-->
                                <!--<p>Icons</p>-->
                            <!--</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a href="maps.html">-->
                                <!--<i class="pe-7s-map-marker"></i>-->
                                <!--<p>Maps</p>-->
                            <!--</a>-->
                        <!--</li>-->
                        <!--<li>-->
                            <!--<a href="notifications.html">-->
                                <!--<i class="pe-7s-bell"></i>-->
                                <!--<p>Notifications</p>-->
                            <!--</a>-->
                        <!--</li>-->
                        <!--<li class="active-pro">-->
                            <!--<a href="upgrade.html">-->
                                <!--<i class="pe-7s-rocket"></i>-->
                                <!--<p>Upgrade to PRO</p>-->
                            <!--</a>-->
                        <!--</li>-->
                    </ul>
                </div>
            </div>

            <div class="main-panel">
                <nav class="navbar navbar-default navbar-fixed">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse"
                                    data-target="#navigation-example-2">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <!--<a class="navbar-brand" href="#">Dashboard</a>-->
                        </div>
                        <div class="collapse navbar-collapse">
                            <!--<ul class="nav navbar-nav navbar-left">-->
                                <!--<li>-->
                                    <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
                                        <!--<i class="fa fa-dashboard"></i>-->
                                        <!--<p class="hidden-lg hidden-md">Dashboard</p>-->
                                    <!--</a>-->
                                <!--</li>-->
                                <!--<li class="dropdown">-->
                                    <!--<a href="#" class="dropdown-toggle" data-toggle="dropdown">-->
                                        <!--<i class="fa fa-globe"></i>-->
                                        <!--<b class="caret hidden-sm hidden-xs"></b>-->
                                        <!--<span class="notification hidden-sm hidden-xs">5</span>-->
                                        <!--<p class="hidden-lg hidden-md">-->
                                            <!--5 Notifications-->
                                            <!--<b class="caret"></b>-->
                                        <!--</p>-->
                                    <!--</a>-->
                                    <!--<ul class="dropdown-menu">-->
                                        <!--<li><a href="#">Notification 1</a></li>-->
                                        <!--<li><a href="#">Notification 2</a></li>-->
                                        <!--<li><a href="#">Notification 3</a></li>-->
                                        <!--<li><a href="#">Notification 4</a></li>-->
                                        <!--<li><a href="#">Another notification</a></li>-->
                                    <!--</ul>-->
                                <!--</li>-->
                                <!--<li>-->
                                    <!--<a href="">-->
                                        <!--<i class="fa fa-search"></i>-->
                                        <!--<p class="hidden-lg hidden-md">Search</p>-->
                                    <!--</a>-->
                                <!--</li>-->
                            <!--</ul>-->

                            <ul class="nav navbar-nav navbar-right">
                                <li>
                                    <router-link to="/users/rents/list" v-if="user">
                                        Mi Cuenta
                                    </router-link>
                                </li>
                                <li >
                                    <router-link to="/login" v-if="!user">
                                        Iniciar Sesión
                                    </router-link>
                                </li>
                                <li >
                                    <router-link to="/register" v-if="!user">
                                        Registro
                                    </router-link>
                                </li>
                                <li>
                                    <a href="javascript:void(0)" @click="logout" v-if="user">
                                        {{ user.Name }} {{ user.LastName}} - Cerrar Sesión
                                    </a>
                                </li>
                                <li class="separator hidden-lg hidden-md"></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <!--<router-link to="/foo">Go to Foo</router-link>-->
                <!--<router-link to="/bar">Go to Bar</router-link>-->
                <!--<router-link to="/home">Go to Home</router-link>-->
                <transition name="slide-fade">
                    <router-view @userData="userData"></router-view>
                </transition>

            </div>
        </div>


        <!--<h1>Hello App!</h1>-->
        <!--<p>-->
        <!--&lt;!&ndash; use router-link component for navigation. &ndash;&gt;-->
        <!--&lt;!&ndash; specify the link by passing the `to` prop. &ndash;&gt;-->
        <!--&lt;!&ndash; <router-link> will be rendered as an `<a>` tag by default &ndash;&gt;-->

        <!--</p>-->
        <!-- route outlet -->
        <!-- component matched by the route will render here -->
    </div>
</template>

<script>

    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                user: null
//                shouldHide: false
            }
        },
        mounted() {
                if (localStorage.getItem("user")) {
                    this.user = JSON.parse(localStorage.getItem("user"));
                }
//            if (this.$route.path == "/login") {
//                this.shouldHide = true;
//            }
            setTimeout(() => {
                $("table").dataTable({
                    language: spanish
                });
            }, 1000)
        },
        methods: {
            userData(user) {
                this.user = user;
            },
            logout() {
                localStorage.removeItem("user");
                this.user = null;

                $.notify({
                    icon: 'pe-7s-info',
                    message: "Has cerrado sesión exitosamente."
                },{
                    type: 'info',
                    timer: 4000
                });
                this.$router.replace("/login");
            }
        }
    }
</script>

<style lang="scss">
    li > .active {

    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for <2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
    }

</style>
