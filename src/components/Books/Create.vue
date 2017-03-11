<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="header">
                            <h4 class="title inline">Agregar Libro</h4>
                            <p class="category"></p>
                        </div>
                        <div class="content">

                            <form method="#" action="#" @submit.prevent="saveBook">
                                <div class="form-group">
                                    <label>Título</label>
                                    <input type="text"  v-model="title" placeholder="100 Años De Soledad" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Autor</label>
                                    <input type="text" v-model="author" placeholder="Gabriel Garcia Marquez" class="form-control" required>
                                </div>


                                <div class="form-group">
                                    <label>Año</label>
                                    <input type="number" min="1900" v-model="year" placeholder="2017" class="form-control" required>
                                </div>


                                <div class="form-group">
                                    <label>Editora</label>
                                    <input type="text" v-model="publisher" placeholder=" Sudamericana de Buenos Aires" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Número de Páginas</label>
                                    <input type="number" min="1" v-model="pageCount" placeholder="556" class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Género</label>
                                    <input type="text" v-model="genre" placeholder="Novela" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <button class="btn btn-primary btn-fill btn-wd">Guardar</button>
                                </div>


                            </form>

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
                title: "",
                author: "",
                year: "",
                publisher: "",
                pageCount: "",
                genre: "",
            }
        },
        mounted() {
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }
//            this.getBooks();
//          $("table").dataTable();
        },
        filters: {
            formatDate(date) {
                return moment(date).fromNow();
            }
        },
        methods: {
            saveBook() {

                let form = {
                    Title:  this.title,
                    Author: this.author,
                    Year: this.year,
                    Publisher: this.publisher,
                    PageCount: this.pageCount,
                    Genre: this.genre,
                    CreatedAt: moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
                    UpdatedAt: moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ")
                };

                axios({
                    url: `${API}/books`,
                    method: "POST",
                    data: form,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {

                    $.notify({
                        icon: 'pe-7s-like',
                        message: "El libro se ha agregado exitosamente."
                    }, {
                        type: 'success',
                        timer: 4000
                    });

//                    console.log(response.data);
                    this.$router.push("/books/list");
                    console.log(response);
                });
            },
            rentBook(bookId) {
                this.$router.push(`/rents/make-rent/${bookId}`);
            }
        }

    }
</script>

<style lang="scss" scoped>
    .inline {
        display: inline-block;
    }
</style>
