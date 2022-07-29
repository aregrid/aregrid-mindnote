<template>
<div class="mindnote">
    <div v-for="(item, index) in treeData" :key="index" ref="treeData">
        <mindnote-item :key="index" ref="mindnoteTree" :item="item" @hit-enter="enterItem" @hit-tab="tabItem" @hit-delete="deleteItem" @press-input="inputContent">
        </mindnote-item>
        <div class="mindnote-children" v-show="isOpen" v-if="item.children && item.children.length">
            <div class="mindnote-children__connection"></div>
            <mindnote :propsitem="item.children" @press-input="inputContent" @add-subitem="inputContent"></mindnote>
        </div>
    </div>
</div>
</template>

<script>
import MindnoteItem from "./MindnoteItem.vue";

export default {
    props: ['propsitem'],
    components: {
        MindnoteItem
    },
    data() {
        return {
            isOpen: true,
            treeData: [{
                id: 1,
                name: "Untitled"
            }]
        }
    },

    beforeMount() {
        if (this.propsitem && this.propsitem.length) {
            this.treeData = this.propsitem;
        } else {
            this.treeData = [{
                id: 1,
                name: "Untitled"
            }];
        }
    },
    watch: {
        propsitem: function (newVal, oldVal) {
            console.log("Prop changed: ", newVal, " | was: ", oldVal);
            this.treeData = this.propsitem;
        }
    },

    methods: {
        toggle() {
            console.log("child > toggle");
            this.isOpen = !this.isOpen;
        },
        

        enterItem(item) {
            console.log("child > enterItem", this);
            const itemindex = item._.vnode.key
            const itemscount = item.$parent.treeData.length;
            const newitemindex = itemindex + 1;
            const newitem = {
                id: itemscount,
                name: "",
                remark: "",
                children: [],
            };
            //如果没有子节点，但是上一个节点是空的，直接创建兄弟节点
            const parentTreeData = item.$parent.treeData;
            if (parentTreeData && parentTreeData.length>=1) {
                // debugger;
                if(!parentTreeData[newitemindex-1].name){
                    if(item.$parent.$parent && item.$parent.$parent.treeData){
                        item.$parent.$parent.treeData.push(newitem)
                        this.$emit("press-input");
                        // debugger;
                        this.$nextTick(() =>this.$el.parentElement.parentElement.nextElementSibling.querySelector('input').focus())

                    }
                    return;
                }
            }
            //添加新节点
            this.treeData.splice(newitemindex, 0, newitem);
            this.$nextTick(() => this.$el.children[newitemindex].querySelector('input').focus())
            // debugger;
            this.$emit("press-input");
        },

        addSubitem() {
            console.log("child > addSubitem", this.treeData);
            this.$emit("add-subitem", this.treeData);
            this.isOpen = true;
        },

        tabItem(item) {
            console.log("child > tabItem", item);
            const itemkey = item._.vnode.key
            if (itemkey) {
                const indexitem = item._.vnode.key - 1;
                const target = item.$parent.treeData[indexitem];
              

                //如果没有子节点，就创建子节点
                if (!target.children) {
                    target.children = [];
                }
                target.children.push(item.value);
                item.$parent.treeData.splice(itemkey, 1);
                this.$emit("press-input");
                //下一个层级的input获取焦点
                setTimeout(() => {
                    this.$el.querySelector('.mindnote-children').querySelector('input').focus()
                }, 100)

            } else {
                // 保留数节点，位置不发生变化，焦点依然保留

                console.log('child > tabItem > input > focus')
            }
        },

        deleteItem(item) {
            console.log("child > deleteItem", this.treeData);
            const itemkey = item._.vnode.key
            item.$parent.treeData.splice(itemkey, 1);
            this.$emit("delete-item");
            this.$nextTick(()=>{
                  setTimeout(() => {
                    let lineItems = this.$el.parentElement.querySelectorAll('.line-item')
                    lineItems[lineItems.length-1].querySelector('input').focus()
                }, 100)
            })

        },

        inputContent() {
            console.log("child > inputContent", this);
            this.$emit("press-input");
        }
    }
}
</script>

<style scoped>
.mindnote-children {
    position: relative;
    padding-left: 20px;
}
.mindnote-children__connection{
    position: absolute;
    border-left: 1px #eee solid;
    height: 100%;
    top: 0;
    left: 12px;
    z-index: 1;
}
</style>
