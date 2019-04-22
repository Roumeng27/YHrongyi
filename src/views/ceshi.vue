<template>
    <div style="width:250px;">
        <el-input v-model="number" v-on:blur ='inputblur'></el-input>
        <p>{{caseNumber}}</p>
    </div>
</template>

<script>
import {digitUppercase} from '../api/base.js'
export default {
    components:{},
    props:{},
    data(){
        return {
            number:'',// input输入
            caseNumber:'',// 大写
        }
    },
    created(){
      
    },
    mounted(){},
    methods:{
        // 大写
		caseWord(){
			this.caseNumber = digitUppercase(this.number)
        },
        inputblur(){
            this.caseNumber = digitUppercase(this.number)
        }
    },
}
</script>
<style scoped>
    .time{
        width: 100%;
        padding: 20px;
        display: flex;
        align-items: center;
    }
    p{
        padding: 0 20px;
    }
</style>