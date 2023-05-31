<!-- eslint-disable vue/multi-word-component-names -->
// eslint-disable-next-line vue/multi-word-component-names
<template>
  <div id="header-div" >
    <a-row type="flex" id="header-row" justify="middle"  >
      <a-col 
        :flex="auto"
        :offset="0.5"
        class="height-100"
        >
        <label id="header-label" >☰</label>
      </a-col>
      <a-col 
        :flex="auto"
        class="height-100"
        @click="handelClick"
        >
        <label id="header-label" class="name-abel" >你滴勋宗</label>
      </a-col>
      <a-col 
        :flex="auto"
        class="height-100 tag-use"
        @click="handelClick"

        >
        Find
      </a-col>
      <a-col 
        :flex="auto"
        class="height-100 tag-use"
        @click="handelClick"

        >
        Share
      </a-col>
      <a-col 
        :flex="auto"
        class="height-100 tag-use"
        @click="handelClick"
        >
        About
      </a-col>
      <a-col 
        :flex="2"
        :offset="0"
        class="height-100"
        >
      </a-col>

      <a-col 
        :flex="auto"
        class="height-100"
        >
        <a-select
          ref="select"
          v-model:value="selectValue"
          style="width: 100px;"
          @change="handleChange"
        >
          <!-- <a-select-option value="+">+</a-select-option> -->
          <a-select-option value="Login">Login</a-select-option>
          <a-select-option value="Register">Register</a-select-option>
          <a-select-option value="LoginOut" disabled>LoginOut</a-select-option>
          <!-- <a-select-option value="disabled" disabled>Disabled</a-select-option> -->
        </a-select>
      </a-col>
      <a-col 
        :flex="auto" 
        class="height-100"
        >
          <a-input-search
            v-model:value="searchValue"
            placeholder="input search text"
            enter-button
            @search="onSearch"
          />
      </a-col>
    </a-row>
    
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue';
import { notificate} from "../../utls/showMsg"
import 'ant-design-vue/dist/antd.css';

export default defineComponent({
  name: 'HeaderCom',
  setup() {
    const searchValue = ref('');
    const onSearch = searchValue => {
      console.log('use value', searchValue);
      console.log('or use this.value', searchValue.value);
    };
    const handleChange = value => {
      console.log(`selected ${value}`);
    };
    const handelClick = () => {
      notificate(0, "功能尚未开发")
    }

    return {
      onSearch,
      handleChange,
      handelClick,

      searchValue,
      selectValue: ref('+'),
    };
  },
});
</script>

<style lang="scss" >

  #header-div{
    background-color: #1d2129;
    height: 60px;
    overflow: hidden;
    padding: 3px 8px;
    border-bottom: 1px solid white;
  }
  #header-row{
    height: 100%;
  }
  .height-100{
    height: auto;
    padding: 0% 1%;
    justify-content: center;
    align-items: center;
  }
  #header-label{
    color: white;
    font-weight: bold;
    font-size: 21px;
  }
  #header-label:hover{
    cursor: pointer;
  }
  .tag-use{
    color: white;
    font-size: 14px;
    font-weight: 500;
    padding-top: 5px;

  }
  .tag-use:hover{
    cursor: pointer;
  }
  .name-abel{
    margin-right: 5px;
  }


</style>