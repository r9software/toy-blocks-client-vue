<template>
  <v-expansion-panel class="accordion-node">
    <v-expansion-panel-header>
      <div class="d-flex">
        <div class="d-flex flex-column">
          <span class="accordion-header-name">{{node.name}}</span>
          <span class="accordion-header-url">{{node.url}}</span>
        </div>
        <v-badge
          class="accordion-badge"
          left
          bordered
          dot
          inline
          :color="getColor"
        >
          <span class="text-uppercase accordion-status-text">{{ getStatusText }}</span>
        </v-badge> 
      </div>
    </v-expansion-panel-header>
    <v-expansion-panel-content class="expansion-container">
      <template v-if="node.loading">
        Loading...
      </template>
      <template v-else-if="!node.online">
        Node is offline
      </template>
      <template v-else-if="node.blocks.length > 0">
        <block v-for="block in node.blocks" :key="block.id" :block="block"></block>
      </template>
      <template v-else>
        This node does not contain blocks
      </template>
      </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import Block from "@/components/Block";
import {mapActions} from "vuex";
export default {
  name: 'node',
  components: {Block},
  props: {
    node: {
      url: String,
      online: Boolean,
      name: String,
      loading: Boolean,
      blocks:[],
    }
  },
  data: () => ({
  }),
  watch:{
    node:async function(node,pastNode){
      if(typeof node !=='undefined' && node.online && !pastNode.online)
        await this.getAllBlocksForNode(node);
    }
  },
  computed: {
    getColor() {
      let badgeColor = '#Eb5757';

      if(this.node.online) {
        badgeColor = "#18cc55";
      }
      return badgeColor;
    },
    getStatusText() {
      let statusText = 'Loading';

      if(!this.node.loading) {
        if(this.node.online) {
          statusText = 'Online';
        } else {
          statusText = 'Offline';
        }
      }
      return statusText;
    }
  },
  methods: {
    ...mapActions(['getAllBlocksForNode']),
  },
}
</script>

<style scoped>
  .expansion-container >>> .v-expansion-panel-content__wrap{
    padding-left:16px;
    padding-right:16px;

  }
  .accordion-badge {
    margin-left: auto;
    margin-right: 12px;
    margin-top: 1px;
  }
  .accordion-header-name {
    font-size: 16px;
    line-height: 24px;
    letter-spacing: 0.44px;
    color: #263238;
  }

  .accordion-header-url {
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    letter-spacing: 0.25px;
    color: #263238;
    opacity: 0.54;
  }

  .accordion-status-text {
    font-weight: 500;
    font-size: 10px;
    line-height: 16px;
    letter-spacing: 1.5px;
    color: #263238;
  }
</style>

<style>
  .accordion-node .v-expansion-panels--accordion {
    padding-bottom: 12px;
  }

  .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
    height: 6px;
    margin-top: 18px;
    width: 6px;
  }

  @media only screen and (max-width: 442px) {
    .accordion-node .accordion-badge.v-badge--dot .v-badge__badge {
      margin-top: 28px;
    }  
  }
</style>