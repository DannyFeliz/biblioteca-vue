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
                                    <th>#</th>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    </thead>
                                    <tbody>
                                    <tr v-for="user in usersList">
                                        <td>{{ user.id }}</td>
                                        <td>{{ user.Name }}</td>
                                        <td>{{ user.LastName }}</td>
                                        <td>{{ user.Email }}</td>
                                        <!--<td>Oud-Turnhout</td>-->
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
          this.getUsers();
        },
        methods: {
            getUsers() {
                axios({
                    url: "http://localhost:3000/users",
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
