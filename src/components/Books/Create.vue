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
                                    <select class="form-control" required v-model="genre">
                                        <option value="" disabled>Seleccione una opción</option>
                                        <option value="Antiguedades y Coleccionables">Antiguedades y Coleccionables</option>
                                        <option value="Arquitectura">Arquitectura</option>
                                        <option value="Arte">Arte</option>
                                        <option value="Artes Escénicas">Artes Escénicas</option>
                                        <option value="Autoayuda">Autoayuda</option>
                                        <option value="Biografía y Autobiografía">Biografía y Autobiografía</option>
                                        <option value="Calendarios">Calendarios</option>
                                        <option value="Casa y Hogar">Casa y Hogar</option>
                                        <option value="Ciencia">Ciencia</option>
                                        <option value="Ciencias Políticas">Ciencias Políticas</option>
                                        <option value="Ciencias Sociales">Ciencias Sociales</option>
                                        <option value="Cocina Comida y Vinos">Cocina Comida y Vinos</option>
                                        <option value="Colecciones Literarias">Colecciones Literarias</option>
                                        <option value="Comics y Novelas Gráficas">Comics y Novelas Gráficas</option>
                                        <option value="Computación e Internet">Computación e Internet</option>
                                        <option value="Crímenes Verdaderos">Crímenes Verdaderos</option>
                                        <option value="Crítica Literaria">Crítica Literaria</option>
                                        <option value="Cuerpo Mente y Espíritu">Cuerpo Mente y Espíritu</option>
                                        <option value="Deportes y Recreación">Deportes y Recreación</option>
                                        <option value="Drama">Drama</option>
                                        <option value="Educación">Educación</option>
                                        <option value="Estudio de Lenguas Extranjeras">Estudio de Lenguas Extranjeras</option>
                                        <option value="Familia y Relaciones">Familia y Relaciones</option>
                                        <option value="Ficción">Ficción</option>
                                        <option value="Ficción para Niños">Ficción para Niños</option>
                                        <option value="Filosofía">Filosofía</option>
                                        <option value="Fotografía">Fotografía</option>
                                        <option value="Guías de Ayuda">Guías de Ayuda</option>
                                        <option value="Historia & Geografía">Historia & Geografía</option>
                                        <option value="Humor">Humor</option>
                                        <option value="Jardinería">Jardinería</option>
                                        <option value="Juegos">Juegos</option>
                                        <option value="Lengua y Literatura">Lengua y Literatura</option>
                                        <option value="Leyes">Leyes</option>
                                        <option value="Manualidades y Hobbies">Manualidades y Hobbies</option>
                                        <option value="Mascotas y Animales">Mascotas y Animales</option>
                                        <option value="Matemáticas">Matemáticas</option>
                                        <option value="Medicina">Medicina</option>
                                        <option value="Música">Música</option>
                                        <option value="Naturaleza y Aire libre">Naturaleza y Aire libre</option>
                                        <option value="Negocios y Economia">Negocios y Economia</option>
                                        <option value="Niños y Jóvenes">Niños y Jóvenes</option>
                                        <option value="Papeleria">Papeleria</option>
                                        <option value="Poesía">Poesía</option>
                                        <option value="Psicología">Psicología</option>
                                        <option value="Referencia">Referencia</option>
                                        <option value="Religión y Espiritualidad">Religión y Espiritualidad</option>
                                        <option value="Salud y Bienestar">Salud y Bienestar</option>
                                        <option value="Tecnología">Tecnología</option>
                                        <option value="Transporte">Transporte</option>
                                        <option value="Viajes">Viajes</option>
                                    </select>
                                    <!--<input type="text" v-model="genre" placeholder="Novela" class="form-control" required>-->
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
