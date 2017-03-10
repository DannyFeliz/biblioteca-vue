<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Mis Libros Rentados</h4>
                            <p class="category"></p>
                        </div>
                        <div class="content">


                            <div>

                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Rentados Actualmente</a></li>
                                    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Histórico de Renta</a></li>
                                </ul>

                                <!-- Tab panes -->
                                <div class="tab-content">
                                    <!--TODO: Restandos -->
                                    <div role="tabpanel" class="tab-pane active" id="home">
                                        <div class="content table-responsive table-full-width">
                                            <table class="table table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Libro</th>
                                                    <th>Fecha de Devolución</th>
                                                    <th>Acciones</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                <tr v-for="rent in currentRented">
                                                    <td>{{ rent.book.Title }} By {{ rent.book.Author}} - {{ rent.book.Publisher }} - {{ rent.book.Year }} </td>
                                                    <td :class="{ 'text-red': rent.past }">{{ rent.RentDuration | formatReturnDate }}</td>
                                                    <td>
                                                        <button @click="makeReturn(rent.id)" :data-id="rent.book.id" class="btn btn-primary btn-fill btn-wd">Devolver Libro</button>
                                                    </td>
                                                    <!--<td>{{ rent.Email }}</td>-->
                                                    <!--<td>Oud-Turnhout</td>-->
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>

                                    <!--TODO: Historico-->
                                    <div role="tabpanel" class="tab-pane" id="profile">
                                        <div class="content table-responsive table-full-width">
                                            <table id="history" class="table table-hover table-striped">
                                                <thead>
                                                <tr>
                                                    <th>Libro</th>
                                                    <th>Cuanto se devolvió</th>
                                                </tr>
                                                </thead>
                                                <tbody>

                                                <tr v-for="rent in alreadyReturned">
                                                    <td>{{ rent.book.Title }} By {{ rent.book.Author}} - {{ rent.book.Publisher }} - {{ rent.book.Year }} </td>
                                                    <td :class="{ 'text-red': rent.past }">{{ rent.UpdatedAt | formatReturnDate }}</td>
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
        name: "UserRentsList",
        data () {
            return {
                rentsList: [],
                currentRented: [],
                alreadyReturned: [],
                user: JSON.parse(localStorage.getItem("user")),
                books: []
            }
        },
        created() {
        },
        mounted() {
            this.getBooks();
        },
        filters: {
            formatReturnDate(date) {
                return moment(date).fromNow();
            }
        },
        methods: {
            getRents() {
                axios({
                    url: `${API}/rents?UserId=${this.user.id}`,
                    method: "GET",
                }).then((response) => {
                    this.rentsList = response.data;
                    this.rentsList = this.rentsList.map(item => {
                        item.past = moment(item.RentDuration).isBefore();
                        let book = _.findWhere(this.books, {id: item.BookId});
                        if (book) {
                            item.book = book;
                            return item;
                        }
                    });

                    this.currentRented = this.rentsList.filter(rent => !rent.IsReturned);
                    this.alreadyReturned = this.rentsList.filter(rent => rent.IsReturned);
                    setTimeout(() => {
                        $("table").dataTable();
                    }, 500);
                    console.log(response);
                });
            },
            getBooks() {
                axios({
                    url: `${API}/books`,
                    method: "GET"
                }).then((response) => {
                    this.books = response.data;
                    this.getRents()
                });
            },
            makeReturn(rentId) {
                swal({
                        title: "Advertencia",
                        text: "¿Estás seguro que deseas devolver este libro?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "Si",
                        closeOnConfirm: false
                    },() => {
                        swal("¡Libro Devuelto!", "Se ha completado la devolución correctamente", "success");
                        this.returnBook(rentId)
                    });
            },
            returnBook(rentId) {
                console.log("rentId", rentId);
                //TODO: Update Book isReturned field
                axios({
                    url: `${API}/rents/${rentId}`,
                    method: "PATCH",
                    data: { "IsReturned": 1, "UpdatedAt": moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ")},
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response);
                    this.getBooks();
                });
            }
        }

    }
</script>

<style lang="scss">
    .text-red{
        color: red;
    }
</style>
