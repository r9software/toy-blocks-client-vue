<template>
 <v-row class="container">
   <v-col class="subtitle-text" cols="12">
     {{block.attributes.index}}
   </v-col>
   <v-col class="description-text" cols="12">
     {{block.attributes.data}}
   </v-col>
 </v-row>
</template>

<script>
export default {
name: "Block",
  props:['block'],
}
</script>

<style scoped>
  .container{
    background-color:#e0e0e0;
    margin-left: 0 !important;
    margin-right: 0 !important;
    margin-bottom: 6px;
    padding:0;
  }
  .subtitle-text{
    color: #2f4ffe;
    font-size: 12px;
    padding-top: 6px;
    padding-bottom: 0px;
    padding-left: 8px;
    font-weight: 500;
    line-height: 14px;
    letter-spacing: 0.44px;
  }
  .description-text{
    color: black;
    font-size: 14px;
    padding-top: 6px;
    padding-left: 8px;
    line-height: 14px;
    letter-spacing: 0.44px;
  }

</style>