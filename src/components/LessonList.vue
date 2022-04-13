
<template>

    <div>
        <link rel="stylesheet" type="text/css" href="style.css">
        <div  v-for="lesson in lessons" :key="lesson.id" class="lesson_cards">

            <!-- Binding an image -->
            <div class="image">
                <img v-bind:src="lesson.image" alt="Lesson Image">
            </div>

            <!-- Displaying the details -->
            <div class="title"><p>{{lesson.subject}}</p></div>
            <div class="location">Location: {{lesson.location}}</div>
            <div class="spaces">Spaces Left: {{lesson.spaces}}</div>
            <div class="price">{{lesson.price}} £ </div>

            <!-- Displaying the ratings -->
            <div class="rating">
                <span v-for="n in lesson.rating" :key="n+1"><i class="fas fa-star"></i></span>
                <span v-for="n in 5-lesson.rating" :key="n+5"><i class="far fa-star"></i></span>
            </div>

            <!-- Displaying the "Add to Cart" Button -->
            <button class="addToCart" @click="addLessonToCart(lesson)" v-if="canAddToCart(lesson)">Add to Cart</button>

            <!-- Disabling the button if the lessons cannot be added -->
            <button class="addToCart" disabled = "disabled" v-else>Add to Cart</button>

            <!-- Showing the remaining spaces for the lesson -->
            <span class="button_information" v-if ="lesson.spaces == 0">All Out!</span>
            <span class="button_information" v-if ="lesson.spaces < 5 && lesson.spaces > 0">Only {{lesson.spaces}} left!</span>
            
        </div>
    </div>
</template>

<script>
export default {
  name: "ProductList",
  props: ['lessons'],
  data() {
      
    return {
        //fetching the lessons from server
    // lessons: [],
    };
  },
//   mounted(){            //created function fetches the lessons

//     //fetching the lessons from server
//     fetch('https://cst3145cwhadassah.herokuapp.com/collection/lessons').then( response => {
//         response.json().then(json => {
//             this.lessons = json;
//             console.log(json);
//         } )

//     });
        
//     },
  methods: {
    addLessonToCart(lesson) {
      console.log("added product", lesson.id);
      this.$emit('addLesson',lesson);
    },
    canAddToCart(lesson){
        return lesson.spaces > 0;
    },
    fetchlessons(){
        //fetching the lessons from server
    fetch('https://cst3145cwhadassah.herokuapp.com/collection/lessons').then(
        function(response){
            response.json().then(
                function(json){
                    return json;
                });
        });
    }
  },
};
</script>