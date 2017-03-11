<template>
    <div class="content">
        <div class="container">
            <div class="row">
                <div class="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                    <form method="#" action="#" @submit.prevent="">

                        <!--   if you want to have the card without animation please remove the ".card-hidden" class   -->
                        <div class="card">
                            <div class="header text-center">Inicio de Sesión</div>
                            <div class="content">
                                <div class="form-group">
                                    <label>Email</label>
                                    <input type="email" v-model="email" placeholder="email@ejemplo.com" class="form-control" required>
                                </div>
                                <div class="form-group">
                                    <label>Contraseña</label>
                                    <input type="password" v-model="password" placeholder="*****" class="form-control" required>
                                </div>
                                <!--<div class="form-group">-->
                                    <!--<label class="checkbox">-->
                                        <!--<span class="icons"><span class="first-icon fa fa-square-o"></span><span class="second-icon fa fa-check-square-o"></span></span><input type="checkbox" data-toggle="checkbox" value="">-->
                                        <!--Subscribe to newsletter-->
                                    <!--</label>-->
                                <!--</div>-->
                            </div>
                            <div class="footer text-center fix-height">
                                <button @click="login" type="submit" class="btn btn-fill btn-warning btn-wd separe-btns">Iniciar Sesión</button>
                                <button @click="register" type="submit" class="btn btn-fill btn-warning btn-wd separe-btns">Registro</button>
                            </div>
                        </div>

                    </form>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                email: "",
                password: "",
                user: []
            }
        },
        mounted() {
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }
        },
        methods: {
            login(e) {
                axios({
                    url: `${API}/users?Email=${this.email}&Password=${this.password}`,
                    method: "GET"
                }).then((response) => {
                    this.user = response.data;
                    if (!response.data.length) {
                        $.notify({
                            icon: 'pe-7s-close-circle',
                            message: "El usuario o contraseña es incorrecto"
                        },{
                            type: 'danger',
                            timer: 4000
                        });
                        return;
                    }

                    let user = JSON.stringify(this.user[0]);
                    localStorage.setItem("user", user);
                    window.User = JSON.parse(user);
                    this.$emit("userData", JSON.parse(user));
                    this.$router.push("/home");
                    console.log(response);
                });
            },
            register() {
                this.$router.push("/register");
            }
        }

    }
</script>

<style lang="scss" scoped>
    .separe-btns{
        display: inline-block;
        width: 80%;
        text-align: center;
        margin-bottom: 10px;
    }

    .fix-height {
        height: 110px;
    }
</style>
