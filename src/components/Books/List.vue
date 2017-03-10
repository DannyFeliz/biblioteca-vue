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
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Título</th>
                                                        <th>Autor</th>
                                                        <th>Año</th>
                                                        <th>Editora</th>
                                                        <th># Páginas</th>
                                                        <th>Género</th>
                                                        <th>Rentar</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr v-for="book in availableBooks">
                                                    <td>{{ book.id }}</td>
                                                    <td>{{ book.Title }}</td>
                                                    <td>{{ book.Author }}</td>
                                                    <td>{{ book.Year }}</td>
                                                    <td>{{ book.Publisher }}</td>
                                                    <td>{{ book.PageCount }}</td>
                                                    <td>{{ book.Genre }}</td>
                                                    <td>
                                                        <button type="button" @click="rentBook(book.id)" rel="tooltip" title="" class="btn btn-info btn-simple btn-xs" data-original-title="Rentar Libro">
                                                            <i class="fa fa-edit"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>

                                        </div>
                                    </div>

                                    <!--TODO: NO Disponibles-->
                                    <div role="tabpanel" class="tab-pane" id="profile">
                                        <div class="content table-responsive table-full-width">
                                            <table class="table table-hover table-striped" id="no-disponible">
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
          this.getBooks();
          $("table").dataTable();
        },
        filters: {
            formatDate(date) {
                console.log(date);
                return moment(date).fromNow();
            }
        },
        methods: {
            getBooks() {
                axios({
                    url: `${API}/books`,
                    method: "GET"
                }).then((response) => {
                    this.booksList = response.data;
                    this.availableBooks = this.booksList.filter(book => !book.IsRented);
                    this.notAvailableBooks = this.booksList.filter(book => book.IsRented);
                    setTimeout(() => {
                        $('button').tooltip();
                    }, 1000)
                   console.log(response);
                });
            },
            rentBook(bookId) {
                this.$router.push(`/rents/make-rent/${bookId}`);
            }
        }

    }
</script>

<style lang="scss">
</style>
