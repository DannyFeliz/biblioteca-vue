<template>
    <div class="content">
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12 text-center">
                    <div class="card">
                        <div class="header">
                            <h4 class="title">Libros por Género</h4>
                            <!--<p class="category">Last Campaign Performance</p>-->
                        </div>
                        <div class="content text-center">
                            <div id="genre" class="ct-chart ct-perfect-fourth">

                                <div style="width:250px; display: inline-block;" class="text-center">
                                    <canvas id="myChart" width="400" height="400"></canvas>
                                </div>

                            </div>
                            <!--<div id="chartPreferences" class="ct-chart ct-perfect-fourth">-->

                            <!--</div>-->

                        </div>
                    </div>


                    <div class="card">
                        <div class="header">
                            <h4 class="title">Libros Mas Rentados</h4>
                            <!--<p class="category">Last Campaign Performance</p>-->
                        </div>
                        <div class="content text-center">

                                <div style="display: inline-block" class="text-center">
                                    <canvas id="rents" width="450" height="450"></canvas>
                                </div>

                            <!--<div id="chartPreferences" class="ct-chart ct-perfect-fourth">-->

                            <!--</div>-->

                        </div>
                    </div>

                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Chart from 'chart.js'
    let myChart = new Chart({})

    export default {

        name: "Home",
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                books: [],
                currentRented: [],
                alreadyReturned: [],
                rentsList: []
            }
        },
        mounted() {
            if (!localStorage.getItem("user")) {
                this.$router.replace("/login");
            }
            this.getBooks();
            this.getRents();




        },
        methods: {
            getBooks() {
                axios({
                    url: `${API}/books`,
                    method: "GET"
                }).then((response) => {
                    this.books = response.data;
                    this.initGra();
                    this.getRents();
                    setTimeout(() => {
                        this.iniBar();
                    }, 1000)
                });
            },
            getRents() {
                axios({
                    url: `${API}/rents`,
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

                    this.currentRented = this.rentsList.filter(rent => !rent.IsReturned);
                    this.alreadyReturned = this.rentsList.filter(rent => rent.IsReturned);

                    //this.currentRented = _.sortBy(this.currentRented, function(o) { return o.UpdatedAt; })
                    //this.alreadyReturned = _.sortBy(this.alreadyReturned, function(o) { return o.UpdatedAt; })
                })
            },
            generateColor() {
                return '#' + (function co(lor){   return (lor +=
                    [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
                && (lor.length == 6) ?  lor : co(lor); })('');
            },
            initGra() {
                var ctx = document.getElementById("myChart");
                let genre = _.groupBy(this.books, "Genre");
                let labels = Object.keys(genre);
                let dataGra = [];
                let colors = [];
                for (var item in genre) {
                    dataGra.push(genre[item].length);
                    colors.push(this.generateColor());
                }

                var data = {
                    labels: labels,
                    datasets: [
                        {
                            data: dataGra,
                            backgroundColor: colors,
                            hoverBackgroundColor: colors
                        }]
                };


                var myPieChart = new Chart(ctx, {
                    type: 'pie',
                    data: data,
                    options: {
                        animation: {
                            animateScale: true
                        }
                    }
                });

            },
            iniBar() {
                var ctx = document.getElementById("rents");

                let grouped = _.groupBy(this.rentsList, "BookId");
                let groupedValues = Object.values(grouped);
                let sortedData = groupedValues.sort(function(a, b){
                    // ASC  -> a.length - b.length
                    // DESC -> b.length - a.length
                    return b.length - a.length;
                });

                sortedData.length = 5;
                let ids = [];
                for(let i = 0; i < sortedData.length; i++) {
                    ids.push(sortedData[i][0].BookId);
                }

                console.log("sortedData", sortedData);
                let dataGraf = sortedData.map(item => item.length);
                console.log("dataGraf", dataGraf);
                let colors = [];
                let labels = ids.map(item => {
                    colors.push(this.generateColor());
                    let label = _.find(this.books, {Id: item});

                    return label.Title;
                });

                console.log(ids);
                console.log(labels);

                var data = {
                    labels: labels,
                    datasets: [
                        {
                            label: "Cantidad de rentas",
                            backgroundColor: colors,
                            borderColor: colors,
                            borderWidth: 1,
                            data: dataGraf,
                        }
                    ]
                };


                var myBarChart = new Chart(ctx, {
                    type: 'bar',
                    data: data,
                    options: {
                        scales: {
                            xAxes: [{
                                stacked: true
                            }],
                            yAxes: [{
                                stacked: true
                            }]
                        }
                    }
                });
            }
        }

    }
</script>

<style lang="scss">
</style>
