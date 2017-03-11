<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Email Statistics</h4>
                            <p class="category">Last Campaign Performance</p>
                        </div>
                        <div class="content">
                            <!--<div id="chartPreferences" class="ct-chart ct-perfect-fourth">-->

                            <!--</div>-->

                            <div class="footer">
                                <hr>
                                <div class="stats">
                                    <i class="fa fa-clock-o"></i> Campaign sent 2 days ago
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
            }
        },
        mounted() {
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }
        }

    }
</script>

<style lang="scss">
</style>
