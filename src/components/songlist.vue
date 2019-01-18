<style lang="less" scoped>
@import "./components.less";
.row_disable {
    // background-color: #dee2e6;
    // opacity: 0.5;
    opacity: 1;
}

.table {
    width: 100%;
    margin-bottom: 1rem;
    background-color: transparent;
}

.border_bottom {
    border-bottom: 1px solid #dee2e6;
}

.thead {
    width: 100%;
}

.tbody {
    width: 100%;
}

.no_top_border {
    border-top: none !important;
}

.custom-table .table {
    table-layout: fixed;
    margin-bottom: 0;
}

td span{
    color: #3e3e3e;
    font-weight: 600;
}

.custom-table--body-wrapper {
    overflow: auto;
    margin-top: -1px;
}
.selected{
    background: #bfbfbf; 
}
td span{
    word-wrap: break-word;
    white-space: nowrap;
}
.play{
  border: 0px;
}
</style>

<template>
<div v-if='height==0'>
    <table class="table" :class="border?'table-bordered':''" :ref='refName'>
        <thead>
            <tr>
                <th scope="col" class="th" :class='i==0?"col-left":""' :style="getColumnStyle(item)" v-for="item,i of column" :key='i' v-if='item.type === ""'>
                    <button class="play"></button>
                    <table-expand v-if="item.titleRender" :row="item" :index="i" :render="item.titleRender"></table-expand>
                </th>
                <th scope="col" class="th" :class='i==0?"col-left":""' :style="getColumnStyle(item)" v-else>
                    <table-expand v-if="item.titleRender" :row="item" :index="i" :render="item.titleRender"></table-expand>
                    <span v-else>{{item.title}}</span>
                </th>
            </tr>
        </thead>
        <tbody v-if="loading">
            <tr>
                <td class="col-left loading border_bottom" :colspan="column.length">
                    <img src="../images/loading.gif"/>
                    <span>数据加载中,请稍后......</span>
                </td>
            </tr>
        </tbody>
        <tbody v-else>
            <tr v-if="data.length==0">
                <td class="col-left border_bottom" :colspan="column.length" style="text-align:center;">暂无数据!</td>
            </tr>
            <tr v-else v-for="item,i of data" :key="i" :class='item.disabled?"row_disable":""' @click="rowSelected(i, item)">
                <td :class="getTdClass(i,k)" v-for="col,k of column" :key="k" :style="getColumnStyle(col)">
                    <span v-if='col.type && col.type == "index"'>{{i+1}}</span>
                    <table-expand v-else-if="col.render" :row="item" :index="i" :render="col.render"></table-expand>
                    <span v-else>{{item[col.key]}}</span>
                </td>
            </tr>
        </tbody>
    </table>
</div>
<div v-else class="custom-table" :ref='refName'>
    <table class="table" :class="border?'table-bordered':''" style="margin-bottom:0;">
        <thead>
            <tr>
                <th scope="col" class="th" :class='i==0?"col-left":""' :style="getColumnStyle(item)" v-for="item,i of column" :key='i' v-if='item.type === "checkbox"'>
                    <table-expand v-if="item.titleRender" :row="item" :index="i" :render="item.titleRender"></table-expand>
                </th>
                <th scope="col" class="th" :class='i==0?"col-left":""' :style="getColumnStyle(item)" v-else>
                    <table-expand v-if="item.titleRender" :row="item" :index="i" :render="item.titleRender"></table-expand>
                    <span v-else>{{item.title}}</span>
                </th>
            </tr>
        </thead>
    </table>
    <div class="custom-table--body-wrapper" :style="{height: height+'px'}">
        <table class="table" :class="border?'table-bordered':''" >
            <tbody v-if="loading">
                <tr>
                    <td class="col-left loading border_bottom" :colspan="column.length">
                        <img src="../images/loading.gif" />
                        <span>数据加载中,请稍后......</span>
                    </td>
                </tr>
            </tbody>
            <tbody v-else>
                <tr v-if="data.length==0">
                    <td class="col-left border_bottom no_top_border" :colspan="column.length" style="text-align:center;">暂无数据!</td>
                </tr>
                <tr v-else v-for="item,i of data" :key="i" :class='item.disabled?"scroll row_disable":"scroll"' @click="rowSelected(i, item)">
                    <td :class="getTdClass(i,k)" v-for="col,k of column" :key="k" :style="getColumnStyle(col)">
                        <span v-if='col.type && col.type == "index"'>{{i+1}}</span>
                        <table-expand v-else-if="col.render" :row="item" :index="i" :render="col.render"></table-expand>
                        <span v-else>{{item[col.key]}}</span>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>
</template>

<script>
import TableExpand from './expand';

export default {
    name: 'songList',
    components: {
        TableExpand
    },
    props: {
        refName:{
            type: String,
            default: ()=>{ return 'table_'+new Date().getTime();}
        },
        rowSelect:{
            type:Boolean,
            default: false
        },
        column: {
            type: Array,
            default: () => {
                return []
            }
        },
        data: {
            type: Array,
            default: () => {
                return []
            }
        },
        loading: {
            type: Boolean,
            default: false
        },
        border: {
            type: Boolean,
            default: false
        },
        height: {
            type: Number,
            default: 0
        }
    },
    data(){
      return {
        ck: false
      };
    },
    mounted() {
    },
    methods: {
        getTdClass(i, k) {
            let cls = k == 0 ? 'col-left' : '';
            cls += i == 0 ? ' no_top_border' : '';
            cls += (i == this.data.length - 1 && !this.border) ? ' border_bottom' : '';
            return cls;
        },
        checkboxChange(event) {
            if (!this.$refs['ck_item'] || this.$refs['ck_item'].length == 0) {
                return;
            }
            let data = [];
            this.$refs['ck_item'].forEach(item => {
                if(!item.disabled){
                    item.setChecked(event.target.checked);
                    data.push({
                        index: item.num,
                        row: item.data
                    });
                }
            });
            this.$emit(event.target.checked ? 'selectAll' : 'selectAll-cancel', data);
        },
        itemChange(event, num, row) {
            this.$emit(event.target.checked ? 'select' : 'select-cancel', {
                index: num,
                row: row
            });
        },
        getColumnStyle(item) {
            let style = {};
            if (item.align) {
                style['text-align'] = item.align;
            }
            if(item.width){
                style['width'] = item.width + 'px';
            }
            return style;
        },
        sortHandler(sort, tag) {
            this.$emit('sort', sort, tag);
        },
        rowSelected(index, row){
            if(!this.rowSelect){
                return;
            }
            let els = $(this.$refs[this.refName]).find('tbody tr');
            for(let i=0;i<els.length;i++){
                if(i == index){
                    
                }else{
                    
                }
            }
            this.$emit('rowSelected', index, row);
        }
    }
}
</script>