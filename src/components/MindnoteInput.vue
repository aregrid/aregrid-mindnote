<template>
    <input
        :class="{ isSelected }"
        ref="inputElment"
        autocomplete="false"
        spellcheck="false"
        @input="hitInput"
        @keydown.enter="pressEnter"
        @keydown.tab="pressTab"
        @keydown.delete="pressDelete"
        v-model="message.name"
        :style="styleObject"
    />
</template>

<script>
export default {
    name: "MindnoteInput",
    props: {
        value: Object,
    },
    data() {
        return {
            isSelected: false,
            message: this.value,
            styleObject: { width: "200px" }
        };
    },
    watch: {
        value: function (newVal, oldVal) {
            console.log("Prop changed: ", newVal, " | was: ", oldVal);
            this.message = this.value;
        },
    },
    mounted() {
        // console.log("mounted input", this.value.name);
        this.checkWidth();
        //  setTimeout(()=>{
        //     this.$refs.inputElment.focus();
        // },100)
    },
    methods: {
        pressEnter: function () {
            console.log("input > pressEnter", this);
            this.$emit("hit-enter", this);
        },
        pressTab: function () {
            console.log("input > pressTab");
            this.$emit("hit-tab", this);
        },
        pressDelete: function () {
            console.log("input > pressDelete");
            if (this.value.name == "") {
                this.$emit("hit-delete", this);
            }
        },
        hitInput: function () {
            console.log("hitInput");
            this.checkWidth();
            this.$emit("press-input", this.treeData);
        },
        checkWidth() {
            // 检查撤回操作
            if (this.$refs && this.$refs.inputElment) {
                const saveWidth = 6;
                let targetWidth = this.$refs.inputElment.offsetWidth;
                // scrollWidth
                const targetScrollWidth = this.$refs.inputElment.scrollWidth;
                if (targetScrollWidth > targetWidth) {
                    targetWidth = targetScrollWidth + saveWidth;
                }
                const diffWidth = window.innerWidth - targetWidth;
                // console.log("diff width", diffWidth);
                if (diffWidth > 50) {
                    this.styleObject.width = targetWidth + "px";
                }
            }
        }
    },
};
</script>

<style scoped>
input {
    border: none;
    font-size: 1em;
}
input:focus {
    outline: none;
}
</style>
