<template>

     <div>
         <link rel="stylesheet" type="text/css" href="style.css">
         <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css">
        <div v-for='lesson in cart' :key="lesson.id" class="lesson_cards">
            <!-- <button @click="cart.splice(index,1)">remove</button> -->

                    <!-- Binding an image -->
                    <div class="image">
                        <img v-bind:src="lesson.image" alt="Lesson Image">
                    </div>

                    <!-- Adding the details -->
                    <div class="title"><p>{{lesson.subject}}</p></div>
                    <div class="location">Location: {{lesson.location}}</div>
                    <div class="price">{{lesson.price}} £ </div>
                    <div class="rating">
                        <span v-for="n in lesson.rating" :key="n+1"><i class="fas fa-star"></i></span>
                        <span v-for="n in 5-lesson.rating" :key="n+5"><i class="far fa-star"></i></span>
                    </div>

                    <!-- Adding a "Remove" button to remove the lesson from cart -->
                    <button class="removeButton" @click ="remove(lesson)" >
                        <span  class="fas fa-trash-alt">&nbsp; Remove</span> 
                    </button>
                <!-- End of lesson card -->
        </div>
    <!-- Checkout Form -->
        <div class="checkoutForm">
            <strong>{{successfulCheckout}}</strong>
            <!-- Name input field -->
            <strong>Name: </strong>
            <span class="checkoutInput">
                <input type="text" v-model="name"  placeholder="Enter Name..." v-on:keypress="isLetter($event)">
            </span>
            
            <!-- Phone number field -->
            <strong>Phone: </strong>
            <span class="checkoutInput">
                <input type="text" v-model="phone" placeholder="0123" v-on:keypress="isNumber($event)"> <p></p>
            </span>
            
            <!-- Checkout button. Only enabled if values to Name and Phone are added -->
            <button v-if="name == '' || phone == ''" disabled = "disabled">Checkout</button>
            <button v-else @click="CheckoutLessons()">Checkout</button>
            <p style="font-size: 1.5rem; color: red; margin-top: 0; padding-bottom: 70px; padding-left: 10%;">{{errorMessage}}</p>
            
        </div>
  </div>
</template>

<script>
export default {
  name: "Form",
  props: ['cart'],
  data() {
    return {
      name: "",
      phone: 0,
      errorMessage: "",
      successfulCheckout: "",
    };
  },
  methods: {
      isLetter(e){
            //for every character input
            let char = String.fromCharCode(e.keyCode); 

            //if the character is an alphabet
            if(/^[A-Za-z]+$/.test(char)){
                this.errorMessage = "";
                return true;
            }  
            else{
                //displaying error message
                this.errorMessage = "Please enter only characters";
            } 
            
    },
    //function to check if the user input for phone has only numbers
        isNumber(e){

            //matching the user input with the character code of 0-9
            if(e.charCode >= 48 && e.charCode <= 57 ){
                this.errorMessage = "";
                return true;
            }
            else{
                //displaying error message
                this.errorMessage = "Please enter only numbers";
            }
        },
        CheckoutLessons(){
                    if(this.errorMessage == "" && this.cart.length > 0){
                        alert("Successfully placed order!");
                        this.successfulCheckout = "Thank you for purchasing!";
                        this.name = "";
                        this.phone = "";
                        this.cart.splice(0, this.cart.length);
                    }
                    else if(this.cart.length == 0){
                        alert("No products in cart!")
                    }
                    else{
                        alert("Please enter the correct values.");
                    }
                    
                },
        remove(lesson){
            console.log("removing lesson from cart...");
            this.$emit('removeLesson', lesson);
        }
  }
  
};
</script>