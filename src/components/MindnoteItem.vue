<template>
    <div class="line-item">
        <div class="bullet" :class="{ folder: !isFolder }" @click="toggle">
            <div class="dot"></div>
        </div>
        <mindnote-input
            class="line-content"
            :value="value"
            @hit-enter="enterItem"
            @hit-tab="tabItem"
            @hit-delete="deleteItem"
            @press-input="inputContent"
            ref="inputitem"
        ></mindnote-input>
    </div>
</template>

<script>
import MindnoteInput from "./MindnoteInput.vue";
export default {
    name: "MindnoteItem",
    components: { MindnoteInput },
    props: ["item"],
    data() {
        return {
            isOpen: true,
            value: this.item
        };
    },
    watch: {
        item: function (newVal, oldVal) {
            console.log("Prop changed: ", newVal, " | was: ", oldVal);
            this.value = this.item;
        },
    },
    computed: {
        isFolder: function () {
            return this.value.children && this.value.children.length;
        }
    },
    methods: {
        toggle: function () {
            console.log("item > toggle");
            this.isOpen = !this.isOpen;
        },
        enterItem: function (item) {
            console.log("item > enterItem", this, item);
            this.$emit("hit-enter", this);
        },
        tabItem: function () {
            console.log("item > tabItem");
            this.$emit("hit-tab", this);
        },
        deleteItem: function (item) {
            console.log("item > deleteItem", this, item);
            this.$emit("hit-delete", this);
        },
        inputContent: function () {
            console.log("item > inputContent", this);
            this.$emit("press-input");
        },
    },
};
</script>

<style scoped lang="less">
.line-item {
    height:24px;
    line-height: 24px;
    position: relative;
    &:after{
        content:" ";
        clear:both;
        display: block;
    }
}

.line-item .bullet {
    display: block;
    position: absolute;
    left: 3px;
    top: 0px;
    height: 6px;
    width: 6px;
    cursor: pointer;
    border: 6px solid transparent;
    border-radius: 9px;
    background-clip: content-box;
    transition: border 0.2s;
    box-sizing: content-box;
}

.line-item .bullet:hover {
    border-color: #888;
}

.line-item .dot {
    border: 3px solid #444;
    border-radius: 3px;
}

.line-item .line-content {
    padding-left: 24px;
    float: left;
}
</style>
