<template>
    <div id="heart-map-div" >
        <canvas >
            
        </canvas>
    </div>
</template>

<script>

import { defineComponent } from 'vue';

export default defineComponent({
    name: "HeartMap"
})
</script>

<style>
#heart-map-div{
    height: 500px;
    width: 500px;
    border: 1px solid red;
}


</style>