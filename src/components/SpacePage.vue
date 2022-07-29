<template>
<div class="page-space">
     <div class="navbar">
        <h3>Z Mindnote</h3>
    </div>
    <div class="msg" v-if="err">{{ msg }}</div>
    <div class="grid">
        <div class="addNewBtn" @click="addNewMindnotePage">
            <mindnote-card :itemTitle="addNewBtnStr" :style="styleObj"></mindnote-card>
        </div>
        <div class="itemwrapper" v-if="itemList">
            <div class="blockwrapper" v-for="(item, index) in itemList" :key="index">
                <router-link class="block" :to="{
                            name: 'MindnotePage',
                            params: { mindnoteId: item.id },
                        }">
                    <mindnote-card :itemTitle="item.name" :itemContent="item.time.createAt" :itemBtn="deleteBtnStr" btnShowType="Hover" @hit-click="deleteItem(item.id, index)"></mindnote-card>
                </router-link>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {setLocalStorage,getLocalStorage,uniqueid} from "../utils/util"
import MindnoteCard from "./MindnoteCard.vue";

export default {
    props: ['link'],
    components: {
        MindnoteCard
    },
    data() {
        return {
            err: null,
            msg: "no data",
            itemList: [],
            addNewBtnStr: " + 添加",
            deleteBtnStr: "删除",
            styleObj: "border-style: dashed;"
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        addNewMindnotePage() {
            console.log("click add new");
            const newItemId = uniqueid();
            const createdAt = new Date();
            const newitem = {
                id: newItemId,
                name: window.moment(new Date()).format('YYYY-MM-DD日记'),
                time: {
                    createAt: createdAt.toLocaleString(),
                },
            };
            this.itemList.push(newitem);
            setLocalStorage("mindnoteItems", this.itemList);
            setLocalStorage(newItemId, [{
                id: 1,
                name: "Untitled"
            }]);
            // open new node
            this.$router.push("/mindnote/" + newItemId);
        },
        deleteItem(id, index) {
            console.log("delete item", this, id, index);
            this.itemList.splice(index, 1);
            setLocalStorage("mindnoteItems", this.itemList);
            localStorage.removeItem(id.toString());
        },
        fetchData() {
            const localDB = getLocalStorage("mindnoteItems");
            // console.log("index", localDB, '登陆');
            if (localDB == null) {
                console.log("no local data \ncheck for cloud data");
                // axios
                //if no cloud data
            } else {
                this.itemList = localDB;
                // set local data then check cloud data
            }
        }
    }

}
</script>
<style scoped lang="less">
.navbar {
    background: black;
    height: 60px;
    padding: 0 15px;
    h3 {
        color: #fff;
        font-size: 24px;
        line-height: 60px;
        padding-left: 15px;
        display:inline-block;
        float: left;;
    }
    &:after{
        content:" ";
        display:block;
        clear:both;
    }
}
.page-space {
    height: 100vh;
}

.grid {
    display: flex;
    flex-direction: row;
}
.itemwrapper,
.blockwrapper {
    display: flex;
    flex-direction: row;
}

a:-webkit-any-link {
    color: var(--block-title-color);
    text-decoration: none;
  text-decoration: none;
}

</style>
