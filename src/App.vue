<template>


  <div id="app">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
    <link rel="stylesheet" type="text/css" href="style.css">
    <header>
            <a href="#" class="logo"><i class="fas fa-school" style="font-size: 25px;background: -webkit-linear-gradient(#f3b3c6, #f7e0a2);-webkit-background-clip: text;-webkit-text-fill-color: transparent;">&nbsp; ASC</i></a>
            
            <!-- creating a navigation bar -->
            <nav class="navbar">
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#courses">Courses</a></li>
                </ul>
            </nav>

            <!-- creating the checkout button -->
            <button class="checkout" @click="showCheckout" v-if="cartItemCount >= 1">
                <span class="fas fa-cart-plus">&nbsp; &nbsp; Checkout &nbsp; </span>
                <span>{{cartItemCount}}</span>
            </button>

            <!-- disbaling the checkout button if no items are added -->
            <button class="checkout" disabled='disabled' v-else>
                <span class="fas fa-cart-plus">&nbsp; &nbsp; Checkout</span>
            </button>
        </header>
        <!-- <component :is="currentView"/> -->
        <div v-if="showLessons">
            <section class="home" id="home">
                    <h1>After School Club</h1>
                    <p>Engage in artistic, creative, physical and scientific activities</p>
                </section>

                <!-- About Section -->
                <section class="about" id="about">
                    <div class="about_image">
                        <img src="about.png" alt="Girl Studying">
                    </div>
                    <div class="content">
                        <h3>Why Choose Us?</h3>
                        <p>At this After School Club, we believe in a holistic approach to learning and encourage our students to 
                            broaden their horizons and explore their talents by participating in one of our after-school clubs. Clubs generally meet 
                            once a week and include a wide range of opportunities for activities including, but not limited 
                            to, photography, drama, sports, music, and art.</p>
                        <p>Several studies have shown that extracurricular activities for children 
                            improve academic performance, including study habits and raw grades. 
                            Children's behavior is also improved, reducing the occurrence of negative social issues at school</p>
                    </div>
                </section>
                <section class="course" id="courses">
                <h1>Club Activities to Choose From</h1> <br><br>

                <main>
                    <lesson-list :lessons="lessons" @addLesson="addLessonToCart"></lesson-list>
                </main>
                </section>
            </div>
            <div class="checkoutPage" v-else>

                <h3>CheckOut!</h3>

                <!-- Displaying the lessons in the cart, if the cart is not empty -->
                <div class="main" v-if ="this.cart.length > 0" >
                    <checkout :cart="cart" @removeLesson="removeLessonFromCart"></checkout>
                </div>
                <!-- If all products are removed from cart, button is displayed to take back to the products page -->
                <div class="main" v-else>
                    <button @click ="showCheckout()" class = "goBackBtn">
                        <span  class="fas fa-arrow-left">&nbsp; Back To Products</span>
                    </button>
                </div>
            </div>
  </div>
</template>

<script>
import lessonList from "./components/LessonList.vue";
import checkout from "./components/Form.vue";

export default {
  name: "App",
  components: {
    lessonList,
    checkout
  },
  data() {
    return {
      cart: [],
      lessons :[],
      showLessons: true,
    };
  },
   mounted(){            //created function fetches the lessons

    //fetching the lessons from server
    fetch('https://cst3145cwhadassah.herokuapp.com/collection/lessons').then( response => {
        response.json().then(json => {
            this.lessons = json;
            console.log(json);
        } )

    });
        
    },
  methods: {
    // showCheckout() {},
    addLessonToCart(lesson) {
     console.log("addLesson event received by the root component.");
      //reduce the spaces by 1
      lesson.spaces -= 1;
      this.cart.push(lesson);
    },
    showCheckout(){             
        this.showLessons = this.showLessons ? false : true;
    },
    removeLessonFromCart(lesson){
        //increase the spaces by one on the main page
        lesson.spaces += 1;
        for(let i = 0; i <= this.cart.length; i++){
                if(this.cart[i].id === lesson.id){
                    this.cart.splice(i, 1);
                    break;
                }
        }
    }
    
  },
  computed: {
    //function to return cart length                
    cartItemCount(){
        return this.cart.length || '';
    }
  },
};

</script>