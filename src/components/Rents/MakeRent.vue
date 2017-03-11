<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Rentar Libro</h4>
                            <p class="category"></p>
                        </div>
                        <div class="content">



                            <!--<div class="col-md-8 book-details" v-if="book">-->
                                <div class="card" v-if="book">
                                    <div class="header">
                                        <h4 class="title">{{ book.Title }}</h4>
                                        <p class="category">By {{ book.Author }}</p>
                                    </div>
                                    <div class="content inline">
                                        <ul>
                                            <li><strong>Año de Publicación:</strong> {{ book.Year }}</li>
                                            <li><strong>Editora:</strong> {{ book.Publisher }}</li>
                                            <li><strong>Número de Páginas:</strong> {{ book.PageCount }}</li>
                                            <li><strong>Género: </strong>{{ book.Genre }}</li>
                                        </ul>
                                    </div>

                                    <div class="btn-accions inline">
                                        <form @submit.prevent="makeRent()">
                                            <div class="form-group">
                                                <label>Fecha de Retorno</label>
                                                <input type="date" v-model="returnDate" class="form-control" required>
                                            </div>
                                            <button type="submit" class="btn btn-info btn-fill btn-wd full-width">Rentar Libro</button>
                                        </form>
                                    </div>

                                    <div class="footer">
                                        <hr>
                                        <div class="stats m-l-12">
                                            <i class="fa fa-clock-o"></i> Agregado {{ book.CreatedAt | formatDate }}
                                        </div>
                                    </div>

                                </div>
                            <!--</div>-->


                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MakeRent",
        data () {
            return {
                book: null,
                returnDate: null
            }
        },
        mounted() {
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }
            this.getBook();
            this.returnDate = "";
        },
        filters: {
            formatDate(date) {
                return moment(date).fromNow();
            }
        },
        methods: {
            getBook() {
                axios({
                    url: `${API}/books/${this.$route.params.id}`,
                    method: "GET"
                }).then((response) => {
                   this.book = response.data;
                   console.log(response);
                });
            },
            makeRent() {
                let user = JSON.parse(localStorage.getItem("user"));
                console.log("user", user);
                let form = {
                    "UserId": user.Id,
                    "BookId": Number(this.$route.params.id),
                    "RentDuration": this.returnDate,
                    "IsReturned": 0,
                    "CreatedAt": moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
                    "UpdatedAt": moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ")
                };
                console.info(form);

                axios({
                    url: `${API}/rents`,
                    method: "POST",
                    data: form,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {

                    $.notify({
                        icon: 'pe-7s-like',
                        message: "La renta se ha realizado exitosamente"
                    }, {
                        type: 'success',
                        timer: 4000
                    });
                    this.updateBookRentedStatus();
                    this.$router.push("/users/rents/list");
                    console.log(response);
                });
            }
            ,
            updateBookRentedStatus() {

                console.warn(this.book);
                let form = _.extend(this.book, {
                    IsRented: 1,
                    UpdatedAt: moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
                    ReturnDate: this.returnDate
                });

                axios({
                    url: `${API}/books/${this.$route.params.id}`,
                    method: "PUT",
                    data: form,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    console.info(response);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .book-details {
        margin-top: 25px;
        margin-left: -30px;
    }

    .m-l-12{
        margin-left: 12px;
    }

    .inline{
        display: inline-block
    }

    .full-width{
        width: 100%;
    }
</style>
