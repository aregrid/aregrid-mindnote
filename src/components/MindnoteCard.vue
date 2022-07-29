<template>
    <div
        class="card"
        :style="styleObject"
        @mouseenter="startHover"
        @mouseleave="endHover"
    >
        <div v-if="itemTitle" class="info title">{{ title }}</div>
        <div v-if="itemContent" class="info content">
            {{ content }}
        </div>
        <div
            v-if="itemBtn"
            class="info btn"
            :class="{ shown: btnShown }"
            @click.stop.prevent="btnClick"
        >
            {{ btn }}
        </div>
    </div>
</template>

<script>

export default  {
    props: ['itemTitle','itemContent','itemBtn','styleObject','btnShowType'],
    data() {
        return {
            title: "title",
            content: "content",
            btn: "btn",
            showType: 0, //0 - always ;1 - hover;
            btnShown: true,
        };
    },
    created() {
        this.title = this.itemTitle || "title";

        if (this.itemContent) {
            this.content = this.itemContent;
        }
        if (this.itemBtn) {
            this.btn = this.itemBtn;
        }
        if (this.btnShowType) {
            switch (this.btnShowType) {
                case "Hover":
                    this.showType = 1;
                    this.btnShown = false;
                    break;
                default:
                    break;
            }
        }
    },
    methods: {
        btnClick() {
            console.log("card click");
            this.$emit("hit-click", this);
        },

        startHover() {
            if (this.showType) {
                this.btnShown = true;
            }
        },
        endHover() {
            if (this.showType) {
                this.btnShown = false;
            }
        }
    }
}
</script>

<style>
.card {
    width: 200px;
    height: 300px;
    border: 1px solid;
    border-color: var(--block-border-color);
    background: var(--block-bg-color);
    box-shadow: var(--block-shadow);
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin: 10px;
    padding: 10px;
}
.card .title {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: 700;
    color: var(--block-title-color);
    text-decoration: none;
}
.card .time {
    font-size: 12px;
    color: var(--block-time-color);
}
.card .info {
    margin: 4px 0;
}
.btn.shown {
    opacity: 1;
    background-color: var(--main-bg-color);
}
.btn {
    opacity: 0;
}
</style>
