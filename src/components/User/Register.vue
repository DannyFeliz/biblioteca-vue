<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                    <form method="#" action="#" @submit.prevent="">

                        <!--   if you want to have the card without animation please remove the ".card-hidden" class   -->
                        <div class="card">
                            <div class="header text-center">Registro de Usuario</div>
                            <div class="content">
                                <div class="form-group">
                                    <label>Nombre</label>
                                    <input type="text" v-model="name" placeholder="Juan" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Apellido</label>
                                    <input type="text" v-model="lastName" placeholder="Perez" class="form-control"
                                           required>
                                </div>

                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" v-model="email" placeholder="juan@gmail.com"
                                           class="form-control" required>
                                </div>

                                <div class="form-group">
                                    <label>Contraseña</label>
                                    <input type="password" v-model="password" placeholder="*****" class="form-control"
                                           required>
                                </div>

                                <div class="form-group">
                                    <label>Confirmar Contraseña</label>
                                    <input type="password" v-model="passwordConfirm" placeholder="*****"
                                           class="form-control" required>
                                </div>

                                <!--<div class="form-group">-->
                                <!--<label class="checkbox">-->
                                <!--<span class="icons"><span class="first-icon fa fa-square-o"></span><span class="second-icon fa fa-check-square-o"></span></span><input type="checkbox" data-toggle="checkbox" value="">-->
                                <!--Subscribe to newsletter-->
                                <!--</label>-->
                                <!--</div>-->
                            </div>
                            <div class="footer text-center fix-height">
                                <button @click="validateData" type="submit"
                                        class="btn btn-fill btn-warning btn-wd separe-btns">Registrar
                                </button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {store} from "./Store"
    export default {
        name: "Register",
        data () {
            return {
                name: "Jhon",
                lastName: "Doe",
                email: "dannyfeliz08@gmail.com",
                password: "123456",
                passwordConfirm: "123456",
                user: []
            }
        },
        mounted() {
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }
        },
        methods: {
            login() {

            },
            register() {
                let form = {
                    "Name": this.name,
                    "LastName": this.lastName,
                    "Email": this.email,
                    "Password": this.password,
                    "Role": 2,
                    "CreatedAt": moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ"),
                    "UpdatedAt": moment().format("YYYY-MM-DDTHH:mm:ss.SSSSZ")
                };

                console.log(form);

                axios({
                    url: `${API}/users`,
                    method: "POST",
                    data: form,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {

                    $.notify({
                        icon: 'pe-7s-like',
                        message: "Tu cuenta se ha registrado exitosamente"
                    }, {
                        type: 'success',
                        timer: 4000
                    });

                    console.log(response.data);
                    let user = JSON.stringify(response.data);
                    localStorage.setItem("user", user);
                    window.User = JSON.parse(user);
                    this.$emit("userData", JSON.parse(user));
                    this.$router.push("/home");
                    console.log(response);
                });
            },
            validateData() {
                if (this.password != this.passwordConfirm) {
                    $.notify({
                        icon: 'pe-7s-close-circle',
                        message: "Las contraseñas no son iguales"
                    }, {
                        type: 'danger',
                        timer: 4000
                    });

                    return;
                }

                store.findByEmail(this.email).then((response) => {
                    if (response.length) {
                        $.notify({
                            icon: 'pe-7s-close-circle',
                            message: "Ya existe un usuario con este email"
                        }, {
                            type: 'danger',
                            timer: 4000
                        });

                        return;
                    } else {
                        this.register();
                    }
                });


            }
        }

    }
</script>

<style lang="scss" scoped>
    .separe-btns {
        display: inline-block;
        width: 80%;
        text-align: center;
        margin-bottom: 10px;
    }

    .fix-height {
        height: 75px;
    }
</style>
