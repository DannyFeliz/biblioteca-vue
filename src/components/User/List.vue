<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Listado de Usuarios</h4>
                            <p class="category"></p>
                        </div>
                        <div class="content">

                            <div class="content table-responsive table-full-width">
                                <table class="table table-hover table-striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="user in usersList">
                                        <td>{{ user.Id }}</td>
                                        <td>{{ user.Name }}</td>
                                        <td>{{ user.LastName }}</td>
                                        <td>{{ user.Email }}</td>
                                    </tr>
                                    </tbody>
                                </table>

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
        name: "UserList",
        data () {
            return {
                usersList: []
            }
        },
        mounted() {
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }

          this.getUsers();
//            $("table").dataTable();
        },
        methods: {
            getUsers() {
                axios({
                    url: `${API}/users`,
                    method: "GET"
                }).then((response) => {
                    this.usersList = response.data;

                   console.log(response);
                });
            }
        }

    }
</script>

<style lang="scss">
</style>
