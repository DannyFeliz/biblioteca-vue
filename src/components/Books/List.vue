<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Listado de Libros Disponibles</h4>
                            <p class="category"></p>
                        </div>
                        <div class="content">

                            <div>

                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Disponibles</a></li>
                                    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">No Disponibles</a></li>
                                </ul>

                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <!--TODO: Disponibles -->
                                    <div role="tabpanel" class="tab-pane active" id="home">
                                        <div class="content table-responsive table-full-width">
                                            <table class="table table-hover table-striped">
                                                <thead>
                                                <th>#</th>
                                                <th>Título</th>
                                                <th>Autor</th>
                                                <th>Año</th>
                                                <th>Editora</th>
                                                <th># Páginas</th>
                                                <th>Género</th>
                                                <th>Acciones</th>
                                                </thead>
                                                <tbody>
                                                <tr v-for="user in availableBooks">
                                                    <td>{{ user.id }}</td>
                                                    <td>{{ user.Title }}</td>
                                                    <td>{{ user.Author }}</td>
                                                    <td>{{ user.Year }}</td>
                                                    <td>{{ user.Publisher }}</td>
                                                    <td>{{ user.PageCount }}</td>
                                                    <td>{{ user.Genre }}</td>
                                                    <td>X</td>
                                                    <!--<td>Oud-Turnhout</td>-->
                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                    <!--TODO: NO Disponibles-->
                                    <div role="tabpanel" class="tab-pane" id="profile">
                                        <div class="content table-responsive table-full-width">
                                            <table class="table table-hover table-striped">
                                                <thead>
                                                <th>#</th>
                                                <th>Título</th>
                                                <th>Autor</th>
                                                <th>Año</th>
                                                <th>Editora</th>
                                                <th># Páginas</th>
                                                <th>Género</th>
                                                <th>Fecha Devolución</th>
                                                </thead>
                                                <tbody>
                                                <tr v-for="book in notAvailableBooks">
                                                    <td>{{ book.id }}</td>
                                                    <td>{{ book.Title }}</td>
                                                    <td>{{ book.Author }}</td>
                                                    <td>{{ book.Year }}</td>
                                                    <td>{{ book.Publisher }}</td>
                                                    <td>{{ book.PageCount }}</td>
                                                    <td>{{ book.Genre }}</td>
                                                    <td>{{ book.ReturnDate | formatDate }}</td>
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
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BookList",
        data () {
            return {
                booksList: [],
                availableBooks: [],
                notAvailableBooks: [],
            }
        },
        mounted() {
          this.getUsers();
        },
        filters: {
            formatDate(date) {
                console.log(date);
                return moment(date).fromNow();
            }
        },
        methods: {
            getUsers() {
                axios({
                    url: "http://localhost:3000/books",
                    method: "GET"
                }).then((response) => {
                    this.booksList = response.data;
                    this.availableBooks = this.booksList.filter(book => !book.IsRented);
                    this.notAvailableBooks = this.booksList.filter(book => book.IsRented);
                   console.log(response);
                });
            }
        }

    }
</script>

<style lang="scss">
</style>
