<template>
    <div class="grid grid-cols-12 gap-6">
      <div class="key_container col-span-12 xl:col-span-2 xl:shadow-lg">

            <section class="grid grid-cols-12 gap-4 my-2 p-2" v-for="(value,index) in last_data" :key="index">
              <article class="col-span-12 p-10  bg-gray-50 font-bold rounded-2xl shadow-lg">
                <h3 class="text-xl text-gray-400">Last Date</h3>
                {{ value.date }}
            </article>
              <article class="col-span-12 p-10  bg-orange-50 font-bold rounded-2xl shadow-lg">
                <h3 class="text-xl text-orange-400">Power</h3>
                {{ numberFormat(value.power) }}
            </article>
            <article class="col-span-12 p-10  bg-green-50 font-bold rounded-2xl shadow-lg">
                <h3 class="text-xl text-green-400">Kill Points</h3>
                {{ numberFormat(value.kill_points) }} 
            </article>
            <article class="col-span-12 p-10  bg-red-50 font-bold rounded-2xl shadow-lg">
                <h3 class="text-xl text-red-400">Deads</h3>
                {{ numberFormat(value.deads) }} 
              </article>
            
        </section>

    <hr>
        <section class="grid grid-cols-12 gap-4 my-2 p-2" v-for="(value,index) in rss" :key="index">
          
            <article class="col-span-12 p-10  bg-amber-50 font-bold rounded-2xl shadow-lg">
              <h3 class="text-xl text-amber-700">Wood</h3>
                {{ numberFormat(value.wood) }}
            </article>
            <article class="col-span-12 p-10  bg-green-50 font-bold rounded-2xl shadow-lg">
              <h3 class="text-xl text-green-700">Food</h3>
                {{ numberFormat(value.food) }} 
            </article>
            <article class="col-span-12 p-10  bg-yellow-50 font-bold rounded-2xl shadow-lg">
              <h3 class="text-xl text-yellow-700">Gold</h3>
                {{ numberFormat(value.gold) }} 
              </article>
              <article class="col-span-12 p-10  bg-gray-100 font-bold rounded-2xl shadow-lg">
              <h3 class="text-xl text-gray-700">Stone</h3>
                {{ numberFormat(value.stone) }} 
              </article>
            
        </section>
        </div>

        <section class="  graph_container col-span-12 xl:col-span-10">
          
          <section class="flex flex-col xl:flex-row justify-center items-center p-2 my-2 w-full" >
          
          <article class=" p-10 w-full m-2  bg-indigo-50 font-bold rounded-2xl shadow-lg" v-for="(value,index) in accel_user" :key="index">
            <h3 class="text-xl text-indigo-700">{{value.id_type_accels.name_item_accel}}</h3>
                    {{convertTime(value.time_accel)}}
          </article>

          
          </section>
          <article class="grid grid-cols-12 gap-4">
            <div ref="power" id="power" class="graph col-span-12 xl:col-span-4 p-10 shadow-lg rounded-xl m-2"></div>
            <div ref="kill_points" id="kill_points" class=" graph col-span-12 xl:col-span-4 p-10 shadow-lg rounded-xl m-2"></div>
            <div ref="deads" id="deads" class="graph col-span-12 xl:col-span-4 p-10 shadow-lg rounded-xl m-2"></div>
            <div ref="inf" id="inf" class="graph col-span-12 xl:col-span-4 p-10 shadow-lg rounded-xl m-2"></div>
            <div ref="cav"  id="cav" class="graph col-span-12 xl:col-span-4 p-10 shadow-lg rounded-xl m-2"></div>
            <div ref="archers" id="archers" class="graph col-span-12 xl:col-span-4 p-10 shadow-lg rounded-xl m-2"></div>
            <!-- <div ref="treb" id="treb" class="graph col-span-12 xl:col-span-4 p-10 shadow-lg rounded-xl m-2"></div> -->
          </article>
        </section>

    </div>
 
  </template>


  <script>
  import axios from 'axios';
  import * as d3 from 'd3';
  
  export default {
    data() {
      return {
        data_chart: [],
        last_data:[],
        infantry:[],
        cavalry:[],
        archers:[],
        rss:[],
        accel_user:[]
      };
    },
    async created(){
        this.last_data=this.GetLastData();
        this.rss = this.getRss();
       this.accel_user= this.getAccel();
        await this.getInfantry();
        await this.getArchers();
        await this.getCavalry();
        await this.getTreb();
    },

    mounted() {
      this.getData().then(() => {
        this.data_chart.forEach(d => {
          d.date = new Date(d.date); // Convertit la date en objet de date JavaScript
        });
        this.createChart(this.data_chart,this.$refs.power,"date","power",'Power','#f97316');
        this.createChart(this.data_chart,this.$refs.kill_points,"date","kill_points",'Kill Point','#22c55e');
       this.createChart(this.data_chart,this.$refs.deads,"date","deads",'Deads','#ef4444');
    
      });
      this.getInfantry().then(() => {
        this.infantry.forEach(d => {
          d.date_updated = new Date(d.date_updated); // Convertit la date en objet de date JavaScript
        });
        this.createChartTwice(this.infantry,this.$refs.inf,"date_updated","value_troop",'Infantry','#3b82f6','#0ea5e9')
    });
    this.getCavalry().then(() => {
        this.cavalry.forEach(d => {
          d.date_updated = new Date(d.date_updated); // Convertit la date en objet de date JavaScript
        });
        this.createChartTwice(this.cavalry,this.$refs.cav,"date_updated","value_troop",'Cavalry','#3b82f6','#0ea5e9')
    });
    this.getArchers().then(() => {
        this.archers.forEach(d => {
          d.date_updated = new Date(d.date_updated); // Convertit la date en objet de date JavaScript
        });
        this.createChartTwice(this.archers,this.$refs.archers,"date_updated","value_troop",'Archers','#3b82f6','#0ea5e9')
    });
    // this.getTreb().then(() => {
    //     this.treb.forEach(d => {
    //       d.date_updated = new Date(d.date_updated); // Convertit la date en objet de date JavaScript
    //     });
    //     this.createChartTwice(this.treb,this.$refs.treb,"date_updated","value_troop",'Trebuchet','#3b82f6','#0ea5e9')
    // });

    },
    methods: {
      async getData() {
        try {
        const governorId = this.$route.params.governor_id;
          const response = await axios.get(`${process.env.VUE_APP_URL_API}/api/kill_power_user/?governor_id=${governorId}&type=json`);
          this.data_chart = response.data.results;
          return this.data_chart;
        } catch (error) {
          console.error("Error fetching data: ", error);
          return [];
        }
      },
      numberFormat(value) {
      if (value !== null && value !== undefined) {
        return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
      }
    },
      async GetLastData(){
        
        try {
        const governorId = this.$route.params.governor_id;
          const response = await axios.get(`${process.env.VUE_APP_URL_API}/api/kill_power_user/?governor_id=${governorId}&ordering=-id&limit=1&type=json`);
          this.last_data = response.data.results;
          return this.last_data;
        } catch (error) {
          console.error("Error fetching data: ", error);
          return [];
        }
      },
      async getInfantry(){
        try{
            const governorId = this.$route.params.governor_id;
            const response = await axios.get(`${process.env.VUE_APP_URL_API}/api/troop_user/?id_account=${governorId}&id_type_troops=1&date_gte=2023-01-01`)
            this.infantry=response.data.results;
            return this.infantry
        }
        catch(error){
            console.log(error)
        }
      },
      async getCavalry(){
        try{
            const governorId = this.$route.params.governor_id;
            const response = await axios.get(`${process.env.VUE_APP_URL_API}/api/troop_user/?id_account=${governorId}&id_type_troops=3&date_gte=2023-01-01`)
            this.cavalry=response.data.results;
            return this.cavalry
        }
        catch(error){
            console.log(error)
        }
      },
      async getArchers(){
        try{
            const governorId = this.$route.params.governor_id;
            const response = await axios.get(`${process.env.VUE_APP_URL_API}/api/troop_user/?id_account=${governorId}&id_type_troops=2&date_gte=2023-01-01`)
            this.archers=response.data.results;
            return this.archers
        }
        catch(error){
            console.log(error)
        }
      },
      async getTreb(){
        try{
            const governorId = this.$route.params.governor_id;
            const response = await axios.get(`${process.env.VUE_APP_URL_API}/api/troop_user/?id_account=${governorId}&id_type_troops=4&date_gte=2023-01-01`)
            this.treb=response.data.results;
            return this.treb
        }
        catch(error){
            console.log(error)
        }
      },
      async getRss(){
        try{
            const governorId = this.$route.params.governor_id;
            const response = await axios.get(`${process.env.VUE_APP_URL_API}/api/ressource_user/?id_account=${governorId}&ordering=-id&limit=1`);
            this.rss = response.data.results
        
            return this.rss
        }
        catch(error){
            console.log(error)
            this.$router.push({name:"login"})
        }
      },
      async getAccel(){
        try{
            const governorId = this.$route.params.governor_id;
            const promises = [
        axios.get(`${process.env.VUE_APP_URL_API}/api/accel_user/?id_account=${governorId}&id_type_accels=1&ordering=-id&limit=1`),
        axios.get(`${process.env.VUE_APP_URL_API}/api/accel_user/?id_account=${governorId}&id_type_accels=2&ordering=-id&limit=1`),
        axios.get(`${process.env.VUE_APP_URL_API}/api/accel_user/?id_account=${governorId}&id_type_accels=3&ordering=-id&limit=1`),
        axios.get(`${process.env.VUE_APP_URL_API}/api/accel_user/?id_account=${governorId}&id_type_accels=4&ordering=-id&limit=1`),
        axios.get(`${process.env.VUE_APP_URL_API}/api/accel_user/?id_account=${governorId}&id_type_accels=5&ordering=-id&limit=1`)
    ];

        const responses = await Promise.all(promises);
      this.accel_user = responses.map(response => response.data.results[0]);
  
            return this.accel_user
        }
        catch(error){
            console.log(error)
            return []
        }
      },
    

      createChart(data,ref_chart,x_data,y_data,title,color_line) {

        const margin = { top: 50, right: 0, bottom: 0, left: 0 };
        const container = ref_chart
        const width = container.clientWidth - margin.left - margin.right;
        const height = (container.clientWidth * 0.75) - margin.top - margin.bottom; // Utilisez le ratio pour la hauteur
        const formatNumber = d3.format(",");
        const svg = d3
        //   .select(this.$refs.chart)
        .select(ref_chart)
          .append("svg")
          .attr("width", "100%")
          .attr("height", "100%")
          .attr("preserveAspectRatio", "xMidYMid meet")
          .attr("viewBox", `0 0 ${container.clientWidth} ${container.clientWidth*0.9}`)
          .append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
  
        // Créez un graphique en utilisant des lignes
        const xScale = d3.scaleTime().domain(d3.extent(data, d => d[x_data])).range([0, width]);
        
        // Personnalisez l'échelle de l'axe Y pour afficher des étiquettes tous les 5 millions
        const yMax = d3.max(data, d => d[y_data]);
        const yScale = d3.scaleLinear().domain([0, yMax ]).range([height, 0]);
  
        const line = d3.line()
          .x(d => xScale(d[x_data]))
          .y(d => yScale(d[y_data]))

          .curve(d3.curveMonotoneX); // Utilisez une courbe Monotone pour des lignes plus lisses

        // Dessinez la ligne
        svg.append("path")
          .datum(data)
          .attr("fill", "none")
          .attr("stroke", color_line)
          .attr("stroke-width", 4)
          .attr("d", line);
        

  
        // Ajoutez les axes
        const xAxis = d3.axisBottom(xScale);
        
        // Personnalisez l'axe Y pour afficher des étiquettes tous les 5 millions
        const yAxis = d3.axisLeft(yScale).ticks(7).tickFormat(d3.format(".2s"));
  
        svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", `translate(0, ${height})`)
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("class","font-bold text-xl")
          .attr("dx", "-0.8em")
          .attr("dy", "0.15em")
          .attr("transform", "rotate(-30)");
  
        svg.append("g")
          .attr("class", "y-axis")
          .call(yAxis)
          .attr("class","font-bold text-xl");
  

        // Ajoutez un titre
        svg.append("text")
          .attr("x", width / 2)
          .attr("y", -margin.top/2-5)
          .attr("text-anchor", "middle")
          .attr("class","font-bold text-2xl")
          .text(title);
  
          const tooltip = d3.select(ref_chart).append("div").attr("class", "tooltip");
          const circles1 = svg.selectAll(".circle-y1")
          .data(data)
          .enter()
          .append("circle")
          .attr("class", "circle-y1")
          .attr("cx", d => xScale(d[x_data]))
          .attr("cy", d => yScale(d[y_data]))
          .attr("r", 5) // Ajustez la taille des cercles
          .attr("fill", color_line); 
          // Ajoutez l'interaction "hover" pour les cercles de la série y_data
        circles1.on("mouseover", function (event, d) {
          const x = event.pageX;
          const y = event.pageY;

          // permet l'affichage des données 
          tooltip.html(`${y_data}: ${formatNumber(d[y_data])}`)
            .style("left", x + "px")
            .style("top", y + "px")
            .attr("class"," text-white absolute top-0 -left-20  text-lg font-bold p-2 m-2")
            .style("background",color_line)
            .style("height","auto")
            .style("width","10%")
            .style("display", "block");
        });

        circles1.on("mouseout", function () {
          tooltip.style("display", "none");
        });
        // Personnalisez davantage le graphique selon vos besoins
      },
      createChartTwice(data, ref_chart, x_data, y_data, title, color_line, color_line_2) {
  const margin = { top: 50, right: 0, bottom: 0, left: 0 };
  const container = d3.select(ref_chart);
  const width = container.node().clientWidth - margin.left - margin.right;
  const height = (container.node().clientWidth * 0.75) - margin.top - margin.bottom;
  const formatNumber = d3.format(",");
  const svg = d3.select(ref_chart)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", `0 0 ${container.node().clientWidth} ${container.node().clientWidth * 0.9}`)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

        // générer les tables 
  const filteredData1 = data.filter(d => d.id_type_unit.id_type_unit === 4);
  const filteredData2 = data.filter(d => d.id_type_unit.id_type_unit === 5);


  const xScale = d3.scaleTime().domain(d3.extent(data, d => d[x_data])).range([0, width]);

  const y_max_1 = d3.max(filteredData1, d => d[y_data]);
  const y_max_2 = d3.max(filteredData2, d => d[y_data]);
  const yMax = Math.max(y_max_1, y_max_2);

  const yScale = d3.scaleLinear().domain([0, yMax]).range([height, 0]);

  const line = d3.line()
    .x(d => xScale(d[x_data]))
    .y(d => yScale(d[y_data]))
    .curve(d3.curveMonotoneX);

  const line2 = d3.line()
    .x(d => xScale(d[x_data]))
    .y(d => yScale(d[y_data]))
    .curve(d3.curveMonotoneX);

  svg.append("path")
    .datum(filteredData1)
    .attr("fill", "none")
    .attr("stroke", color_line)
    .attr("stroke-width", 4)
    .attr("d", line);

  svg.append("path")
    .datum(filteredData2)
    .attr("fill", "none")
    .attr("stroke", color_line_2)
    .attr("stroke-width", 4)
    .attr("d", line2);

  const xAxis = d3.axisBottom(xScale);

  const yAxis = d3.axisLeft(yScale).ticks(7).tickFormat(d3.format(".2s"));

  svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis)
    .selectAll("text")
    .style("text-anchor", "end")
    .attr("class", "font-bold text-xl")
    .attr("dx", "-0.8em")
    .attr("dy", "0.15em")
    .attr("transform", "rotate(-30)");

  svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis)
    .attr("class", "font-bold text-xl");

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", -margin.top / 2 - 5)
    .attr("text-anchor", "middle")
    .attr("class", "font-bold text-2xl")
    .text(title);


  const legend = svg
    .append("g")
    .attr("class", "legend")
    //.attr("transform", `translate(${width - 100}, 20)`)
    .attr("transform", "translate(40, 20)");

  legend
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("x", -20)
    .attr("y", 0)
    .attr("fill", color_line);

  legend
    .append("rect")
    .attr("x", -20)
    .attr("y", 30)
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", color_line_2);


  const filteredLabels =["T4","T5"]

  filteredLabels.forEach((label, i) => {
    legend
      .append("text")
      .attr("x", 30)
      .attr("y", 10 + i * 30)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text(label);
  });

  const tooltip = d3.select(ref_chart).append("div").attr("class", "tooltip");
  const circles1 = svg.selectAll(".circle-y1")
  .data(filteredData1)
  .enter()
  .append("circle")
  .attr("class", "circle-y1")
  .attr("cx", d => xScale(d[x_data]))
  .attr("cy", d => yScale(d[y_data]))
  .attr("r", 5) // Ajustez la taille des cercles
  .attr("fill", color_line); 


const circles2 = svg.selectAll(".circle-y2")
  .data(filteredData2)
  .enter()
  .append("circle")
  .attr("class", "circle-y2")
  .attr("class","relative")
  .attr("cx", d => xScale(d[x_data]))
  .attr("cy", d => yScale(d[y_data]))
  .attr("r", 5) 
  .attr("fill", color_line_2);

  

// Ajoutez l'interaction "hover" pour les cercles de la série y_data
circles1.on("mouseover", function (event, d) {
  const x = event.pageX;
  const y = event.pageY;

  // permet l'affichage des données 
  tooltip.html(`${filteredLabels[0]}: ${formatNumber(d[y_data])}`)
    .style("left", x + "px")
    .style("top", y + "px")
    .attr("class"," text-white absolute top-0 left-0 text-lg font-bold p-2 m-2")
    .style("background",color_line)
    .style("height","auto")
    .style("width","10%")
    .style("display", "block");
});

circles1.on("mouseout", function () {
  tooltip.style("display", "none");
});

// Ajoutez l'interaction "hover" pour les cercles de la série y_data_2
circles2.on("mouseover", function (event, d) {
  const x = event.pageX;
  const y = event.pageY;

  tooltip.html(`${filteredLabels[1]} : ${formatNumber(d[y_data])}`)
  .style("left", x + "px")
    .style("top", y + "px")
    .attr("class"," text-white absolute top-0 -left-24 right-0   text-lg font-bold p-2 m-2")
    .style("background",color_line_2)
    .style("height","auto")
    .style("width","10%")
    .style("display", "flex");
});

circles2.on("mouseout", function () {
  tooltip.style("display", "none");
});


},

convertTime(seconds) {
      const days = Math.floor(seconds / (3600 * 24));
      seconds -= days * 3600 * 24;
      const hours = Math.floor(seconds / 3600);
      seconds -= hours * 3600;
      const minutes = Math.floor(seconds / 60);
      seconds -= minutes * 60;
      return `${days} D ${hours} Hour ${minutes}min`;
    },
    
    }
  };
  </script>
    <style>
    .graph {
   height: 30em;
        
    }
    </style>