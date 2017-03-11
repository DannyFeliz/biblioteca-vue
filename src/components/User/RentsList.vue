<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Mi Cuenta</h4>
                            <p class="category"></p>
                        </div>
                        <div class="content">


                            <div>

                                <!-- Nav tabs -->
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Rentados Actualmente</a></li>
                                    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Histórico de Renta</a></li>
                                    <li role="presentation"><a href="#profile-data" aria-controls="profile-data" role="tab" data-toggle="tab">Información</a></li>
                                </ul>

                                    <!--TODO: Restandos -->

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
                                                        <button @click="makeReturn(rent.Id, rent.book.Id)"class="btn btn-primary btn-fill btn-wd">Devolver Libro</button>
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

                                    <div role="tabpanel" class="tab-pane" id="profile-data">
                                        <div class="content table-responsive table-full-width">
                                           <ul>
                                               <li><strong>Nombre: </strong>{{ user.Name }}</li>
                                               <li><strong>Apellido: </strong>{{ user.LastName }}</li>
                                               <li><strong>Email: </strong>{{ user.Email }}</li>
                                               <li><strong>Fecha de Registro: </strong>{{ user.CreatedAt | formatReturnDate }}</li>
                                           </ul>
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
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }

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
                    url: `${API}/rents?UserId=${this.user.Id}`,
                    method: "GET",
                }).then((response) => {
                    this.rentsList = response.data;
                    this.rentsList = this.rentsList.map(item => {
                        item.past = moment(item.RentDuration).isBefore();
                        let book = _.findWhere(this.books, {Id: item.BookId});
                        if (book) {
                            item.book = book;
                        }

                        return item;

                    });

                    this.currentRented = this.rentsList.filter(rent => !rent.IsReturned && rent.UserId == this.user.Id);
                    this.alreadyReturned = this.rentsList.filter(rent => rent.IsReturned && rent.UserId == this.user.Id);

                    this.currentRented = _.sortBy(this.currentRented, function(o) { return o.UpdatedAt; })
                    this.alreadyReturned = _.sortBy(this.alreadyReturned, function(o) { return o.UpdatedAt; })


//                    setTimeout(() => {
//                        $("table").dataTable();
//                    }, 500);
//                    console.log(response);
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
            makeReturn(rentId, bookId) {
                console.log("rentId", rentId);
                console.log("bookId", bookId);
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
                        this.returnBook(rentId, bookId)
                    });
            },
            returnBook(rentId, bookId) {
                console.log("rentId", rentId);
                //TODO: Update Book isReturned field
                // TODO: Change to PUT


                let rent = _.findWhere(this.rentsList, {"Id": rentId});
                console.warn(rent);
//                console.warn(temp);
                console.warn(rent);
                let form = _.extend(rent, { "IsReturned": 1, "UpdatedAt": moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ")});
                console.warn({form});
                axios({
                    url: `${API}/rents/${rentId}`,
                    method: "PUT",
                    data: form,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.log(response);
                    this.getBooks();
                    this.makeBookAvailable(bookId);
                });
            },
            makeBookAvailable(bookId) {
                let book = _.findWhere(this.books, {"Id": bookId});
                book = _.extend(book, { IsRented: 0});
                console.warn({book});
//                debugger;
                axios({
                    url: `${API}/books/${bookId}`,
                    method: "PUT",
                    data: book,
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
    .dataTables_filter{
        float: right;
    }

    input[type=search].input-sm{
        height: 25px;
        margin-left: 7px;
    }

    #DataTables_Table_0_info{
        display: none;
    }

    .dataTables_paginate.paging_simple_numbers{
        float: right;
    }
</style>
