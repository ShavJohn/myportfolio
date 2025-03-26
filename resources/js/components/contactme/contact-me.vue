<script setup lang="ts">
let imagePrefix = window.imagePrefix

</script>

<template>
    <div class="contact-me-container">
        <div class="contact-me-inner-container">
            <div class="image-container">
                <img ref="image" :src="`${imagePrefix}/shavjohn_logo.png`" alt="3D Hover Effect"  />
            </div>
            <div class="form-container">
                <form>
                    <div class="form-input">
                        <label for="your-name">Your Name</label>
                        <input type="text" id="your-name" placeholder="Your Name">
                    </div>
                    <div class="form-input">
                        <label for="your-email">Your Email</label>
                        <input type="email" id="your-email" placeholder="Your Email">
                    </div>
                    <div class="form-input">
                        <label>Your Message</label>
                        <textarea></textarea>
                    </div>
                    <div class="form-input">
                        <button>Send Message</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
